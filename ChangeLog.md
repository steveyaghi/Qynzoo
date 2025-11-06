# Qynzoo.com - Change Log

## Version 3.11 - Google Analytics Integration (November 6, 2025)

### Added
- **Google Analytics 4 (GA4)** integration across all website pages
  - Measurement ID: G-YF5C5BCJK4
  - Created `js/analytics.js` with comprehensive custom event tracking
  - Integrated tracking code into all 12 HTML pages:
    - index.html
    - blogs.html
    - blog.html
    - blog-geo-vs-seo.html
    - blog-local-ai.html
    - blog-workflow-automation.html
    - blog-build-chatbot.html
    - blog-ai-tools-2025.html
    - blog-ai-agent-practices.html
    - coming-soon.html
    - privacy-policy.html
    - terms-of-service.html

### Custom Event Tracking
- **Form Submissions**: Tracks all form submissions with form identification
- **Button Clicks**: Monitors all button and CTA interactions
- **Navigation Clicks**: Tracks navigation menu interactions
- **External Link Clicks**: Monitors outbound link engagement
- **Scroll Depth**: Tracks user scroll engagement at 25%, 50%, 75%, and 100%
- **Time on Page**: Records user engagement time at 30s, 1min, 2min, and 5min intervals
- **Video Interactions**: Tracks video play and completion events
- **Blog Engagement**: Monitors blog article views
- **Social Media Clicks**: Tracks social media link interactions

### Security & Privacy Updates
- **Content Security Policy (CSP)** updated on all pages with CSP headers to allow:
  - `https://www.googletagmanager.com`
  - `https://www.google-analytics.com`
  - `https://analytics.google.com`
  - `https://region1.google-analytics.com`
- **Privacy Policy** updated with comprehensive Google Analytics disclosure:
  - Detailed information about data collection
  - IP anonymization enabled
  - 14-month data retention policy
  - Opt-out instructions for users
  - Links to Google's privacy documentation
- **International Data Transfers** section updated to include Google Analytics

### Technical Details
- IP Anonymization enabled for enhanced privacy
- Anonymous tracking implementation
- Integrated with existing security headers and CSP

---

## Version 3.10 - Hero Section & Co-Founder Update
- Use local n8n logo while keeping Brandfetch for other logos
- Updated hero section layout to Zoho-style
- Added Bader as co-founder

## Version 3.9 - Logo Carousel Enhancement
- Updated logo carousel to 10 logos with drag functionality
- Consistent logo sizing across the carousel

## Version 3.7 - Brandfetch Integration
- Added Brandfetch API integration for white logo versions
- Optimized navbar closing animation
