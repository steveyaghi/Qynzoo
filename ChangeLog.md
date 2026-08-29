# Qynzoo.com ChangeLog

## 2026-08-29 — Bubbles No Longer Clipped; Wider Scatter (v6.26)

### Summary
Bubbles were still being cut off on the left side. Root cause:
`.neo-bubble-field` had `overflow: hidden` as a safety net from earlier
overflow debugging, and several bubbles' `left` percentages positioned
them close enough to the field's edge that their circle extended past it
and got sliced.

### User's explicit constraint (this shaped the fix)
"even if the borders of the bubbles flow over the max width, they should
not be clipped. The center point of the bubbles should not pass over the
max width on the right side." — i.e. edges are allowed to spill past the
field's boundary; only each bubble's CENTER must stay inside it.

### Changes Made (`css/neo.css`)
- Removed `overflow: hidden` from `.neo-bubble-field` entirely — nothing
  clips a bubble's edge now.
- Rewrote all 6 bubble positions using `left: calc(X% - halfWidth)` so X%
  places the bubble's CENTER at that point (not its top-left corner, which
  is what plain `left: X%` does — the previous scatter was accidentally
  checking/placing corners, not centers).
- Increased spacing between bubbles so no two circles touch even at their
  largest (150px) size. Verified via a distance-between-centers check in
  Node at three field widths (220px floor, 300px typical, 380px wide) — no
  overlaps at the two realistic sizes; a 2px near-miss only at the
  extreme floor width, which the field only reaches right at the very
  edge of the 1300px breakpoint.
- Verified live: forced the field visible via injected inline styles,
  confirmed via `getBoundingClientRect()` that every bubble's center
  stays within the field's left/right bounds, and confirmed
  `getComputedStyle().overflow === "visible"`.

---

## 2026-08-29 — Bubble Hover Shrink-Back Fixed; Load-In Breathe Effect Added (v6.25)

### Bug: bubbles grew on hover but never visibly shrank back
Root cause: the drift loop set a random 4.5–8.5s duration directly via
`bubble.style.transition`. The hover CSS rule's own `transition: ...0.2s`
only applied while `:hover` actively matched — the instant the mouse left,
the cascade fell back to the inline value, which was still whatever slow
duration the drift had last set. So the shrink-back genuinely happened, just
over several seconds instead of instantly — easy to read as "doesn't shrink
back at all."

Fix required two parts, not one:
1. Route the duration through a CSS custom property
   (`--neo-bubble-drift-active`) that both the base rule and the `:hover`
   rule read via `var()`, instead of JS writing a literal `transition`
   value the hover rule had no way to override on the way back out.
2. That alone still wasn't enough — `:hover`'s `!important` override on the
   property only lasts while hovering, so the fallback on mouseout was
   still whatever slow value JS had last written. Added explicit
   `mouseleave`/`blur` listeners (`js/script.js`, `js/script.min.js`) that
   reset the property to a fast `0.2s` right as hover ends; the next
   scheduled drift call restores normal speed afterward.

Verified with a direct cascade simulation (custom property set to a slow
drift value → CSS class mimicking `:hover`'s override → explicit
mouseleave-style reset), confirming the full sequence — slow while
drifting, fast while hovering, fast again immediately after — behaves as
intended.

### New: breathing pulse on page load
Each bubble now plays a one-time grow-and-settle pulse
(`.neo-bubble-breathe` / `@keyframes neo-bubble-breathe-in`, `css/neo.css`)
before the randomized drift takes over, staggered ~90ms apart per bubble so
they don't all pulse in perfect unison. `js/script.js` /
`js/script.min.js` add the class on load and remove it once the pulse
finishes (1.1s), only then starting the drift loop — so the pulse never
gets cut off by a drift transform starting mid-animation. Respects
`prefers-reduced-motion` the same way the drift does.

---

## 2026-08-29 — Bubble Scatter Restored (v6.23)

### Summary
The flexbox rewrite (previous entry) fixed the width/overlap problem but
left the bubbles' actual scatter positions untouched — those were still
the `right: 0–28%` values from an earlier absolute-positioned attempt,
which only used the rightmost quarter of the now-wider flex field. Read as
"clustered in one corner" instead of "scattered", per user feedback.

### Changes Made
`css/neo.css` — repositioned all 6 bubbles using `left: X%` spread across
5–62% of the field's width (was `right: 0–28%`, all bunched at one edge),
keeping the existing 4–80% vertical spread. Verified via
`getBoundingClientRect()` at both the field's minimum width (220px) and a
realistic wider width (380px) — no bubble overflows the field at the wider
size; at the narrow floor two bubbles extend a few px past the field edge,
caught cleanly by the field's existing `overflow: hidden` (cosmetic
edge-case only, not a layout bug — no overlap, no viewport spillage).

---

## 2026-08-29 — Hero Bubbles Rebuilt on Flexbox; Back-to-Top Button Removed (v6.22)

### Summary
Two requests: (1) on very wide screens the hero text was pinning far left
and the bubbles were drifting far right, both with large empty margins
outside them — width limits weren't actually shared between the two; (2) a
"go up" button was overlapping the sticky "Book Free Call" CTA on mobile.

### Bubble/text width fix — several false starts, documented for future reference
The bubble field and the hero text were positioned against two different
reference frames (the bubble field anchored to the full-bleed `.hero`
section, the text inside the width-capped `.container`), which is why they
drifted apart independently on wide screens. Fixing this took multiple
attempts, each one exposing the next problem:
1. Moved `.neo-bubble-field` inside `.container` so both shared one box —
   fixed the "drifting apart" symptom, but `right: X%` bubble positions
   (percentages of the whole container) started landing UNDER the text at
   1100–1500px widths, confirmed directly via `getBoundingClientRect()`.
2. Tried anchoring bubbles to a bounded strip after the text
   (`left: 820px` fixed values, then `right: X%` of a computed strip width)
   — both either got clipped by the viewport at the 1100px breakpoint or
   collapsed to 0-width and stacked every bubble on the same point, because
   the arithmetic assumed a container width that didn't hold at every size
   tested.
3. **Root fix**: rebuilt `.container` as `display: flex` for the hero, with
   the text (`flex: 0 1 760px`) and bubble field (`flex: 1 1 auto`) as flex
   siblings. Flexbox computes the split itself — the two literally cannot
   occupy the same space, removing the need for any of the fragile pixel
   math above. Breakpoint raised 1100px → 1300px, since below that
   .container hasn't reached its 1200px cap and there often isn't a
   meaningful gap left over once text claims up to 760px.
4. That surfaced two more bugs the flex conversion exposed: the bubble
   field was DOM-first (for the old z-index-stacking approach), which in a
   flex row rendered it on the LEFT of the text — reordered the markup so
   text comes first. And a leftover dead media-query rule from the old
   two-column photo hero (`.neo-hero-grid`/`.neo-hero-photo-wrap`, both
   removed from the HTML when the photo moved to the About section weeks
   ago) still contained `.neo-hero-text { order: 2; }`, which silently
   flex-reordered the text again below 900px. Removed that dead block.

All four confirmed via direct `getBoundingClientRect()` overlap checks
(not screenshots — this sandbox's Browser pane reports `window.innerWidth`
values that don't match what `.container` actually renders at, which is
what made the pixel-math approaches so hard to verify reliably in the
first place; flexbox's guarantee doesn't depend on knowing the exact width).

### Back-to-top button removed
Found two separate sources, both removed entirely, per user request (no
replacement):
- `js/script.js` / `js/script.min.js` — `createBackToTop()` unconditionally
  injected a fixed `bottom:30px; right:30px` circular button into every
  page that loaded either script. This is almost certainly what the user
  saw colliding with the sticky CTA on mobile.
- Hardcoded `<button class="back-to-top" id="backToTop">` markup in 6 blog
  pages (`blog-ai-agent-practices.html`, `blog-ai-customer-service.html`,
  `blog-ai-tools-2026.html`, `blog-make-vs-n8n.html`,
  `blog-prompt-engineering.html`, `blog-workflow-automation.html`) — dead
  markup with no matching CSS or click handler found anywhere, removed too.

---

## 2026-08-29 — Dot Background Removed, Bubble Colors Reverted to Core Palette (v6.15)

### Summary
Two follow-up requests: remove the dot-grid background entirely (rather
than making it more visible, as the previous pass had done), and revert the
bubble colors back to the site's 3 core accents — the 6-tint palette from
the previous change wasn't wanted.

### Changes Made
- **`.pixel-bg` set to `display: none`** in `css/style.css` and
  `css/style.min.css`. Markup (`<div class="pixel-bg">`) left in place
  across all 22 pages that use it rather than stripping it from every
  file — same visual effect, far smaller diff, and trivially reversible.
- **Bubble colors reverted** (`css/neo.css`) to the 3 core site accents
  (teal / yellow / coral) rotated across the 6 bubbles, undoing the
  6-distinct-tint palette added last turn. Removed the now-unused
  `--neo-accent-tint` / `-2-tint` / `-3-tint` variables and updated the
  stale comment above the bubble color block.
- Randomized JS-driven float movement (added last turn) is untouched —
  only color and background were in scope for this pass.

### Notes
Local backups from the previous change
(`backups/*.bak-20260829-112935-before-randomized-bubbles`) still cover
reverting all the way back to the pre-dot-pattern, pre-randomized-bubble
state if ever needed; no new backup was made for this smaller, already-
covered change.

---

## 2026-08-29 — Randomized Bubble Movement, 6 Distinct Colors (v6.14)

### Backup made before this change
Per user request, before touching anything: copied the pre-change
`css/neo.css`, `css/style.css`, `css/style.min.css` into `backups/` with a
`before-randomized-bubbles` suffix and timestamp. These are the files as
they stood at v6.13 — restore any of them to revert this change:
- `backups/neo.css.bak-20260829-112935-before-randomized-bubbles`
- `backups/style.css.bak-20260829-112935-before-randomized-bubbles`
- `backups/style.min.css.bak-20260829-112935-before-randomized-bubbles`
(`backups/` is gitignored — these live locally only, not in the repo history.)

### Summary
User found the bubble float "too static" (a fixed CSS `@keyframes` loop
always retraces the same path, so it reads as mechanical once you watch it
for more than one cycle) and said all the bubbles looked like the same
color (only 3 accent colors were being reused across 6 bubbles).

### Changes Made
- **Movement rebuilt in JS** (`js/script.js`, `js/script.min.js`,
  `initFloatingBubbles`) — replaced the fixed `@keyframes` with genuine
  per-bubble randomization: each bubble picks a random x/y offset, rotation,
  and transition duration, drifts there via CSS `transition: transform`,
  then on `transitionend` rolls a brand new random target. No two bubbles
  ever move in sync and the path never repeats. Still respects
  `prefers-reduced-motion` (checked once on load; if set, the drift loop
  never starts at all).
- **6 genuinely distinct colors** (`css/neo.css`) — added
  `--neo-accent-tint`, `--neo-accent-2-tint`, `--neo-accent-3-tint` (lighter
  tints of the 3 base accents) so each of the 6 bubbles gets its own unique
  color instead of the 3 base accents being reused twice each.

### Notes
- Verified the randomization directly (called the same random-offset logic
  3 times in the console, confirmed 3 different results) rather than by
  screenshot — motion doesn't screenshot, and this sandbox's browser has
  `prefers-reduced-motion: reduce` set, which correctly makes the drift
  loop a no-op here (by design). Confirmed via `getComputedStyle` that the
  guard fired as intended (`inlineTransform: ""`), and confirmed no console
  errors on pages with the bubbles (index.html) and without them
  (case-studies/*, blog-*.html — the `if (!bubbles.length) return;` guard
  handles those cleanly).

---

## 2026-08-29 — More Noticeable Bubble Float, Visible Dot Background (v6.13)

### Summary
Two visibility complaints: the bubble float animation was too subtle to
notice, and the background dot pattern ("bots background" — the `.pixel-bg`
dot grid) was nearly invisible against the dark navy.

### Changes Made
- `css/neo.css` — bubbles now use 3 distinct drift patterns
  (`neo-bubble-float-a/b/c`), each combining vertical bob + horizontal sway +
  a few degrees of rotation, at staggered durations (7–10s) so the cluster
  reads as genuinely floating instead of one shared up/down nudge. Amplitude
  roughly doubled from the first pass (14px bob → up to 26px combined drift).
  Hover now pauses the float (`animation-play-state: paused`) instead of
  fighting it for control of `transform`.
- `css/style.css` and `css/style.min.css` — `.pixel-bg` dot alpha raised
  0.18 → 0.4, dot radius 1px → 1.8px, base opacity 0.45 → 0.7 (peak 0.65 →
  0.95). The pattern is now a clearly visible dot grid instead of background
  noise, across all 22 pages that use it.

### Notes
- Verified the bubble animation mechanics directly (inline override,
  checked `getComputedStyle().transform` mid-cycle) rather than by
  screenshot — this sandbox's browser has `prefers-reduced-motion: reduce`
  set at the OS level, which correctly suppresses the float per the
  guard added when the bubbles were first built. That guard is intentional
  and stays; a real visitor without that OS setting will see the motion.

---

## 2026-08-29 — Bubble Layout Fix: Left-Align Text, Un-Clip Bubbles (v6.12)

### Summary
User reported (with an annotated screenshot) that on a wide screen the
bubbles crowded too far right and the hero text still read as centered
instead of left-aligned. Both were real: `.container` caps at 1200px and
centers itself, so past that width the text sat floating in the middle of
the viewport with dead space on its left, while the "AI Social Media
Strategist" bubble was clipped by the navbar and "Website Building" was
clipped by the section's bottom edge.

### Changes Made
- `css/neo.css` — past 1500px, shift `.neo-hero-centered > .container`
  left instead of letting it center, so hero text runs close to the left
  edge with the bubbles clearly confined to the right, rather than both
  reading as centered in the middle of a wide screen
- Retimed all 6 bubble `top`/`right` positions to a tighter vertical range
  so none sit close enough to the section's top/bottom edge for the float
  animation (±14px) to clip them under `.hero`'s `overflow:hidden`

### Verification
Checked at 1500px (post-fix: 0 bubbles clipped, confirmed via
`getBoundingClientRect()` against the hero's own bounds), 1200px (below the
new breakpoint — container's natural 1200px max-width already reaches both
edges, no shift needed), and 375px mobile (bubbles correctly hidden, no
horizontal overflow).

---

## 2026-08-29 — Floating Skill Bubbles in Hero (v6.10)

### Summary
Filled the empty space in the hero (right of the headline, on wide screens)
with 6 floating bubbles, one per thing Qynzoo builds — using the existing
teal/yellow/coral accent rotation. Each links to the Projects section.

### Changes Made
- `index.html` — added `.neo-bubble-field` with 6 `.neo-bubble` links inside
  the hero section: Machine Learning Models, RAG Applications, Business
  Automation, Cloud Automation, AI Social Media Strategist, Website Building
- `css/neo.css` — new bubble styling: absolutely positioned against `.hero`
  (already `position:relative; overflow:hidden`, so bubbles clip cleanly at
  the section edge), independent slow float animation per bubble
  (`@keyframes neo-bubble-float`, staggered delays), hover lift, and
  `prefers-reduced-motion` support

### Design Decisions
- **Hidden below 1100px** (`display:none` by default, `display:block` in a
  `min-width:1100px` media query). At the pane's own ~800–970px width the
  hero text (`max-width:760px`) already fills nearly the entire container —
  there's no free space to place bubbles without overlapping the paragraph
  text. They only appear once the viewport is wide enough to have real
  empty space beside the copy.
- First pass had two bubbles bleeding past the hero's right edge at 1400px
  (`right: -2%` / `-3%`) — invisible to the user since `.hero`'s
  `overflow:hidden` clipped them, but wasteful (half a bubble cropped away).
  Tightened all six `right` offsets so the full bubble stays visible instead
  of being cropped.

### Not done — deferred by user
User asked for recommendations on adding a photo or video to the site (none
currently used beyond the About section headshot). Recommended, in priority
order: (1) a short screen-recording demo of a real project in motion — e.g.
the Haskoning n8n workflow running, or the podcast dashboard being used —
for a case-study page; (2) a 30–60s talking-head clip for the About section,
saying the "AI won't replace humans" belief statement in the founder's own
voice; explicitly advised against generic stock photography, since it
undercuts the site's actual differentiator (named specifics, real client
logos, real numbers). User said to leave this for later — no filming or
asset work done in this pass.

---

## 2026-08-29 — 5th Case Study: Podcast Tuhaf Dashboard (V4.1.4)

### Summary
Added a 5th project case study — an AI-connected social media growth
dashboard built for Podcast Tuhaf (personal side project) — following the
exact same structure as the other four.

### Files Created
- `case-studies/podcast-tuhaf-dashboard.html` — generated via
  `scripts/gen_case_studies.js` (added as a 5th entry in the `pages` array)
- `images/podcast-dashboard-overview.png`, `podcast-dashboard-growth.png`,
  `podcast-dashboard-insights.png` — URL-safe copies of the three dashboard
  screenshots the user provided (originals kept, had spaces in filenames)

### Changes Made
- New project card added to `index.html`'s projects grid, positioned after
  Waterprof and before the plain "website build" cards (This Website, Podcast
  Tuhaf's site, An Cultuurhuis) — it's a substantive case study, not just a
  website link
- User's draft copy corrected and restyled to match the tone of the other
  four case studies: concise, concrete, numbers stated plainly. One factual
  correction from the user mid-draft: the growth goal is YouTube, Shorts, and
  Reels across platforms, not just YouTube
- Footer version bumped to V4.1.4 sitewide, including the case-study
  generator template (was still stuck at V4.1.0 last time — now checked)

### Notes
- This is a personal side project, not a paying client engagement like the
  other four — tagged as "Client: Podcast Tuhaf (Personal Project)" in the
  meta pills to keep that distinction honest rather than implying it was
  billed work
- Not added to `sitemap.html` — none of the other 4 case studies are listed
  there either, so this stays consistent with the existing (pre-existing)
  gap rather than fixing it unilaterally for just one page

---

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
