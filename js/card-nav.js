/**
 * Card Navigation Component
 * Vanilla JavaScript implementation with GSAP animations
 */

class CardNav {
  constructor(config) {
    this.config = {
      containerId: 'cardNavContainer',
      logo: config.logo || 'images/logo.png',
      logoAlt: config.logoAlt || 'Logo',
      items: config.items || [],
      ease: config.ease || 'power3.out',
      baseColor: config.baseColor || '#fff',
      menuColor: config.menuColor || '#000',
      buttonBgColor: config.buttonBgColor || '#111',
      buttonTextColor: config.buttonTextColor || '#fff',
      ...config
    };

    this.isExpanded = false;
    this.isHamburgerOpen = false;
    this.navRef = null;
    this.cardsRef = [];
    this.timeline = null;

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.createTimeline();
  }

  render() {
    const container = document.getElementById(this.config.containerId);
    if (!container) {
      console.error(`Container with id "${this.config.containerId}" not found`);
      return;
    }

    const navHTML = `
      <nav class="card-nav">
        <div class="card-nav-top">
          <button
            class="hamburger-menu"
            aria-label="Toggle menu"
          >
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
          </button>

          <div class="logo-container">
            <a href="index.html#home">
              <img src="${this.config.logo}" alt="${this.config.logoAlt}" class="logo">
              <span class="logo-text">Qynzoo</span>
            </a>
          </div>

          <button
            type="button"
            class="card-nav-cta-button"
            onclick="window.location.href='index.html#contact'"
          >
            Get Started
          </button>
        </div>

        <div class="card-nav-content">
          ${this.renderCards()}
        </div>
      </nav>
    `;

    container.innerHTML = navHTML;
    this.navRef = container.querySelector('.card-nav');
    this.cardsRef = Array.from(container.querySelectorAll('.nav-card'));
  }

  renderCards() {
    return this.config.items.slice(0, 3).map((item, index) => `
      <div
        class="nav-card"
        data-card-index="${index}"
        style="background-color: ${item.bgColor}; color: ${item.textColor}"
      >
        <div class="nav-card-label">${item.label}</div>
        <div class="nav-card-links">
          ${item.links.map(link => `
            <a
              class="nav-card-link"
              href="${link.href || '#'}"
              aria-label="${link.ariaLabel || link.label}"
            >
              <svg class="nav-card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
              ${link.label}
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  calculateHeight() {
    if (!this.navRef) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = this.navRef.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = 'absolute';
        contentEl.style.height = '';

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  }

  createTimeline() {
    if (!this.navRef || !window.gsap) {
      console.warn('GSAP not loaded or nav not initialized');
      return;
    }

    gsap.set(this.navRef, { height: 60, overflow: 'hidden' });
    gsap.set(this.cardsRef, { y: 50, opacity: 0 });

    this.timeline = gsap.timeline({ paused: true });

    this.timeline.to(this.navRef, {
      height: () => this.calculateHeight(),
      duration: 0.4,
      ease: this.config.ease
    });

    this.timeline.to(
      this.cardsRef,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: this.config.ease,
        stagger: 0.08
      },
      '-=0.1'
    );
  }

  toggleMenu() {
    if (!this.timeline) return;

    const hamburger = this.navRef.querySelector('.hamburger-menu');

    if (!this.isExpanded) {
      this.isHamburgerOpen = true;
      this.isExpanded = true;
      hamburger.classList.add('open');
      this.navRef.classList.add('open');
      this.timeline.timeScale(1);
      this.timeline.play(0);
    } else {
      this.isHamburgerOpen = false;
      hamburger.classList.remove('open');
      this.navRef.classList.remove('open');
      this.timeline.eventCallback('onReverseComplete', () => {
        this.isExpanded = false;
      });
      this.timeline.timeScale(10);
      this.timeline.reverse();
    }
  }

  attachEventListeners() {
    const hamburger = this.navRef.querySelector('.hamburger-menu');
    if (hamburger) {
      hamburger.addEventListener('click', () => this.toggleMenu());
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.isExpanded && this.timeline) {
          const newHeight = this.calculateHeight();
          gsap.set(this.navRef, { height: newHeight });
        }
      }, 150);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isExpanded &&
          !this.navRef.contains(e.target)) {
        this.toggleMenu();
      }
    });
  }

  destroy() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}

// Initialize Card Navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP is required for Card Navigation');
    return;
  }

  // Navigation configuration
  const navConfig = {
    logo: 'logos/Qynzoo_solo_logo.svg',
    logoAlt: 'Qynzoo Logo',
    items: [
      {
        label: "Services",
        bgColor: "#44bba4",
        textColor: "#fff",
        links: [
          { label: "AI Automation", href: "index.html#services", ariaLabel: "AI Automation Services" },
          { label: "Website Building", href: "index.html#services", ariaLabel: "Website Building Services" },
          { label: "Integration", href: "index.html#services", ariaLabel: "Integration Solutions" }
        ]
      },
      {
        label: "Resources",
        bgColor: "#ffc107",
        textColor: "#000",
        links: [
          { label: "How It Works", href: "index.html#workflow", ariaLabel: "How our workflow works" },
          { label: "Blog", href: "blogs.html", ariaLabel: "Read our blog" },
          { label: "Portfolio", href: "index.html#portfolio", ariaLabel: "View our portfolio" }
        ]
      },
      {
        label: "Connect",
        bgColor: "#fc7753",
        textColor: "#fff",
        links: [
          { label: "Contact Us", href: "index.html#contact", ariaLabel: "Contact us" },
          { label: "LinkedIn", href: "#", ariaLabel: "LinkedIn" },
          { label: "Twitter", href: "#", ariaLabel: "Twitter" }
        ]
      }
    ],
    baseColor: "#fff",
    menuColor: "#000",
    buttonBgColor: "#44bba4",
    buttonTextColor: "#fff",
    ease: "power3.out"
  };

  // Create the navigation
  window.cardNav = new CardNav(navConfig);
});
