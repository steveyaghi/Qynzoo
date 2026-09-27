/**
 * Card Navigation Component
 * Pure vanilla JS — no GSAP dependency
 */

class CardNav {
  constructor(config) {
    this.config = {
      containerId: 'cardNavContainer',
      logo: config.logo || 'images/logo.png',
      logoAlt: config.logoAlt || 'Logo',
      items: config.items || [],
      baseColor: config.baseColor || '#fff',
      menuColor: config.menuColor || '#000',
      buttonBgColor: config.buttonBgColor || '#111',
      buttonTextColor: config.buttonTextColor || '#fff',
      ...config
    };

    this.isExpanded = false;
    this.navRef = null;
    this.cardsRef = [];

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.setCollapsed();
  }

  render() {
    const container = document.getElementById(this.config.containerId);
    if (!container) return;

    container.innerHTML = `
      <nav class="card-nav">
        <div class="card-nav-top">
          <button class="hamburger-menu" aria-label="Toggle menu">
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
          </button>
          <div class="logo-container">
            <a href="${this.config.homeHref}">
              <img src="${this.config.logo}" alt="${this.config.logoAlt}" class="logo">
              <span class="logo-text">Qynzoo</span>
            </a>
          </div>
          <div class="card-nav-actions">
            ${this.renderLangSwitch()}
            <button type="button" class="card-nav-cta-button"
              onclick="window.open('https://cal.com/mostafa.yaghi', '_blank')">
              ${this.config.ctaLabel}
            </button>
          </div>
        </div>
        <div class="card-nav-content">
          ${this.renderCards()}
        </div>
      </nav>`;

    this.navRef = container.querySelector('.card-nav');
    this.cardsRef = Array.from(container.querySelectorAll('.nav-card'));
  }

  // EN | NL switch. js/lang.js exposes the other language's URL (from the
  // page's hreflang link); pages without a translation get no switch.
  renderLangSwitch() {
    const alt = window.qzAltHref;
    if (!alt) return '';
    const current = this.config.lang;
    const item = l => l === current
      ? `<span class="is-active" aria-current="true">${l.toUpperCase()}</span>`
      : `<a href="${alt}" hreflang="${l}" lang="${l}" onclick="window.qzSetLang && window.qzSetLang('${l}')">${l.toUpperCase()}</a>`;
    return `<div class="card-nav-lang" role="group" aria-label="${current === 'nl' ? 'Taal' : 'Language'}">${item('en')}${item('nl')}</div>`;
  }

  renderCards() {
    return this.config.items.slice(0, 3).map((item, index) => `
      <div class="nav-card" data-card-index="${index}"
        style="background-color:${item.bgColor};color:${item.textColor}">
        <div class="nav-card-label">${item.label}</div>
        <div class="nav-card-links">
          ${item.links.map(link => `
            <a class="nav-card-link" href="${link.href || '#'}" aria-label="${link.ariaLabel || link.label}"${link.target ? ` target="${link.target}" rel="noopener noreferrer"` : ''}>
              <svg class="nav-card-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
              ${link.label}
            </a>`).join('')}
        </div>
      </div>`).join('');
  }

  setCollapsed() {
    Object.assign(this.navRef.style, { height: '60px', overflow: 'hidden' });
    this.cardsRef.forEach(c => Object.assign(c.style, { opacity: '0', transform: 'translateY(50px)' }));
  }

  expandedHeight() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const content = this.navRef.querySelector('.card-nav-content');
      content.style.cssText += ';position:static;height:auto;visibility:visible';
      const h = 60 + 16 + content.scrollHeight;
      content.style.cssText = content.style.cssText
        .replace(';position:static', '')
        .replace(';height:auto', '')
        .replace(';visibility:visible', '');
      return h;
    }
    return 260;
  }

  toggleMenu() {
    const hamburger = this.navRef.querySelector('.hamburger-menu');

    if (!this.isExpanded) {
      this.isExpanded = true;
      hamburger.classList.add('open');
      this.navRef.classList.add('open');

      const targetH = this.expandedHeight();
      this.navRef.animate([{ height: '60px' }, { height: targetH + 'px' }],
        { duration: 400, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' });

      this.cardsRef.forEach((c, i) => {
        c.animate([
          { opacity: 0, transform: 'translateY(50px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 400, delay: 300 + i * 80, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' });
      });

      // Sync inline styles after animation
      setTimeout(() => {
        this.navRef.style.height = targetH + 'px';
        this.cardsRef.forEach(c => Object.assign(c.style, { opacity: '1', transform: 'translateY(0)' }));
      }, 700);

    } else {
      this.isExpanded = false;
      hamburger.classList.remove('open');
      this.navRef.classList.remove('open');

      this.navRef.animate([{ height: this.navRef.offsetHeight + 'px' }, { height: '60px' }],
        { duration: 200, easing: 'ease-in', fill: 'forwards' });

      this.cardsRef.forEach(c => {
        c.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(50px)' }
        ], { duration: 150, easing: 'ease-in', fill: 'forwards' });
      });

      setTimeout(() => this.setCollapsed(), 220);
    }
  }

  attachEventListeners() {
    this.navRef.querySelector('.hamburger-menu')
      .addEventListener('click', () => this.toggleMenu());

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.isExpanded) this.navRef.style.height = this.expandedHeight() + 'px';
      }, 150);
    });

    document.addEventListener('click', e => {
      if (this.isExpanded && !this.navRef.contains(e.target)) this.toggleMenu();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // CARD_NAV_BASE points at the site root (assets, blog). Dutch pages live
  // under nl/, so their page links get that prefix too.
  const base = window.CARD_NAV_BASE || '';
  const nl = (document.documentElement.lang || '').toLowerCase().startsWith('nl');
  const page = nl ? base + 'nl/' : base;
  const t = nl ? {
    work: 'Werk', results: 'Resultaten', websites: 'Websites', testimonials: 'Klanten aan het woord', how: 'Zo werken we',
    company: 'Bedrijf', about: 'Over ons', faq: 'Veelgestelde vragen', blog: 'Blog (Engels)',
    connect: 'Contact', contact: 'Neem contact op', cta: 'Gratis gesprek'
  } : {
    work: 'Work', results: 'Results', websites: 'Websites', testimonials: 'Testimonials', how: 'How It Works',
    company: 'Company', about: 'About', faq: 'FAQ', blog: 'Blog',
    connect: 'Connect', contact: 'Contact Us', cta: 'Book Free Call'
  };
  window.cardNav = new CardNav({
    logo: base + 'logos/Qynzoo_solo_logo.svg',
    logoAlt: 'Qynzoo Logo',
    lang: nl ? 'nl' : 'en',
    homeHref: page + 'index.html#home',
    ctaLabel: t.cta,
    items: [
      {
        label: t.work,
        bgColor: "#44bba4",
        textColor: "#fff",
        links: [
          { label: t.results,      href: page + "index.html#projects" },
          { label: t.websites,     href: page + "websites.html" },
          { label: t.testimonials, href: page + "index.html#testimonials" },
          { label: t.how,          href: page + "index.html#workflow" }
        ]
      },
      {
        label: t.company,
        bgColor: "#ffc107",
        textColor: "#000",
        links: [
          { label: t.about, href: page + "about.html" },
          { label: t.faq,   href: page + "faq.html" },
          { label: t.blog,  href: base + "blogs.html" }
        ]
      },
      {
        label: t.connect,
        bgColor: "#fc7753",
        textColor: "#fff",
        links: [
          { label: t.contact, href: page + "index.html#contact" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/qynzoo", target: "_blank" }
        ]
      }
    ],
    baseColor: "#fff",
    menuColor: "#000",
    buttonBgColor: "#44bba4",
    buttonTextColor: "#fff"
  });
});
