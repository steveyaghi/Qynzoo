// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Throttle Utility Function
// ===================================
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// ===================================
// Navbar Scroll Effect (Optimized)
// ===================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
    const handleNavbarScroll = throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, 100); // Throttle to once every 100ms

    window.addEventListener('scroll', handleNavbarScroll);
}

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Active Nav Link on Scroll (Optimized)
// ===================================
const sections = document.querySelectorAll('section[id]');

const handleActiveNav = throttle(() => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        // Only update if the nav link exists
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}, 100); // Throttle to once every 100ms

window.addEventListener('scroll', handleActiveNav);

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Counter Animation for Stats
// ===================================
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    hasAnimated = true;
};

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// Benefits Tabs Functionality
// ===================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===================================
// Portfolio Filter Functionality
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Interactive Workflow Diagram (Optimized)
// ===================================
const diagramNodes = document.querySelectorAll('.diagram-node');

diagramNodes.forEach((node, index) => {
    node.addEventListener('mouseenter', () => {
        diagramNodes.forEach(n => n.style.opacity = '0.5');
        node.style.opacity = '1';
    });

    node.addEventListener('mouseleave', () => {
        diagramNodes.forEach(n => n.style.opacity = '1');
    });

    // Reduced animation - only pulse on hover instead of continuous
    // This significantly reduces CPU usage
});

// Add subtle pulse animation only on hover
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
    }
    .diagram-node:hover {
        animation: pulse 1.5s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// ===================================
// Contact Form Validation & Submission
// ===================================
// contactForm itself is only present on index.html — guarded below so pages
// without it (blog articles, case studies) don't throw and halt the rest of
// this file. validateField/validateForm stay at top level since the Hero
// Contact Form block further down also calls validateField independently.
const contactForm = document.getElementById('contactForm');
const inputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];

function validateField(field) {
    const formGroup = field.closest('.form-group');

    // If no form-group found, skip validation UI updates but still validate
    if (!formGroup) {
        return true;
    }

    const errorSpan = formGroup.querySelector('.form-error');

    // If no error span found, skip validation UI updates but still validate
    if (!errorSpan) {
        return true;
    }

    let isValid = true;
    let errorMessage = '';

    // Check if field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Select validation
    if (field.tagName === 'SELECT' && field.value === '') {
        isValid = false;
        errorMessage = 'Please select an option';
    }

    // Update UI
    if (isValid) {
        formGroup.classList.remove('error');
        errorSpan.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorSpan.textContent = errorMessage;
    }

    return isValid;
}

function validateForm() {
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Form submission (only wired up when the contact form is actually present)
if (contactForm) {
const formMessage = contactForm.querySelector('.form-message');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Get form data
    const formData = new FormData(contactForm);

    // SECURITY: Honeypot check - prevent bot submissions
    if (formData.get('botcheck')) {
        console.warn('Bot detected via honeypot field');
        return; // Silently reject bot submission
    }

    // Add Web3Forms access key - REPLACE WITH YOUR KEY FROM https://web3forms.com
    formData.append('access_key', 'f9c00394-0832-45ac-b316-96aff3f7d112');

    // Add custom subject line
    formData.append('subject', `Qynzoo Contact Form: ${formData.get('subject')}`);

    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Convert FormData to JSON
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Send email via Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Show success message
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            formMessage.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        } else {
            throw new Error(result.message || 'Failed to send message');
        }

    } catch (error) {
        // Show error message
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        formMessage.style.display = 'block';
        console.error('Form submission error:', error);

        // Hide error message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});
} // end if (contactForm)

// ===================================
// Hero Contact Form
// ===================================
const heroContactForm = document.getElementById('heroContactForm');
if (heroContactForm) {
    const heroFormMessage = heroContactForm.querySelector('.form-message');
    const heroInputs = heroContactForm.querySelectorAll('input, textarea, select');

    // Real-time validation for hero form
    heroInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Hero form submission
    heroContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        let isValid = true;
        heroInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Get form data
        const formData = new FormData(heroContactForm);

        // SECURITY: Honeypot check - prevent bot submissions
        if (formData.get('botcheck')) {
            console.warn('Bot detected via honeypot field');
            return; // Silently reject bot submission
        }

        // Add Web3Forms access key - REPLACE WITH YOUR KEY FROM https://web3forms.com
        formData.append('access_key', 'f9c00394-0832-45ac-b316-96aff3f7d112');

        // Add custom subject line
        formData.append('subject', `Qynzoo Hero Contact Form: ${formData.get('subject')}`);

        // Show loading state
        const submitBtn = heroContactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Convert FormData to JSON
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Send email via Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show success message
                heroFormMessage.className = 'form-message success';
                heroFormMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                heroFormMessage.style.display = 'block';

                // Reset form
                heroContactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    heroFormMessage.style.display = 'none';
                    heroFormMessage.className = 'form-message';
                    heroFormMessage.textContent = '';
                }, 5000);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            // Show error message with details
            heroFormMessage.className = 'form-message error';
            heroFormMessage.textContent = `Error: ${error.message || 'Something went wrong. Please try again later.'}`;
            heroFormMessage.style.display = 'block';
            console.error('Hero form submission error:', error);
            console.error('Error details:', error.message);

            // Hide error message after 5 seconds
            setTimeout(() => {
                heroFormMessage.style.display = 'none';
                heroFormMessage.className = 'form-message';
                heroFormMessage.textContent = '';
            }, 5000);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// Newsletter Form
// ===================================
// Only present in the footer on some pages — guard so pages without it
// don't throw and halt the rest of this file.
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterMessage = document.querySelector('.newsletter-message');

if (newsletterForm) {
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = newsletterForm.querySelector('input');
    const email = input.value;

    // The newsletter isn't live yet — be upfront about that rather than
    // faking a successful subscription.
    if (newsletterMessage) {
        newsletterMessage.textContent = `Thanks for trying this out${email ? ', ' + email : ''}! The newsletter is coming soon — we'll let you know when it's live.`;
        newsletterMessage.classList.add('visible');
    }

    input.value = '';

    if (newsletterMessage) {
        setTimeout(() => {
            newsletterMessage.classList.remove('visible');
        }, 6000);
    }
});
} // end if (newsletterForm)

// ===================================
// Parallax Effect for Hero Background - DISABLED PER USER REQUEST
// ===================================
// Parallax effect removed to reduce CPU usage

// ===================================
// Service Card Tilt Effect - DISABLED PER USER REQUEST
// ===================================
// Tilt effect removed to reduce CPU usage

// ===================================
// Lazy Loading Images
// ===================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Hero Typewriter Effect
// ===================================
// Types the H1 out character by character, then each hero subtitle line in
// turn. Tags (e.g. any inline markup inside the title) are written in one
// step rather than character-by-character so a partial "<sp" is never
// rendered. Skipped entirely under prefers-reduced-motion.
(function initHeroTypewriter() {
    const heroTitle = document.querySelector('.neo-hero-centered .hero-title');
    if (!heroTitle) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const subtitles = Array.from(document.querySelectorAll('.neo-hero-centered .hero-subtitle'));
    const elements = [heroTitle, ...subtitles];

    if (prefersReducedMotion) return; // leave the static server-rendered text as-is

    const originalTexts = elements.map(el => el.innerHTML);
    elements.forEach(el => { el.innerHTML = ''; });

    function typeElement(el, text, onDone) {
        let i = 0;
        let buffer = '';
        let inTag = false;

        function step() {
            if (i >= text.length) {
                onDone();
                return;
            }
            const ch = text.charAt(i);
            if (ch === '<') inTag = true;
            buffer += ch;

            if (ch === '>') {
                inTag = false;
                el.innerHTML += buffer;
                buffer = '';
            } else if (!inTag) {
                el.innerHTML += ch;
                buffer = '';
            }

            i++;
            const isTitle = el === heroTitle;
            const speed = inTag ? 0 : (isTitle ? 13 : 4);
            setTimeout(step, speed);
        }
        step();
    }

    function typeSequence(index) {
        if (index >= elements.length) return;
        const el = elements[index];
        el.classList.add('neo-typewriter-cursor');
        typeElement(el, originalTexts[index], () => {
            el.classList.remove('neo-typewriter-cursor');
            if (index === elements.length - 1) {
                // Leave a gentle blinking cursor on the last line once done.
                el.classList.add('neo-typewriter-cursor', 'done');
            }
            typeSequence(index + 1);
        });
    }

    setTimeout(() => typeSequence(0), 150);
})();

// ===================================
// Hero Floating Bubbles — breathe in, then randomized drift
// ===================================
// On load, each bubble plays a one-time "breathe" pulse (CSS
// .neo-bubble-breathe / @keyframes neo-bubble-breathe-in in neo.css) —
// grows in and settles, announcing the cluster instead of it just
// appearing static. Once that finishes, randomized drift takes over: each
// bubble picks a random offset/rotation/duration and transitions there
// (transition set INLINE per-drift, deliberately not through the shared
// .neo-bubble CSS rule — see the comment on that rule for why: doing it
// via a shared CSS variable meant the slow multi-second drift duration
// leaked into the hover-out transition too, so bubbles took the same 4-8s
// to shrink back after a hover as they did to drift, which read as "never
// shrinks back"), then on transitionend rolls a new random target — so no
// two bubbles ever move in sync and the path never repeats.
(function initFloatingBubbles() {
    const bubbles = Array.from(document.querySelectorAll('.neo-bubble'));
    if (!bubbles.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function driftOnce(bubble) {
        const x = randomBetween(-16, 16);
        const y = randomBetween(-28, -6); // always drifts upward-biased, never downward past its start
        const rotate = randomBetween(-6, 6);
        const duration = randomBetween(4.5, 8.5);

        // Set via the --neo-bubble-drift-active CUSTOM PROPERTY, not a
        // literal `style.transition` value — the base .neo-bubble rule's
        // transition-duration reads this property with var(), and the
        // hover rule overrides the same property with !important while
        // hovered. Because both sides go through the one property instead
        // of one writing an inline value the other can never take back,
        // the fast hover duration correctly reverts to whatever this set
        // once the mouse leaves — including switching back to a fast
        // fallback the instant hover starts (the property is genuinely
        // overridden, not just visually masked by a higher-specificity
        // transform).
        bubble.style.setProperty('--neo-bubble-drift-active', duration.toFixed(2) + 's');
        bubble.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rotate.toFixed(1)}deg)`;
    }

    bubbles.forEach((bubble, i) => {
        const breatheDelay = i * 90; // slight stagger so the 6 don't pulse in perfect unison
        bubble.classList.add('neo-bubble-breathe');
        bubble.style.animationDelay = breatheDelay + 'ms';

        // Start drifting only once this bubble's breathe-in has actually
        // finished, so the pulse never gets cut off by a drift transform
        // starting mid-animation.
        const breatheDuration = 1100; // matches the 1.1s in the CSS animation
        setTimeout(() => {
            bubble.classList.remove('neo-bubble-breathe');
            bubble.style.animationDelay = '';
            driftOnce(bubble);
            bubble.addEventListener('transitionend', (e) => {
                // Only react to the transform transition finishing, and only
                // if the bubble isn't mid-hover (hover's !important transform
                // fires its own transitionend we don't want to chain from).
                if (e.propertyName === 'transform' && !bubble.matches(':hover, :focus-visible')) {
                    driftOnce(bubble);
                }
            });

            // The hover rule's !important override on --neo-bubble-drift-active
            // only lasts as long as :hover matches. The instant it stops
            // matching, the cascade falls back to whatever THIS element's own
            // inline value is — which, without this listener, would still be
            // whatever slow drift duration was last set, making the shrink-back
            // just as slow as the drift itself. Force it fast on the way out,
            // explicitly, rather than relying on CSS fallback semantics for
            // something CSS alone can't express ("fast on the way out, but
            // only the very next transition, then back to slow").
            bubble.addEventListener('mouseleave', () => {
                bubble.style.setProperty('--neo-bubble-drift-active', '0.2s');
            });
            bubble.addEventListener('blur', () => {
                bubble.style.setProperty('--neo-bubble-drift-active', '0.2s');
            });
        }, breatheDelay + breatheDuration);
    });
})();

// ===================================
// Scroll Progress Indicator (Optimized)
// ===================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #21B4A6, #1a8f84);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const handleScrollProgress = throttle(() => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, 100); // Throttle to once every 100ms

    window.addEventListener('scroll', handleScrollProgress);
};

createScrollProgress();

// ===================================
// Ripple Effect - REMOVED PER USER REQUEST
// ===================================
// Ripple effect removed for cleaner interaction

// ===================================
// Enhanced Portfolio Item Interactions
// ===================================
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Back to Top Button — removed per user request (was colliding with the
// sticky "Book Free Call" CTA on mobile). No replacement; the site relies
// on the fixed nav bar's logo/home link for a way back to the top.
// ===================================

// ===================================
// Mouse Cursor Following Effect - REMOVED FOR PERFORMANCE
// ===================================
// This effect was causing significant performance issues
// by running requestAnimationFrame continuously at 60fps

// ===================================
// FAQ Accordion
// ===================================
// Was an inline onclick="this.parentElement.classList.toggle('open')" plus
// a duplicate inline <script> block re-wiring the same buttons — neither
// ever fired on a real click (confirmed via direct event dispatch testing;
// calling the handler function directly worked fine, only the browser's
// own click dispatch to inline script/attributes did not). Moved here, to
// the external script file, which is unambiguously allowed by the site's
// CSP (script-src 'self') and does fire correctly.
document.querySelectorAll('.neo-faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
    });
});

// ===================================
// Hero "which problem sounds like you?" accordion — one item open at
// a time; clicking the open item closes it.
// ===================================
document.querySelectorAll('.qz-problem-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.closest('.qz-problem-item');
        const wasOpen = item.classList.contains('is-open');
        item.parentElement.querySelectorAll('.qz-problem-item.is-open').forEach(el => el.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
    });
});

// ===================================
// Logo Marquee — drag/swipe to scroll
// ===================================
// The belt auto-scrolls via a CSS @keyframes loop (translateX 0 -> -50%,
// wrapping seamlessly since the track is two identical groups back to
// back). Dragging pauses that animation and drives an inline transform
// directly off the pointer instead; on release we convert the drag's
// final offset into a matching negative animation-delay so the CSS loop
// picks up from exactly that visual position — no jump, no restart from 0.
document.querySelectorAll('.qz-marquee-track').forEach(function initMarqueeDrag(track) {
    // .is-reverse belts run the same keyframes backwards (left to right).
    const reverse = track.classList.contains('is-reverse');

    const group = track.querySelector('.qz-marquee-group');
    if (!group) return;

    const groups = Array.from(track.querySelectorAll('.qz-marquee-group'));
    const logoSets = groups.map(g => Array.from(g.children));
    const SPEED = 18; // px per second, kept constant however long the belt gets

    let groupWidth = 0;
    let DURATION = 50;

    // The -50% loop is only seamless if one group is wider than the screen;
    // otherwise the belt runs out and leaves a gap. Repeat the logo set in
    // both groups (identically) until it covers the viewport.
    function fillBelt() {
        groupWidth = group.getBoundingClientRect().width;
        if (!groupWidth) return;
        let guard = 0;
        while (groupWidth < window.innerWidth + 200 && guard++ < 10) {
            groups.forEach((g, i) => logoSets[i].forEach(img => {
                const clone = img.cloneNode(true);
                if (clone.tagName === 'IMG') clone.alt = '';
                clone.setAttribute('aria-hidden', 'true');
                g.appendChild(clone);
            }));
            groupWidth = group.getBoundingClientRect().width;
        }
        DURATION = groupWidth / SPEED;
        track.style.animationDuration = `${DURATION}s`;
    }
    fillBelt();
    window.addEventListener('resize', fillBelt);

    let isDragging = false;
    let startX = 0;
    let startOffset = 0; // px already scrolled (positive = moved left) at drag start
    let currentOffset = 0;

    function getAnimationOffset() {
        // Reads the animation's current visual translateX via computed style,
        // independent of how long it's been running or any prior drag.
        const matrix = getComputedStyle(track).transform;
        if (!matrix || matrix === 'none') return 0;
        const match = matrix.match(/matrix\(([^)]+)\)/);
        if (!match) return 0;
        const parts = match[1].split(',').map(parseFloat);
        return -parts[4]; // tx is negative as the belt moves left; store as positive offset
    }

    function onPointerDown(e) {
        isDragging = true;
        track.classList.add('is-dragging');
        startX = e.clientX;
        startOffset = getAnimationOffset();
        currentOffset = startOffset;
        // Freeze at the current visual position before taking over with drag.
        track.style.animation = 'none';
        track.style.transform = `translateX(${-startOffset}px)`;
        track.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        currentOffset = startOffset - dx; // dragging right (dx>0) should reveal earlier logos
        // Wrap within [0, groupWidth) so a long drag never runs out of belt.
        let wrapped = currentOffset % groupWidth;
        if (wrapped < 0) wrapped += groupWidth;
        track.style.transform = `translateX(${-wrapped}px)`;
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('is-dragging');
        try { track.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }

        let wrapped = currentOffset % groupWidth;
        if (wrapped < 0) wrapped += groupWidth;

        // Hand back to the CSS animation at the same visual offset: a negative
        // delay of (offset / groupWidth) * DURATION seconds into the loop.
        track.style.transform = '';
        track.style.animation = 'none';
        void track.offsetWidth; // force reflow so the next animation value re-triggers
        // A reversed loop runs from -50% back to 0, so its progress is mirrored.
        const progress = reverse ? (groupWidth - wrapped) % groupWidth : wrapped;
        const delay = -(progress / groupWidth) * DURATION;
        track.style.animation = `qz-marquee ${DURATION}s linear infinite${reverse ? ' reverse' : ''}`;
        track.style.animationDelay = `${delay}s`;
    }

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);
});

// ===================================
// Project hover pill
// ===================================
// Desktop and tablet: the project card itself reshapes into a full-width
// pill. The card is lifted out of the grid (a hidden placeholder keeps its
// slot) and its box is animated from the card's rect to the pill's rect,
// then back on close. Mouse opens on hover; touch opens on the first tap
// and follows the link on the second. Phones open the pill in the card.
(function initProjectPills() {
    const grid = document.querySelector('.qz-projects-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.qz-project-card')).filter(c => c.querySelector('.qz-pill'));
    if (!cards.length) return;

    const PILL_H = 320;   // pill height in px
    const RADIUS = 26;    // must match .qz-project-card border-radius
    const DURATION = 550;
    const EASE = 'cubic-bezier(0.65, 0, 0.25, 1)';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const lifted = new Map(); // card -> { ph, anim } while it is out of the grid
    let stacked = false;
    let tap = false;
    let openCard = null;
    let openTimer = null;
    let slideTimer = null;

    function setMode() {
        reset();
        stacked = window.innerWidth < 760;
        tap = stacked || !hoverQuery.matches;
        grid.classList.add('has-pills');
        grid.classList.toggle('is-stacked', stacked);
        grid.classList.toggle('is-tap', tap);
    }

    // Photos load on first open only, so the section costs nothing until used.
    function loadMedia(card) {
        const media = card.querySelector('.qz-pill-media');
        if (media.dataset.loaded) return;
        media.dataset.loaded = '1';
        if (media.dataset.photos) {
            media.dataset.photos.split(',').forEach((src, i) => {
                const img = new Image();
                img.src = src;
                img.alt = '';
                img.className = 'qz-pill-slide' + (i === 0 ? ' is-active' : '');
                media.appendChild(img);
            });
        } else if (media.dataset.logo) {
            media.classList.add('is-logo');
            const img = new Image();
            img.src = media.dataset.logo;
            img.alt = '';
            media.appendChild(img);
        }
    }

    function startSlides(card) {
        stopSlides();
        const slides = card.querySelectorAll('.qz-pill-slide');
        if (slides.length < 2 || reduceMotion) return;
        let i = Array.from(slides).findIndex(s => s.classList.contains('is-active'));
        slideTimer = setInterval(() => {
            slides[i].classList.remove('is-active');
            i = (i + 1) % slides.length;
            slides[i].classList.add('is-active');
        }, 2600);
    }

    function stopSlides() {
        clearInterval(slideTimer);
        slideTimer = null;
    }

    // Box of an element relative to the grid (includes running animations).
    function boxOf(el) {
        const g = grid.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return { left: r.left - g.left, top: r.top - g.top, width: r.width, height: r.height };
    }

    function frame(box, radius) {
        return {
            left: `${box.left}px`,
            top: `${box.top}px`,
            width: `${box.width}px`,
            height: `${box.height}px`,
            borderRadius: `${radius}px`
        };
    }

    function pillBox(ph) {
        const slot = boxOf(ph);
        const top = Math.max(0, Math.min(slot.top + slot.height / 2 - PILL_H / 2, grid.clientHeight - PILL_H));
        return { left: 0, top, width: grid.clientWidth, height: PILL_H };
    }

    // Animate the card's box from wherever it is now to `to`.
    function morph(card, to, toRadius, done) {
        const s = lifted.get(card);
        const from = boxOf(card);
        const fromRadius = parseFloat(getComputedStyle(card).borderTopLeftRadius) || RADIUS;
        if (s.anim) s.anim.cancel();
        Object.assign(card.style, frame(to, toRadius));
        const anim = card.animate([frame(from, fromRadius), frame(to, toRadius)], { duration: DURATION, easing: EASE });
        s.anim = anim;
        const finish = () => {
            if (s.anim !== anim) return; // superseded by a newer morph
            anim.cancel(); // inline styles already hold the end frame
            s.anim = null;
            if (done) done();
        };
        anim.onfinish = finish;
        // Backup: a throttled tab can hold back the finish event, which
        // would leave the card lifted out of the grid.
        setTimeout(finish, DURATION + 100);
    }

    // Take the card out of the grid flow, leaving a same-size placeholder.
    function lift(card) {
        if (lifted.has(card)) return;
        const box = boxOf(card);
        const cs = getComputedStyle(card);
        const ph = document.createElement('div');
        ph.className = 'qz-project-ph';
        ph.style.gridColumnStart = cs.gridColumnStart;
        ph.style.gridColumnEnd = cs.gridColumnEnd;
        ph.style.gridRowStart = cs.gridRowStart;
        ph.style.gridRowEnd = cs.gridRowEnd;
        ph.style.height = `${box.height}px`;
        card.before(ph);
        lifted.set(card, { ph, anim: null });
        Object.assign(card.style, frame(box, RADIUS));
        card.classList.add('is-morphing');
    }

    // Put the card back into its grid slot.
    function drop(card) {
        const s = lifted.get(card);
        if (!s || card === openCard) return;
        if (s.anim) s.anim.cancel();
        s.ph.remove();
        card.classList.remove('is-morphing');
        ['left', 'top', 'width', 'height', 'borderRadius'].forEach(p => { card.style[p] = ''; });
        lifted.delete(card);
    }

    function open(card) {
        if (openCard === card) return;
        close();
        loadMedia(card);
        openCard = card;
        grid.classList.add('has-open');
        card.classList.add('is-pill-open');
        startSlides(card);
        if (stacked) return;
        // Return any card that finished closing but is still lifted.
        lifted.forEach((s, c) => { if (c !== card && !s.anim) drop(c); });
        lift(card);
        morph(card, pillBox(lifted.get(card).ph), PILL_H / 2);
    }

    function close() {
        clearTimeout(openTimer);
        if (!openCard) return;
        const card = openCard;
        openCard = null;
        grid.classList.remove('has-open');
        card.classList.remove('is-pill-open');
        stopSlides();
        const s = lifted.get(card);
        if (s) morph(card, boxOf(s.ph), RADIUS, () => drop(card));
    }

    function reset() {
        clearTimeout(openTimer);
        stopSlides();
        if (openCard) openCard.classList.remove('is-pill-open');
        openCard = null;
        grid.classList.remove('has-open');
        Array.from(lifted.keys()).forEach(drop);
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (tap) return;
            clearTimeout(openTimer);
            // Short delay so sweeping the mouse across the grid doesn't open every card.
            openTimer = setTimeout(() => open(card), 120);
        });
        card.addEventListener('mouseleave', () => {
            if (tap) return;
            clearTimeout(openTimer);
            if (openCard === card) close();
        });
        card.addEventListener('click', e => {
            if (!tap || openCard === card) return;
            e.preventDefault();
            open(card);
            if (stacked) card.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    });

    document.addEventListener('click', e => {
        if (tap && openCard && !openCard.contains(e.target)) close();
    });
    if (hoverQuery.addEventListener) hoverQuery.addEventListener('change', setMode);
    window.addEventListener('resize', () => {
        if ((window.innerWidth < 760) !== stacked || (stacked || !hoverQuery.matches) !== tap) {
            setMode();
        } else if (openCard && lifted.has(openCard)) {
            Object.assign(openCard.style, frame(pillBox(lifted.get(openCard).ph), PILL_H / 2));
        }
    });

    setMode();
})();

// ===================================
// Console Message
// ===================================
console.log('%c🚀 Welcome to Qynzoo!', 'color: #44bba4; font-size: 24px; font-weight: bold;');
console.log('%cTransforming businesses with AI automation', 'color: #ffc107; font-size: 14px;');

