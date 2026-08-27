# Qynzoo.com ChangeLog

## 2026-08-27 — Philosophy Statement, Honest Newsletter, Twitter Cleanup (v4.1.1)

### Summary
Added the "AI won't replace humans" philosophy statement as its own homepage
section, fixed the newsletter signup so it no longer fakes a successful
subscription, and removed every Twitter/X reference from the site (icons,
links, and the `twitter:site` meta claiming a `@qynzoo` handle that never
existed).

### Changes Made
- **New Philosophy section** (`index.html`, `#philosophy`) — placed between
  Projects and How It Works, so it lands after the reader has already seen the
  Fugro/Haskoning/ODIDO/Waterprof proof, not before it. New `.neo-philosophy-card`
  styling in `css/neo.css` (centered card, matches the existing neo-brutalist
  border treatment).
- **Newsletter form fixed** (`js/script.js`, `js/script.min.js`) — it previously
  showed a spinner → checkmark and claimed success on every submit with no
  backend behind it. It now shows an honest inline message: *"Thanks for trying
  this out! The newsletter is coming soon — we'll let you know when it's live."*
  New `.newsletter-message` styling in `css/style.css` and `css/style.min.css`
  (fades in, auto-hides after 6s, reuses the same pattern as `.form-message` on
  the contact form).
- **Twitter fully removed**:
  - `coming-soon.html` — dropped the "Twitter - Coming Soon" social icon
  - `blogs.html`, `sitemap.html` — dropped the live `twitter.com/qynzoo` footer
    icon link
  - `blogs.html`, `privacy-policy.html`, `sitemap.html`, `terms-of-service.html`
    — removed `<meta name="twitter:site" content="@qynzoo">`, which claimed a
    handle that was never registered
  - Left the `twitter:card`/`twitter:title`/`twitter:description`/`twitter:image`
    meta tags in place — those control how *any* link to the site previews when
    shared on X, regardless of whether Qynzoo has an account there, so removing
    them would only make link previews worse for no benefit
- **Cache-busters bumped**: `style.min.css?v=4.1` → `v=4.2`, `script.min.js?v=4.0`
  → `v=4.1`. Footer version stamp `V4.1.0` → `V4.1.1` sitewide.

### Not done in this pass
- **Testimonials** — user is waiting on permission from clients before sending
  content; placement to be decided once quotes exist.
- **Hero photo / "looks like a small company" feedback** — advised to keep the
  photo but reduce its visual dominance in the hero and move the philosophy
  statement near it once the hero is restructured, rather than removing the
  photo outright (removing it pushes toward an anonymous-institutional look
  Qynzoo can't actually back with headcount). This is a layout change, scoped
  separately — not implemented yet, pending user sign-off on a concrete hero
  redesign.

---

## 2026-08-27 — Case Studies Build-Out (v4.1.0)

### Summary
Wrote up all four client projects (Fugro, Haskoning, Odido, Waterprof) with full
Problem / Approach / Results content. Three of the four case-study pages were
linked from the homepage but did not exist on disk — those links were 404ing.

### Files Created
- `case-studies/haskoning.html` — RAG risk-register agent on n8n (was a broken link)
- `case-studies/odido.html` — nationwide retail reporting automation (was a broken link)
- `case-studies/waterprof.html` — secure Azure LinkedIn content agent (was a broken link)
- `scripts/gen_case_studies.js` — Node generator; renders all four pages from one
  shared template so head/nav/footer/schema stay identical across them. Edit the
  content objects in this file and re-run `node scripts/gen_case_studies.js`
  rather than hand-editing the generated HTML.
- `images/n8n-haskoning.png`, `images/n8n-risk-lens-frontend.png` — URL-safe copies
  of the two Haskoning screenshots (originals had spaces in their filenames)

### Changes Made
- **`case-studies/fugro.html` rewritten** — replaced the "results being finalized"
  placeholder with the real outcome, including the negative finding on friction
  angle (dataset too small/inconsistent to learn from). New H1 uses the full
  research title; `Auto-Encoders` added to the tool chips, `Support Vector
  Machines` removed.
- **Haskoning screenshots embedded** — n8n workflow and the Risk Lens front end,
  shown under The Approach.
- **`index.html`** — all four project card blurbs rewritten; Fugro card title
  changed to "Predicting Dike Stability Variables with Machine Learning".
- **`css/neo.css`** — added `.case-figure` / `.case-figure-stack` figure styling
  (framed image + caption, matching the existing neo-brutalist border treatment).
- **Footer version normalized** — pages were inconsistently stamped `V3.13`,
  `V4.0.0`, and `V4.1.0`; all now read `V4.1.0`.
- **Cache-buster** — `neo.css?v=6.1` → `v=6.3` sitewide.

### Design Decisions
- **Figures stack full-width instead of sitting side by side.** The two Haskoning
  screenshots have opposite aspect ratios (workflow 1705×732 landscape, UI
  758×1024 portrait). In a two-column grid the workflow rendered ~300px wide,
  which made its node labels unreadable. Stacked, it gets 1013px — over 3× wider.
  `.is-wide` (1100px cap) is for the workflow; `.is-portrait` (520px cap) keeps
  the UI shot from towering over the page.
- **Odido has no hard metric.** Written qualitatively on purpose — no numbers were
  invented. If reports/week, hours saved, or a before/after error rate surface
  later, they belong in the Results section of `case-studies/odido.html`.

### Verification
Checked in-browser at desktop and 375px mobile: all four pages return 200, both
images load, no console errors, no horizontal overflow on mobile.

---

## 2026-06-04 — Performance & Sale Update (v3.14.5)

### Changes Made
- **June Sale** — Updated urgency banner from "April Special / April 30" to "June Special / June 30"
- **Removed heavy animation libraries** — Removed Three.js, postprocessing (~580KB), GSAP (~80KB), and pixel-blast.js WebGL effect (was spawning 11 simultaneous WebGL renderers)
- **CSS dot-grid background** — Replaced all 11 `.pixel-bg` WebGL instances with a single pure CSS `radial-gradient` dot pattern + `@keyframes pixelPulse` animation (zero JS, zero network cost)
- **Rewrote card-nav.js** — Removed GSAP dependency from card navigation; replaced with Web Animations API (`element.animate()`), identical visual behaviour

### Files Modified
- `index.html` — removed Three.js importmap, GSAP script, pixel-blast module script; bumped card-nav version to v3.16
- `css/style.css` — replaced `.pixel-bg` static rule with CSS animated dot-grid + `@keyframes pixelPulse`
- `css/style.min.css` — same change applied
- `js/card-nav.js` — full rewrite, no external dependencies

---

## 2026-03-15 — Marketing Word Documents (v2.5.6)

### Files Created
- `marketing/Qynzoo_LinkedIn_Posts.docx` — 10 LinkedIn posts with schedule, hashtags, posting calendar table, and pro tips (12.9 KB)
- `marketing/Qynzoo_Image_Prompts.docx` — 10 AI image generation prompts matched to each LinkedIn post, with usage guide (11.0 KB)
- `scripts/generate_marketing_docs.js` — Node.js generator script using the `docx` npm package
- `scripts/office/validate.py` — Python validator for .docx structure

### Notes
- Both .docx files validated successfully (22 archive entries each, all required OOX parts present)
- `docx` package installed locally (node_modules)
- Teal/navy brand colour scheme applied throughout

---

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
