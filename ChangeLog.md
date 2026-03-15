# Qynzoo.com ChangeLog

## 2026-03-15 — Blog SEO & Footer Cleanup (v2.5.2)

### Changes Made
- **CSS version bump** — Updated `style.min.css` cache-busting query from `v=3.14` to `v=3.16` across all 10 blog files
- **Twitter social link removed** — Removed Twitter/X social icon from all 10 blog footers (LinkedIn only retained)
- **twitter:site meta tag removed** — Removed `<meta name="twitter:site" content="@qynzoo">` from all 10 blog files
- **Related Articles sections added** — Added a new `div.related-articles` inline-linked section at the bottom of each blog's article prose, with 3 customised internal links per blog

### Files Modified
- `blog-workflow-automation.html`
- `blog-make-vs-n8n.html`
- `blog-ai-productivity-2026.html`
- `blog-ai-tools-2026.html`
- `blog-ai-trends-2026.html`
- `blog-ai-customer-service.html`
- `blog-ai-replaces-saas.html`
- `blog-ai-agent-practices.html`
- `blog-claude-code-guide.html`
- `blog-prompt-engineering.html`

---

## 2026-03-15 — Form Simplification (v2.5.1)

### Changes Made
- **Contact forms** — Removed "Service Interest" dropdown from both hero and contact section forms for lower friction

---

## 2026-03-14 — Marketing CRO Overhaul (v2.5)

### Changes Made
- **Hero subtitle** — Automation-focused message replacing generic copy
- **Urgency banner** — Top sticky banner: April Special, 3 spots, 20% off before April 30
- **CTA copy** — All buttons → "Book Free 30-Min Call" → cal.com/mostafa.yaghi
- **Form simplification** — Removed "Subject" field from both forms
- **Pricing section** — 3 tiers (€500–€5,000) with ROI framing added after Services
- **Scenarios section** — "What Businesses Like Yours Typically Experience" with 3 use-case cards before Contact
- **Partners moved** — Moved after Contact section (no longer blocks conversion)
- **Cal.com booking** — Calendar booking button in Contact sidebar
- **Sticky CTA** — Floating "Book Free Call" appears after 400px scroll

### Files Modified
- `index.html`, `js/card-nav.js`

---

## 2026-03-14 — Service Link Button Text Fix (v2.4)

### Issues Fixed
- **Service link buttons text clipping** — `white-space: nowrap` + `display: inline-flex` caused long button labels like "Read: How Workflow Automation Works →" to overflow and get clipped by card edges
- Fixed by changing to `display: flex`, `white-space: normal`, `width: 100%`, `text-align: center`, and `line-height: 1.4` in `style.min.css`

### Files Modified
- `css/style.min.css` — Updated `.service-link` styles
- `css/style.css` — Updated `.service-link` styles (source)

---

## 2026-03-14 — Services Grid Layout Fix (v2.3)

### Issues Fixed
- **Services grid 3-column asymmetry** — Changed `repeat(auto-fit, minmax(320px, 1fr))` to `repeat(2, 1fr)` — now renders as a clean 2×2 grid with resources card spanning full width on row 3
- Previously card 4 was alone in a single column on a 3-col grid; resources card only spanned 2 of 3 columns

### Files Modified
- `css/style.min.css` — Updated `.services-grid` grid-template-columns

---

## 2026-03-14 — Mobile Responsiveness Fixes (v2.2)

### Issues Fixed
- **Services grid overflow** — Removed inline `grid-column: span 2` from resources card; moved span to CSS so it collapses to single column on mobile (`≤768px`)
- **Service link button overflow** — `white-space: nowrap` caused "Read: How Workflow Automation Works →" to bleed off-screen; added `white-space: normal` + `width: 100%` at `≤768px` and `≤480px`
- **Services grid min-width** — Changed `minmax(320px, 1fr)` to `minmax(min(320px, 100%), 1fr)` to prevent horizontal scroll on narrow phones
- **Hero title clipping** — Added `word-break: break-word` + `overflow-wrap: break-word` to `.hero-title`; reduced font to 26px at `≤480px`
- **Card nav mobile open state** — Fixed `.card-nav.open` to use `overflow: visible` on mobile; menu content now has proper backdrop, `border-radius`, and `max-height: 85vh` with scroll
- **Card nav 480px** — Added new `≤480px` breakpoint: container 96% width, logo text 17px, logo height 24px
- **Service card padding** — Reduced from 40px to 28px/24px at 768px/480px breakpoints
- **Section padding** — Reduced `section` padding to 60px, hero to 80px/40px on `≤480px` screens
- **iOS input zoom** — Added `font-size: 16px` on contact form inputs to prevent iOS auto-zoom

### Files Modified
- `index.html` — Removed inline grid-column span, updated inline style block for resources-card
- `css/style.min.css` — Added/updated mobile media queries at 768px and 480px
- `css/card-nav.css` — Fixed mobile open state, added 480px breakpoint



## 2026-03-13 — Blog Content Expansion (7 New Blog Articles)

### Files Created
- `blog-claude-code-guide.html` — Claude Code: The Complete Guide for Non-Developers (14 min read)
- `blog-ai-productivity-2026.html` — How to 10x Your Productivity with AI in 2026 (12 min read)
- `blog-ai-trends-2026.html` — The 7 Biggest AI Trends Shaping Business in 2026 (10 min read)
- `blog-make-vs-n8n.html` — Make vs n8n: Which Automation Platform is Right for You? (10 min read)
- `blog-ai-customer-service.html` — How AI is Transforming Customer Service (9 min read)
- `blog-prompt-engineering.html` — Prompt Engineering for Business: Get Better AI Results (10 min read)
- `blog-ai-replaces-saas.html` — How AI Agents Are Replacing Expensive SaaS Tools (10 min read)

### Each File Includes
- Full standalone HTML from DOCTYPE to closing html tag
- Schema.org Article JSON-LD structured data
- Open Graph and Twitter Card meta tags
- Responsive inline styles following brand color system (primary #44bba4, secondary #ffc107, accent #fc7753)
- Lead paragraph + prose sections + structured elements (cards, comparison tables, step lists, pull quotes)
- Author box (Mostafa Yaghi)
- 3 related article cards per post
- CTA box pointing to index.html#contact
- Standard navbar and footer matching site template
- AOS animations, GSAP, pixel-blast.js, analytics.js
- Google Analytics (G-YF5C5BCJK4)

### Content Coverage
- Claude Code installation, use cases, comparison with ChatGPT/Copilot, pricing
- AI productivity mindset, 4 levels of adoption, morning routine, tool stack, automation pipelines
- 7 AI trends: agentic AI, multimodal, SaaS disruption, local AI, AI-native businesses, real-time AI, EU AI Act
- Make vs n8n: pricing, features, pros/cons, decision framework, Zapier comparison
- AI customer service: FAQ resolution, order tracking, complaint routing, proactive outreach, post-purchase sequences
- Prompt engineering: anatomy of a prompt, 5 techniques with before/after examples, system prompts, prompt library
- AI replacing SaaS: 8 categories, savings table, 3-question audit framework, what to keep
