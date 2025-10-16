/**
 * PixelBlast WebGL Animation
 * Full implementation from ReactBits with ES6 modules
 * Inspired by github.com/zavalit/bayer-dithering-webgl-demo
 */

import * as THREE from 'three';
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';

const createTouchTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context not available');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const trail = [];
  let last = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;

  const clear = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawPoint = p => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    let intensity = 1;
    const easeOutSine = t => Math.sin((t * Math.PI) / 2);
    const easeOutQuad = t => -t * (t - 2);
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;
    intensity *= p.force;
    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = size * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const addTouch = norm => {
    let force = 0;
    let vx = 0;
    let vy = 0;
    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 10000, 1);
    }
    last = { x: norm.x, y: norm.y };
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
  };

  const update = () => {
    clear();
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) trail.splice(i, 1);
    }
    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);
    texture.needsUpdate = true;
  };

  return {
    canvas,
    texture,
    addTouch,
    update,
    set radiusScale(v) {
      radius = 0.1 * size * v;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
    size
  };
};

const createLiquidEffect = (texture, opts) => {
  const fragment = `
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;
  return new Effect('LiquidEffect', fragment, {
    uniforms: new Map([
      ['uTexture', new THREE.Uniform(texture)],
      ['uStrength', new THREE.Uniform(opts?.strength ?? 0.025)],
      ['uTime', new THREE.Uniform(0)],
      ['uFreq', new THREE.Uniform(opts?.freq ?? 4.5)]
    ])
  });
};

const SHAPE_MAP = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3
};

const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

// Reduced octaves for better performance (was 5, now 3)
#define FBM_OCTAVES     3
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`;

const MAX_CLICKS = 10;

class PixelBlastWebGL {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            variant: options.variant || 'circle',
            pixelSize: options.pixelSize || 6,
            color: options.color || '#44bba4',
            patternScale: options.patternScale || 3,
            patternDensity: options.patternDensity || 1.2,
            pixelSizeJitter: options.pixelSizeJitter || 0.5,
            enableRipples: options.enableRipples !== false,
            rippleSpeed: options.rippleSpeed || 0.4,
            rippleThickness: options.rippleThickness || 0.12,
            rippleIntensityScale: options.rippleIntensityScale || 1.5,
            liquid: options.liquid !== false,
            liquidStrength: options.liquidStrength || 0.12,
            liquidRadius: options.liquidRadius || 1.2,
            liquidWobbleSpeed: options.liquidWobbleSpeed || 5,
            speed: options.speed || 0.6,
            edgeFade: options.edgeFade || 0.25,
            transparent: options.transparent !== false
        };

        this.init();
    }

    init() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: auto;
            z-index: 1;
        `;
        this.container.appendChild(canvas);

        // Create WebGL2 context (antialiasing disabled for better performance)
        const gl = canvas.getContext('webgl2', {
            antialias: false,  // Disabled for better performance
            alpha: true,
            powerPreference: 'low-power'  // Prefer lower power consumption
        });

        if (!gl) {
            console.error('WebGL2 not supported');
            return;
        }

        // Create renderer (optimized for performance)
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            context: gl,
            antialias: false,  // Disabled for better performance
            alpha: true,
            powerPreference: 'low-power'  // Prefer lower power consumption
        });
        // Reduced pixel ratio for better performance (was 2, now 1)
        this.renderer.setPixelRatio(1);

        // Setup uniforms
        this.uniforms = {
            uResolution: { value: new THREE.Vector2(0, 0) },
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(this.options.color) },
            uClickPos: {
                value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))
            },
            uClickTimes: { value: new Float32Array(MAX_CLICKS) },
            uShapeType: { value: SHAPE_MAP[this.options.variant] ?? 1 },
            uPixelSize: { value: this.options.pixelSize * this.renderer.getPixelRatio() },
            uScale: { value: this.options.patternScale },
            uDensity: { value: this.options.patternDensity },
            uPixelJitter: { value: this.options.pixelSizeJitter },
            uEnableRipples: { value: this.options.enableRipples ? 1 : 0 },
            uRippleSpeed: { value: this.options.rippleSpeed },
            uRippleThickness: { value: this.options.rippleThickness },
            uRippleIntensity: { value: this.options.rippleIntensityScale },
            uEdgeFade: { value: this.options.edgeFade }
        };

        // Create scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Create material
        this.material = new THREE.ShaderMaterial({
            vertexShader: VERTEX_SRC,
            fragmentShader: FRAGMENT_SRC,
            uniforms: this.uniforms,
            transparent: true,
            glslVersion: THREE.GLSL3,
            depthTest: false,
            depthWrite: false
        });

        // Create quad
        const quadGeom = new THREE.PlaneGeometry(2, 2);
        this.quad = new THREE.Mesh(quadGeom, this.material);
        this.scene.add(this.quad);

        // Setup clock
        this.clock = new THREE.Clock();
        this.clickIx = 0;

        // Performance optimizations
        this.targetFPS = 30; // Cap at 30fps instead of 60fps
        this.frameInterval = 1000 / this.targetFPS;
        this.lastFrameTime = 0;
        this.isVisible = true;

        // Setup liquid effect if enabled
        if (this.options.liquid) {
            this.touch = createTouchTexture();
            this.touch.radiusScale = this.options.liquidRadius;

            this.composer = new EffectComposer(this.renderer);
            const renderPass = new RenderPass(this.scene, this.camera);
            this.liquidEffect = createLiquidEffect(this.touch.texture, {
                strength: this.options.liquidStrength,
                freq: this.options.liquidWobbleSpeed
            });
            const effectPass = new EffectPass(this.camera, this.liquidEffect);
            effectPass.renderToScreen = true;
            this.composer.addPass(renderPass);
            this.composer.addPass(effectPass);
        }

        // Setup resize
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.container);
        this.handleResize();

        // Setup mouse interaction
        this.setupMouseInteraction();

        // Setup Page Visibility API to pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible) {
                this.clock.start();
            }
        });

        // Start animation
        this.animate();
    }

    handleResize() {
        const w = this.container.clientWidth || 1;
        const h = this.container.clientHeight || 1;
        this.renderer.setSize(w, h, false);
        this.uniforms.uResolution.value.set(
            this.renderer.domElement.width,
            this.renderer.domElement.height
        );
        this.uniforms.uPixelSize.value = this.options.pixelSize * this.renderer.getPixelRatio();

        if (this.composer) {
            this.composer.setSize(this.renderer.domElement.width, this.renderer.domElement.height);
        }
    }

    setupMouseInteraction() {
        const mapToPixels = (e) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            const scaleX = this.renderer.domElement.width / rect.width;
            const scaleY = this.renderer.domElement.height / rect.height;
            const fx = (e.clientX - rect.left) * scaleX;
            const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
            return { fx, fy, w: this.renderer.domElement.width, h: this.renderer.domElement.height };
        };

        this.renderer.domElement.addEventListener('pointerdown', (e) => {
            const { fx, fy } = mapToPixels(e);
            this.uniforms.uClickPos.value[this.clickIx].set(fx, fy);
            this.uniforms.uClickTimes.value[this.clickIx] = this.uniforms.uTime.value;
            this.clickIx = (this.clickIx + 1) % MAX_CLICKS;
        }, { passive: true });

        if (this.touch) {
            this.renderer.domElement.addEventListener('pointermove', (e) => {
                const { fx, fy, w, h } = mapToPixels(e);
                this.touch.addTouch({ x: fx / w, y: fy / h });
            }, { passive: true });
        }
    }

    animate(currentTime = 0) {
        this.raf = requestAnimationFrame((time) => this.animate(time));

        // Pause when tab is not visible
        if (!this.isVisible) {
            return;
        }

        // Frame rate limiting (30fps instead of 60fps)
        const deltaTime = currentTime - this.lastFrameTime;
        if (deltaTime < this.frameInterval) {
            return;
        }
        this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

        // Update uniforms and render
        this.uniforms.uTime.value = this.clock.getElapsedTime() * this.options.speed;

        if (this.liquidEffect) {
            this.liquidEffect.uniforms.get('uTime').value = this.uniforms.uTime.value;
        }

        if (this.composer) {
            if (this.touch) this.touch.update();
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    destroy() {
        if (this.raf) cancelAnimationFrame(this.raf);
        if (this.resizeObserver) this.resizeObserver.disconnect();
        if (this.quad) this.quad.geometry.dispose();
        if (this.material) this.material.dispose();
        if (this.composer) this.composer.dispose();
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement.parentElement === this.container) {
                this.container.removeChild(this.renderer.domElement);
            }
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Store all pixel blast instances
    window.pixelBlastAnimations = [];

    // Initialize for all sections with pixel-bg class
    const pixelBgElements = document.querySelectorAll('.pixel-bg');

    pixelBgElements.forEach((element, index) => {
        const animation = new PixelBlastWebGL(element, {
            variant: 'circle',
            pixelSize: 8,  // Increased from 6 for better performance
            color: '#44bba4',  // Qynzoo green
            patternScale: 2.5,  // Reduced from 3 for better performance
            patternDensity: 1.15,  // Slightly reduced for better performance
            pixelSizeJitter: 0.4,  // Reduced from 0.5
            enableRipples: false,  // Disabled click ripple effect
            rippleSpeed: 0.4,
            rippleThickness: 0.12,
            rippleIntensityScale: 1.5,
            liquid: false,  // Disabled for better performance - saves post-processing
            liquidStrength: 0.12,
            liquidRadius: 1.2,
            liquidWobbleSpeed: 5,
            speed: 0.5,  // Reduced from 0.6 for smoother animation
            edgeFade: 0.25,
            transparent: true
        });

        window.pixelBlastAnimations.push(animation);
    });
});
