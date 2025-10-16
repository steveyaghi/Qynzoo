# Qynzoo Design System & Principles

**Version:** 1.0
**Last Updated:** January 11, 2025
**Purpose:** This document defines the comprehensive design principles, visual language, and UI patterns for the Qynzoo website. Use this as the single source of truth when creating new pages or features.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Animation & Interaction](#animation--interaction)
7. [Responsive Design](#responsive-design)
8. [Accessibility Standards](#accessibility-standards)

---

## Brand Identity

### Brand Essence
- **Mission:** Transforming businesses through AI automation
- **Tone:** Professional yet approachable, innovative, trustworthy
- **Voice:** Clear, confident, educational without being condescending

### Visual Theme
- **Style:** Modern, tech-forward with subtle retro-futuristic elements
- **Feel:** Dark themed with vibrant accent colors
- **Approach:** Glassmorphism + gradient accents + subtle animations

---

## Color System

### Primary Colors

```css
--primary-color: #44bba4       /* Turquoise - Main brand color */
--secondary-color: #ffc107     /* Yellow/Gold - Highlights & CTAs */
--accent-color: #fc7753        /* Coral/Orange - Energy & excitement */
```

### Background Colors

```css
--dark-bg: #0a0e27            /* Deep navy - Main background */
--navy-bg: #1a1f3a            /* Navy - Section backgrounds */
--dark-green-bg: #1a3a32      /* Dark teal - Alternate sections */
```

### Text Colors

```css
--text-dark: #ffffff          /* Pure white - Headings & important text */
--text-light: #ffffff         /* White - Body text */
--text-gray: #b8b8b8          /* Light gray - Secondary text */
```

### Border Colors

```css
--border-color: #2a3a5a       /* Subtle borders */
```

### Color Usage Rules

1. **Primary Color (`#44bba4`):**
   - Interactive elements (buttons, links, icons)
   - Highlights and focus states
   - Success indicators
   - Brand elements (logo, badges)

2. **Secondary Color (`#ffc107`):**
   - Hero titles for maximum visibility
   - Featured badges
   - Important callouts
   - Gradient combinations

3. **Accent Color (`#fc7753`):**
   - Hover states
   - Active elements
   - Featured cards/sections
   - Gradient end points
   - Error/warning indicators

4. **Background Strategy:**
   - Alternate between `dark-bg` and `navy-bg` for sections
   - Use glass morphism: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(15px)`
   - Layer semi-transparent overlays for depth

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #44bba4 0%, #36a08d 100%)
--gradient-hero: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)
--gradient-accent: linear-gradient(135deg, #ffc107 0%, #ff9800 100%)
--gradient-coral: linear-gradient(135deg, #fc7753, #ff6b47)
```

**Usage:**
- Primary gradient: Buttons, important CTAs
- Accent gradient: Featured elements, hover states
- Background gradients: Hero sections, decorative elements

---

## Typography

### Font Families

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-heading: 'Poppins', var(--font-primary)
```

### Type Scale

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| Hero Title | 56px | 700 | 1.1 | Main landing page hero |
| Section Title | 42px | 700 | 1.2 | Major section headings |
| Subsection Title | 32px | 700 | 1.2 | Subsection headings |
| Card Title | 24px | 600 | 1.2 | Card/item headings |
| Body Large | 18-20px | 400 | 1.7 | Subtitles, intros |
| Body | 16px | 400 | 1.6 | Standard body text |
| Body Small | 14-15px | 400-500 | 1.6 | Metadata, captions |
| Label | 12-13px | 500-600 | 1.4 | Form labels, tags |

### Typography Rules

1. **Headings (h1-h6):**
   - Always use `font-family: var(--font-heading)`
   - Color: `var(--text-dark)` (#ffffff)
   - Weight: 700 for h1-h2, 600 for h3-h6

2. **Body Text:**
   - Use `font-family: var(--font-primary)`
   - Primary text: `var(--text-dark)` or `rgba(255, 255, 255, 0.9)`
   - Secondary text: `var(--text-gray)` or `rgba(255, 255, 255, 0.7-0.8)`

3. **Special Text:**
   - Gradient text: Apply `.gradient-text` class
   - Highlighted terms: Use `color: var(--primary-color)`
   - Links: `color: var(--primary-color)`, underline on hover

### Letter Spacing

- Headlines: `-0.5px` to `0px` (tighter)
- Body: `0` (normal)
- Labels/Buttons: `0.5px` (looser for readability)

---

## Spacing & Layout

### Container System

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```

### Section Spacing

- **Desktop:** `padding: 100px 0`
- **Tablet:** `padding: 80px 0`
- **Mobile:** `padding: 60px 0`

### Spacing Scale

Use consistent spacing multiples of 4px/5px:

| Name | Value | Use Case |
|------|-------|----------|
| xs | 5px | Tight gaps, icon spacing |
| sm | 10px | Small element spacing |
| md | 15-20px | Standard spacing |
| lg | 30-40px | Section internal spacing |
| xl | 60px | Between major elements |
| 2xl | 80-100px | Section padding |

### Grid Patterns

1. **Two-Column Layout:**
   ```css
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 60px;
   ```

2. **Auto-Fit Cards:**
   ```css
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
   gap: 30px;
   ```

3. **Benefits Layout:**
   ```css
   grid-template-columns: 300px 1fr; /* Sidebar + content */
   gap: 40px;
   ```

---

## Component Library

### 1. Buttons

#### Primary Button

```css
.btn-primary {
    padding: 14px 32px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 16px;
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 4px 15px rgba(33, 180, 166, 0.3);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(33, 180, 166, 0.4);
}
```

#### Secondary Button

```css
.btn-secondary {
    padding: 14px 32px;
    border-radius: 50px;
    font-weight: 600;
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: white;
}
```

**Button Rules:**
- Always use pill shape (`border-radius: 50px`)
- Include hover lift effect (`translateY(-2px)`)
- Add subtle shadow with brand color tint
- Include slide effect with `::before` pseudo-element

### 2. Cards

#### Standard Card

```css
.card {
    background: var(--navy-bg);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    border: 1px solid rgba(252, 119, 83, 0.3); /* Accent border */
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(252, 119, 83, 0.3);
    border-color: var(--accent-color);
}
```

**Card Features:**
- Top border gradient (4px height, transforms from 0 to full width on hover)
- Glassmorphism background option: `rgba(255, 255, 255, 0.05)` + `backdrop-filter: blur(10px)`
- Icon containers: 60-70px square, rounded 12-15px

#### Featured Card

```css
.card.featured {
    border: 2px solid var(--primary-color);
    position: relative;
}

.featured-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--gradient-primary);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}
```

### 3. Navigation

#### Navbar Structure

```css
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(10, 14, 39, 0.95);
    backdrop-filter: blur(10px);
    padding: 15px 0;
    z-index: 1000;
}
```

**Nav Link Pattern:**
```css
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}
```

### 4. Sections

#### Section Header Pattern

```html
<div class="section-header" data-aos="fade-up">
    <h2 class="section-title">Section Title</h2>
    <p class="section-subtitle">Supporting description</p>
</div>
```

```css
.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
}
```

### 5. Forms

#### Input Fields

```css
.form-group input {
    width: 100%;
    padding: 15px 20px;
    border: 2px solid var(--border-color);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-light);
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
}
```

**Floating Label Pattern:**
- Label positioned absolute, moves to top on focus
- Background color behind label for clean overlap
- Label color changes to primary on focus

### 6. Icons

**Icon Container Pattern:**
```css
.icon-container {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
}
```

**Rules:**
- Service icons: 70px, background `rgba(33, 180, 166, 0.1)`, color primary
- Contact icons: 60px, primary gradient background
- Feature icons: 60px, accent gradient background

### 7. Social Links

```css
.social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
}
```

### 8. Timeline/Workflow Pattern

```css
.workflow-timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--primary-color), transparent);
}
```

**Step Pattern:**
- Large numbers: 72px, gradient text
- Alternating left/right alignment
- Icon bubbles: 60px circle, gradient background
- Content cards: glassmorphism style

### 9. Tab Interface

**Tab Button:**
```css
.tab-button {
    padding: 20px;
    background: var(--navy-bg);
    border: 2px solid rgba(252, 119, 83, 0.2);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.tab-button.active {
    background: linear-gradient(135deg, var(--accent-color), #ff6b47);
    color: white;
}
```

---

## Animation & Interaction

### Transition Standards

```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

### Common Animations

#### 1. Hover Lift
```css
element:hover {
    transform: translateY(-10px);
    box-shadow: [larger shadow];
}
```

#### 2. Scale on Hover
```css
element:hover {
    transform: scale(1.05);
}
```

#### 3. Slide Effect
```css
element::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease;
}

element:hover::before {
    left: 100%;
}
```

#### 4. Fade In (AOS)
```html
<div data-aos="fade-up" data-aos-duration="800"></div>
```

**AOS Configuration:**
```javascript
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});
```

### Interactive Elements

1. **Counter Animation:**
   - Trigger on intersection (50% threshold)
   - Duration: 2 seconds
   - Smooth increment with `requestAnimationFrame`

2. **Cursor Following Effect:**
   - Main cursor: 20px, primary color gradient
   - Trail: 3 elements, decreasing size, brand colors
   - Hover effect: scale 1.5, change to accent color

3. **Scroll Progress Bar:**
   - Fixed position, top: 0
   - Height: 3px
   - Primary gradient
   - Width based on scroll percentage

4. **Back to Top Button:**
   - Appears at 300px scroll
   - 50px circle, primary gradient
   - Hover: translateY(-5px)

### Shadows

```css
--shadow-sm: 0 2px 4px rgba(0,0,0,0.3);
--shadow-md: 0 4px 6px rgba(0,0,0,0.3);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.3);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.4);
```

**Colored Shadows:**
- Primary elements: `rgba(33, 180, 166, 0.3)`
- Accent elements: `rgba(252, 119, 83, 0.3)`
- Featured: `rgba(255, 193, 7, 0.2)`

---

## Responsive Design

### Breakpoints

```css
/* Desktop: Default (1200px container) */

/* Tablet: 968px and below */
@media (max-width: 968px) {
    .hero-title { font-size: 42px; }
    /* Two-column grids → single column */
    /* Workflow timeline removes center line */
}

/* Mobile: 768px and below */
@media (max-width: 768px) {
    .hero-title { font-size: 32px; }
    .section-title { font-size: 32px; }
    /* All grids → single column */
    /* Fixed nav becomes hamburger menu */
}

/* Small Mobile: 480px and below */
@media (max-width: 480px) {
    /* Buttons → full width */
    /* Reduce padding significantly */
    /* Stack all flex items */
}
```

### Mobile Navigation

- Hamburger menu: 3 lines, 25px width, 3px height
- Menu slides from left: `-100%` to `0`
- Full screen overlay: `calc(100vh - 70px)`
- Background: `rgba(10, 14, 39, 0.98)`

### Responsive Grid Patterns

```css
/* Auto-responsive */
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

/* Mobile override */
@media (max-width: 768px) {
    grid-template-columns: 1fr;
}
```

### Touch Targets

- Minimum size: 44x44px (Apple HIG)
- Adequate spacing between clickable elements
- Larger padding on mobile for form inputs

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

#### Color Contrast

- **Headings on dark background:**
  - White (#ffffff) on dark navy (#0a0e27) = 15.33:1 ✓

- **Body text on dark background:**
  - rgba(255,255,255,0.8) on #0a0e27 = 12+:1 ✓

- **Primary color elements:**
  - #44bba4 on #0a0e27 = 7.2:1 ✓

#### Keyboard Navigation

- All interactive elements must have `:focus` states
- Focus visible: `outline: 2px solid var(--primary-color)`
- Skip to main content link (off-screen)
- Logical tab order

#### Semantic HTML

```html
<!-- Proper heading hierarchy -->
<h1> → <h2> → <h3> (never skip levels)

<!-- Meaningful alt text -->
<img src="..." alt="Descriptive text">

<!-- ARIA labels when needed -->
<button aria-label="Close menu">
```

#### Forms

- Every input has associated `<label>`
- Error messages linked with `aria-describedby`
- Required fields indicated visually and programmatically

#### Motion & Animation

- Respect `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## Special Effects

### 1. Pixel Background

```css
.pixel-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 50%, rgba(68, 187, 164, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(68, 187, 164, 0.1) 0%, transparent 50%);
    opacity: 0.5;
    z-index: 0;
}
```

### 2. Glassmorphism

```css
.glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 3. Gradient Text

```css
.gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### 4. Scroll Indicator

```css
.scroll-indicator .mouse::before {
    /* Animated dot inside mouse shape */
    animation: scroll 2s infinite;
}

@keyframes scroll {
    0%, 100% { top: 10px; opacity: 1; }
    50% { top: 25px; opacity: 0.5; }
}
```

---

## Content Principles

### Writing Guidelines

1. **Headlines:**
   - Action-oriented and benefit-driven
   - Use power words: Transform, Elevate, Revolutionize
   - Keep under 10 words when possible

2. **Body Copy:**
   - Start with the benefit, then explain
   - Use short paragraphs (2-3 sentences)
   - Bullet points for scanability

3. **CTAs:**
   - Strong verbs: Get Started, Discover, Learn More
   - Create urgency without being pushy

### Imagery Rules

- **Hero Images:**
  - Professional, high-quality
  - 1.5:1 to 16:9 aspect ratio
  - Optimized for web (WebP format preferred)

- **Icons:**
  - Font Awesome 6.4.0 (solid and brands)
  - Size: 24px-32px for feature icons
  - Always within colored containers

- **Illustrations:**
  - Use brand colors exclusively
  - Abstract/geometric style
  - SVG format preferred

---

## Implementation Checklist

When creating a new page, ensure:

- [ ] Uses official color palette (no custom colors)
- [ ] Typography scale followed (h1: 56px, h2: 42px, etc.)
- [ ] All sections have `.pixel-bg` background
- [ ] Alternating background colors (dark-bg ↔ navy-bg)
- [ ] Section headers include centered title with underline
- [ ] All cards have hover lift effect
- [ ] Buttons use pill shape (border-radius: 50px)
- [ ] AOS animations on scroll
- [ ] Mobile responsive (test at 768px, 480px)
- [ ] All links have primary color
- [ ] Form inputs have floating labels
- [ ] Icons in colored containers
- [ ] Glassmorphism on overlay elements
- [ ] Accent color borders on featured elements
- [ ] Footer included with consistent layout
- [ ] Loading states for interactive elements
- [ ] Focus states for accessibility
- [ ] Semantic HTML structure

---

## Page Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Qynzoo</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/card-nav.css">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Card Navigation -->
    <div class="card-nav-container" id="cardNavContainer"></div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="pixel-bg"></div>
        <div class="container">
            <!-- Hero content -->
        </div>
    </section>

    <!-- Content Sections -->
    <section class="[section-name]">
        <div class="pixel-bg"></div>
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Section Title</h2>
                <p class="section-subtitle">Subtitle</p>
            </div>
            <!-- Section content -->
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <!-- Footer content -->
    </footer>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
            "postprocessing": "https://cdn.jsdelivr.net/npm/postprocessing@6.34.3/build/index.js"
        }
    }
    </script>
    <script type="module" src="js/pixel-blast.js"></script>
    <script src="js/card-nav.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use colors outside the defined palette
- Use square or minimal border-radius (use 12px+ or 50px for pills)
- Forget hover states on interactive elements
- Mix gradient directions (always use 135deg)
- Ignore mobile breakpoints
- Skip AOS animations
- Use flat, single-color backgrounds
- Create cards without the accent border
- Make buttons without shadows

✅ **Do:**
- Stick to the exact hex values
- Use consistent spacing multiples
- Include pixel-bg on every section
- Add glassmorphism to overlays
- Test on actual devices
- Include all accessibility features
- Layer backgrounds for depth
- Add hover animations to all cards
- Include colored shadows on elevated elements

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 11, 2025 | Initial design system documentation |

---

## Questions?

If design decisions aren't covered here, refer to:
1. The homepage (`index.html`) as the reference implementation
2. The brand values: Modern, trustworthy, innovative
3. The principle: Less is more, but make it delightful

**Contact:** For design system updates, consult the CLAUDE.md file guidelines.
