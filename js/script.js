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
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

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
// Active Nav Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

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
// Interactive Workflow Diagram
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

    // Add sequential animation on page load
    setTimeout(() => {
        node.style.animation = 'pulse 2s ease-in-out infinite';
    }, index * 200);
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

// Real-time validation
const inputs = contactForm.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorSpan = formGroup.querySelector('.form-error');
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

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Log form data (in production, send to server)
        console.log('Form submitted:', data);

        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        // Show error message
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// ===================================
// Newsletter Form
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input').value;
    const button = newsletterForm.querySelector('button');

    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    // Simulate submission
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Newsletter subscription:', email);

        // Success feedback
        button.innerHTML = '<i class="fas fa-check"></i>';
        newsletterForm.querySelector('input').value = '';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            button.disabled = false;
        }, 2000);

    } catch (error) {
        button.innerHTML = '<i class="fas fa-times"></i>';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-paper-plane"></i>';
            button.disabled = false;
        }, 2000);
    }
});

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Service Card Tilt Effect
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

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
// Typing Effect for Hero Title
// ===================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';

    let charIndex = 0;
    let isTag = false;
    let buffer = '';

    function typeWriter() {
        if (charIndex < text.length) {
            const currentChar = text.charAt(charIndex);

            if (currentChar === '<') {
                isTag = true;
            }

            buffer += currentChar;

            if (currentChar === '>') {
                isTag = false;
                heroTitle.innerHTML += buffer;
                buffer = '';
            } else if (!isTag) {
                heroTitle.innerHTML += currentChar;
                buffer = '';
            }

            charIndex++;

            // Adjust speed based on whether we're in a tag
            const speed = isTag ? 0 : 50;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}

// ===================================
// Scroll Progress Indicator
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

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===================================
// Add Ripple Effect to Buttons
// ===================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// ===================================
// Enhanced Portfolio Item Interactions
// ===================================
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Back to Top Button
// ===================================
const createBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #21B4A6, #1a8f84);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(33, 180, 166, 0.3);
    `;

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-5px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(33, 180, 166, 0.4)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 15px rgba(33, 180, 166, 0.3)';
    });

    document.body.appendChild(backToTop);
};

createBackToTop();

// ===================================
// Mouse Cursor Following Effect (with brand colors)
// ===================================
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(68, 187, 164, 0.6), rgba(68, 187, 164, 0.1));
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.15s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    const cursorTrail = [];
    const trailColors = [
        'rgba(252, 119, 83, 0.5)',  // Coral/Red (accent color)
        'rgba(255, 193, 7, 0.4)',    // Yellow (secondary color)
        'rgba(68, 187, 164, 0.3)'    // Green (primary color)
    ];

    for (let i = 0; i < 3; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${15 - i * 3}px;
            height: ${15 - i * 3}px;
            border-radius: 50%;
            background: ${trailColors[i]};
            pointer-events: none;
            z-index: ${9997 - i};
            transition: all 0.0${5 + i}s ease;
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.6;
        cursorY += (mouseY - cursorY) * 0.6;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        cursorTrail.forEach((trail, index) => {
            const delay = (index + 1) * 0.15;
            const trailX = cursorX + (mouseX - cursorX) * delay;
            const trailY = cursorY + (mouseY - cursorY) * delay;
            trail.style.left = trailX - (7.5 - index * 1.5) + 'px';
            trail.style.top = trailY - (7.5 - index * 1.5) + 'px';
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Add hover effects with coral accent
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, rgba(252, 119, 83, 0.8), rgba(252, 119, 83, 0.2))';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(68, 187, 164, 0.6), rgba(68, 187, 164, 0.1))';
        });
    });
};

createCursorEffect();

// ===================================
// Console Message
// ===================================
console.log('%c🚀 Welcome to Qynzoo!', 'color: #44bba4; font-size: 24px; font-weight: bold;');
console.log('%cTransforming businesses with AI automation', 'color: #ffc107; font-size: 14px;');
