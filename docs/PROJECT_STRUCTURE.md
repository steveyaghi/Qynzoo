# Qynzoo.com Project Structure

## Directory Tree

```
Qynzoo.com/
│
├── 📄 index.html                    # Main landing page (hero, projects, FAQ, contact)
├── 📄 process.html                  # How-we-work / process page
├── 📄 faq.html                      # Standalone FAQ page
├── 📄 sitemap.html                  # Human-readable sitemap
├── 📄 privacy-policy.html           # Privacy policy
├── 📄 terms-of-service.html         # Terms of service
├── 📄 coming-soon.html              # Placeholder for social links
├── 📄 blogs.html                    # Blog listing page
├── 📄 blog-*.html                   # 10 blog articles
├── 📄 CLAUDE.md                     # Project instructions for AI assistant
├── 📄 ChangeLog.md                  # Version history (primary)
├── 📄 package.json                  # Node deps (docx generator)
│
├── 📁 case-studies/                 # Client case-study pages
│   ├── fugro.html                   # ML for dike macro-stability variables
│   ├── haskoning.html               # RAG risk-register agent on n8n
│   ├── odido.html                   # Nationwide retail reporting automation
│   └── waterprof.html               # Secure Azure LinkedIn content agent
│
├── 📁 css/                          # Stylesheets
│   ├── style.css                    # Main styles (source)
│   ├── style.min.css                # Minified styles (production)
│   ├── neo.css                      # Neo-brutalist redesign layer + case-study styles
│   ├── blog.css                     # Blog-specific styles
│   └── card-nav.css                 # Navigation component styles
│
├── 📁 js/                           # JavaScript files
│   ├── script.js                    # Main JavaScript (source)
│   ├── script.min.js                # Minified JavaScript (production)
│   ├── card-nav.js                  # Card navigation (Web Animations API, no GSAP)
│   ├── analytics.js                 # GA4 wrapper
│   ├── brandfetch-logos.js          # Partner logo loader
│   ├── logo-drag.js                 # Draggable logo interaction
│   └── pixel-blast.js               # Legacy WebGL effect (no longer loaded)
│
├── 📁 images/                       # Website images
│   ├── logo.png                     # Qynzoo logo
│   ├── mostafa-business.png         # Founder photo
│   ├── n8n-haskoning.png            # Haskoning case study — workflow (backend)
│   ├── n8n-risk-lens-frontend.png   # Haskoning case study — app UI (front end)
│   └── README.md                    # Images documentation
│
├── 📁 logos/                        # Partner/technology logos (SVG)
│
├── 📁 blogs/                        # Blog source content (Markdown)
│
├── 📁 fonts/                        # Self-hosted webfonts
│
├── 📁 marketing/                    # Generated marketing collateral (.docx)
│
├── 📁 scripts/                      # Utility scripts
│   ├── gen_case_studies.js          # Generates all 4 case-study pages from one template
│   ├── generate_marketing_docs.js   # Builds the marketing .docx files
│   └── office/                      # Office-document helpers
│
└── 📁 docs/                         # Project documentation
    ├── Design_principles_Qynzoo.md  # Design system
    ├── PROJECT_STRUCTURE.md         # This file
    ├── ChangeLog.md                 # Older/archived change history
    ├── DEPLOYMENT_GUIDE.md          # Deployment instructions
    ├── SSH_DEPLOYMENT_GUIDE.md      # SSH deployment guide
    ├── SEO_IMPLEMENTATION_GUIDE.md  # SEO notes
    ├── PERFORMANCE_IMPROVEMENTS.md  # Optimization notes
    └── compliance/                  # GDPR / compliance material
```

## Generated Files — Do Not Hand-Edit

Some HTML is produced by a script. Editing the output directly means your change
is silently overwritten the next time the generator runs.

| Output | Generator | How to change it |
|---|---|---|
| `case-studies/*.html` (all 4) | `scripts/gen_case_studies.js` | Edit the `pages` array in the generator, then run `node scripts/gen_case_studies.js` |
| `marketing/*.docx` | `scripts/generate_marketing_docs.js` | Edit the generator, then re-run it |

The case-study generator exists so the `<head>`, CSP, schema.org block, nav, and
footer stay byte-identical across all four pages. Adding a fifth case study means
adding one object to the `pages` array — not copying an HTML file.

## File Categories

### 🌐 Website Pages (root)
- `index.html` — landing page
- `process.html`, `faq.html`, `sitemap.html` — supporting pages
- `blog*.html` — blog listing and 10 articles
- `privacy-policy.html`, `terms-of-service.html` — legal

### 📊 Case Studies (`case-studies/`)
One page per client project, each following the same section order:
**Problem → Approach (+ tool chips, optional figures) → Results → CTA.**
All four are linked from the projects grid in `index.html`.

### 🎨 Styles (`css/`)
- **Source**: `style.css`, `neo.css`, `blog.css`, `card-nav.css`
- **Production**: `style.min.css`

`neo.css` carries the neo-brutalist redesign, including all `.case-*` classes.
Case-study figure classes:

| Class | Purpose |
|---|---|
| `.case-figure` | Framed screenshot + caption |
| `.case-figure-stack` | Vertical stack of figures (full width each) |
| `.case-figure.is-wide` | Wide diagrams — capped at 1100px |
| `.case-figure.is-portrait` | Portrait screenshots — capped at 520px |

Figures stack rather than sitting side by side: a detail-dense workflow diagram
squeezed into a half-width column becomes unreadable.

### ⚡ Scripts (`js/`)
- **Source**: `script.js`, `card-nav.js`, `analytics.js`
- **Production**: `script.min.js`
- `pixel-blast.js` remains on disk but is no longer loaded — the WebGL background
  was replaced with a pure-CSS dot grid in v3.14.5.

### 🖼️ Media
- **images/** — website imagery and case-study screenshots
- **logos/** — partner and technology logos (SVG)
- **fonts/** — self-hosted webfonts

## Cache Busting

Stylesheets are referenced with a version query (e.g. `neo.css?v=6.3`). **Bump it
whenever you change the CSS**, or returning visitors keep the stale file. The
version lives in two places for case studies: the `VER` constant in
`scripts/gen_case_studies.js`, and the `<link>` tags of every other HTML file.

The footer version stamp (`V4.1.0`) should match across all pages.

## Git Ignored Items

- `.claude/` — AI assistant cache
- `.playwright-mcp/` — browser automation
- `backups/` — backup files
- `node_modules/` — dependencies
- `.env` files — environment variables

## Key Points

1. **Generated files**: check the table above before editing any HTML
2. **Source vs production**: edit `.css`/`.js`, then update the `.min` versions
3. **Bump the cache-buster** on every CSS change
4. **Documentation**: guides and notes live in `docs/`
5. **Organized assets**: media separated by type (`images/` vs `logos/`)

---

Last Updated: August 27, 2026
