// Google Analytics 4 Configuration
// Measurement ID: G-YF5C5BCJK4

// Initialize GA4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YF5C5BCJK4', {
    'send_page_view': true,
    'anonymize_ip': true
});

// Custom Event Tracking
document.addEventListener('DOMContentLoaded', function() {

    // Track Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const formId = form.id || form.className || 'unknown_form';
            gtag('event', 'form_submission', {
                'event_category': 'Form',
                'event_label': formId,
                'form_name': formId
            });
        });
    });

    // Track Button Clicks
    const buttons = document.querySelectorAll('button, .btn, .cta-button, .card-button');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const buttonText = button.textContent.trim() || button.getAttribute('aria-label') || 'Unknown Button';
            const buttonId = button.id || button.className;
            gtag('event', 'button_click', {
                'event_category': 'Button',
                'event_label': buttonText,
                'button_id': buttonId
            });
        });
    });

    // Track Navigation Link Clicks
    const navLinks = document.querySelectorAll('nav a, .navbar a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const linkText = link.textContent.trim();
            const linkHref = link.getAttribute('href');
            gtag('event', 'navigation_click', {
                'event_category': 'Navigation',
                'event_label': linkText,
                'link_url': linkHref
            });
        });
    });

    // Track External Link Clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const linkUrl = link.getAttribute('href');
            if (!linkUrl.includes('qynzoo.com')) {
                gtag('event', 'outbound_click', {
                    'event_category': 'Outbound Link',
                    'event_label': linkUrl,
                    'link_domain': new URL(linkUrl).hostname
                });
            }
        });
    });

    // Track Scroll Depth (25%, 50%, 75%, 100%)
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        scrollDepths.forEach(function(depth) {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                gtag('event', 'scroll_depth', {
                    'event_category': 'Engagement',
                    'event_label': depth + '%',
                    'scroll_percentage': depth
                });
            }
        });
    });

    // Track CTA Clicks (Call-to-Action)
    const ctaButtons = document.querySelectorAll('[href*="contact"], [class*="cta"]');
    ctaButtons.forEach(function(cta) {
        cta.addEventListener('click', function() {
            const ctaText = cta.textContent.trim();
            gtag('event', 'cta_click', {
                'event_category': 'CTA',
                'event_label': ctaText
            });
        });
    });

    // Track Video Interactions (if any videos exist)
    const videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
        video.addEventListener('play', function() {
            gtag('event', 'video_play', {
                'event_category': 'Video',
                'event_label': video.src || 'embedded_video'
            });
        });

        video.addEventListener('ended', function() {
            gtag('event', 'video_complete', {
                'event_category': 'Video',
                'event_label': video.src || 'embedded_video'
            });
        });
    });

    // Track Time on Page
    let timeOnPage = 0;
    setInterval(function() {
        timeOnPage += 10;
        // Track engagement at 30 seconds, 1 minute, 2 minutes, 5 minutes
        if ([30, 60, 120, 300].includes(timeOnPage)) {
            gtag('event', 'time_on_page', {
                'event_category': 'Engagement',
                'event_label': timeOnPage + ' seconds',
                'time_seconds': timeOnPage
            });
        }
    }, 10000); // Check every 10 seconds

    // Track Blog Article Engagement
    const blogContent = document.querySelector('.blog-content, article');
    if (blogContent) {
        gtag('event', 'blog_view', {
            'event_category': 'Content',
            'event_label': document.title,
            'page_title': document.title
        });
    }

    // Track Social Media Link Clicks
    const socialLinks = document.querySelectorAll('[href*="linkedin"], [href*="twitter"], [href*="facebook"], [href*="instagram"]');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const platform = link.getAttribute('href').match(/linkedin|twitter|facebook|instagram/i)[0];
            gtag('event', 'social_click', {
                'event_category': 'Social Media',
                'event_label': platform
            });
        });
    });
});

console.log('Google Analytics 4 initialized with custom event tracking');
