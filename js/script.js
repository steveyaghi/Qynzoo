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
const contactForm = document.getElementById('contactForm');
const formMessage = contactForm.querySelector('.form-message');

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

    // Add Web3Forms access key - REPLACE WITH YOUR KEY FROM https://web3forms.com
    formData.append('access_key', 'da59c569-21e5-499c-bc44-4fc7a94454d1');

    // Add custom subject line
    formData.append('subject', `Qynzoo Contact Form: ${formData.get('subject')}`);

    // Add your email as redirect target
    formData.append('redirect', 'false');

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

        // Add Web3Forms access key - REPLACE WITH YOUR KEY FROM https://web3forms.com
        formData.append('access_key', 'da59c569-21e5-499c-bc44-4fc7a94454d1');

        // Add custom subject line
        formData.append('subject', `Qynzoo Hero Contact Form: ${formData.get('subject')}`);

        // Add your email as redirect target
        formData.append('redirect', 'false');

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
// Back to Top Button (Optimized)
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

    const handleBackToTopVisibility = throttle(() => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, 100); // Throttle to once every 100ms

    window.addEventListener('scroll', handleBackToTopVisibility);

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
// Mouse Cursor Following Effect - REMOVED FOR PERFORMANCE
// ===================================
// This effect was causing significant performance issues
// by running requestAnimationFrame continuously at 60fps

// ===================================
// Console Message
// ===================================
console.log('%c🚀 Welcome to Qynzoo!', 'color: #44bba4; font-size: 24px; font-weight: bold;');
console.log('%cTransforming businesses with AI automation', 'color: #ffc107; font-size: 14px;');
