
# Qynzoo.com ChangeLog

## 2026-09-23 — Problem-First Animated Hero, Testimonials Row, Wide-Screen Fixes (v4.2.2)

### Hero rebuilt from the Homepage v2/v3 design files
- Headline changed to "Do it once. Never again." with a smaller
  "Automate your work — with or without AI." tagline under it. The old
  subtext paragraph and benefit checklist were removed as repetitive
  (the same points appear in "What I Do" right below).
- The static skills grid was replaced by a "Which one sounds like you?"
  picker: six problem pills in the visitor's own words, one open at a
  time, each showing what gets built, what the client gets, the tech
  "under the hood", and a "This is my problem →" link to #contact.
- Centered layout with the v3 entrance animation: teal and coral pills
  start overlapping in the center, part to the edges, then the content
  fades up. Site colors kept (the design file's palette switcher was
  skipped). On mobile the pills are small circles framing the headline.
- Bugs fixed along the way: the reduced-motion fallback showed the
  animation's start state (pills over the accordion) instead of its end
  state; `overflow: hidden` let clicks scroll the hero sideways (now
  `overflow: clip`); hidden accordion text made closed pills fill a
  whole row.

### Testimonials
- Added Natalia Trushina (Risk Manager, Haskoning), translated from
  Dutch, with her photo (`images/testimonials/Natalia.jpeg`).
- Cards moved from a grid (which stacked every card after the first) to
  a horizontally scrollable row; they stretch to fill the width when
  there are only a few.

### Wide screens (checked at 1920px and 2560px)
- Hero and top nav were capped at 1300px / 1200px, leaving the hero
  pills cut off mid-screen and the nav as a floating strip. Both now
  span the full width. The nav fix also applies to the blog pages.
- Footer version bumped to V4.2.2 (it was still showing V4.1.7).

## 2026-09-19 — CV Link in Nav (v4.2.1)
- Added `documents/Mostafa-Yaghi-CV.pdf` and a "CV / Resume" link in the
  nav's Resources card, opening in a new tab. `card-nav.js` gained
  `target` support for nav links.

## 2026-09-16 — Blog Redesign (v4.2.0)
- Blog index and all 10 posts moved to the dark design from the Claude
  Design files: filter pills, featured card, color-rotated tags, gold
  newsletter band; icon-badge headings, pull-quotes, numbered cards,
  step rows, callouts, gold CTA box, and the author photo on a yellow
  ring. Components the design didn't cover (tool cards, trend blocks,
  code blocks, prompt examples, tables) restyled to match.

## 2026-09-12 — Flagship Diagram, FAQ Fix, Mobile Sweep, Draggable Marquee (v4.1.7, same version)

### Flagship "how it works" visual — rebuilt twice
First pass: a circular loop diagram (Azure → AI → Human → back to Azure)
with curved dashed arrows computed from a true circumcircle through the
three icon centers. User found the curve rendering messy and asked for a
structurally different approach rather than another arrow-geometry fix.
Rebuilt as three horizontal steps (icon + sentence below each, plain
arrows between) — the "hard to get visually wrong" option. Later request
changed it again: removed the per-icon sentences, switched the connector
to right-angle/square-cornered paths (mathematically computed corners and
arrowheads, not hand-drawn), and recolored both icons and arrows to match
the dark navy (`#0d1030`) of the section immediately after. Final request
reverted to the horizontal-steps layout with per-icon sentences restored,
since the connector-line approach kept needing rework — settled on the
simplest version: three icons in a row, arrows between, sentence under
each, no loop geometry to get wrong. Pulled a real Azure logo from a
public icon CDN (`logos/azure-icon.svg`) since no local one existed.

### FAQ accordion — actually fixed
Traced the non-responsive FAQ questions (flagged in an earlier session,
confirmed pre-existing) to inline `onclick`/`<script>` handlers that
never fired on a real click despite reading correctly — moved the toggle
logic into the external `script.js`/`script.min.js` (unambiguously
allowed by the site's CSP). First deploy of the fix still didn't work in
testing — turned out `index.html` was still requesting the OLD cached
`script.min.js?v=4.7`, never bumped when the fix was made. Bumped to
`v4.8` and confirmed via a real simulated mouse click that only the
clicked question expands, others stay closed.

### Mobile sweep — several real layout bugs found and fixed
User asked for a full mobile pass. Found via systematic scroll-through
plus automated contrast/overflow scans:
- Waterprof's full-width project card overlapped the card below it —
  content exceeded its fixed-height grid row. Fixed by letting project
  grid rows grow to fit content (`minmax(…, auto)`) instead of clipping.
- Testimonial card's quote text was squeezed into a ~179px column next
  to the photo instead of stacking — added a mobile override to stack
  and center it.
- FAQ section and the footer both had zero horizontal padding on mobile
  — both use older `.neo-section`/`.footer` markup that predates the
  redesign's CSS, which only added mobile padding to the newer
  `.qz-section` class. Added matching padding for both.
- The sticky "Book Free Call" button overlapped and obscured the
  footer's "Terms of Service" link at the very bottom of the page —
  added logic to hide the sticky CTA once the user nears the page
  bottom, where the footer's own CTAs are already visible.
- Hero badge pill was rendering partly underneath the sticky nav bar
  instead of clearing it — increased top padding.

### Logo marquee — layout, speed, and drag
User reported empty dead space after the last logo — the track was
left-aligned inside its wrapper rather than centered, so at rest (or
under `prefers-reduced-motion`) it hugged the left edge. Centered the
wrap so the belt always spans evenly regardless of animation state.
Slowed the scroll from 22s to 50s per loop (previously felt too fast).
Investigated a reported "it stops" complaint at length — confirmed via
direct transform sampling over a forced-motion test that the CSS loop
itself is seamless (translateX climbs steadily and wraps with no jump);
concluded the appearance of stopping was the visitor's own OS-level
"reduce motion" setting, which the site correctly and intentionally
respects — user confirmed to keep that accessibility guard rather than
override it.

Added drag/swipe-to-scroll: dragging (mouse) or swiping (touch,
`touch-action: pan-y` so vertical page scroll still works) pauses the
CSS animation and drives the belt directly off pointer movement, wrapped
within one group-width so a long drag never runs past the available
logos. On release, converts the drag's final offset into a matching
negative `animation-delay` so the CSS loop resumes from the exact same
pixel position — verified via simulated PointerEvents that the computed
transform before and after release are identical (no jump).

### Verified
Contrast and broken-image scans clean on both breakpoints throughout
(one recurring false-positive noted and ruled out: `img.complete` /
`naturalWidth` unreliably report `false`/`0` for lazy-loaded images in
this automated browser pane even when the image is visibly rendering
correctly on screen — confirmed by screenshot each time, not fixed in
code since there's nothing broken). Desktop re-checked after each mobile
fix to confirm no regressions.

## 2026-09-12 — Client Logos: Marquee + Project Cards (v4.1.7, same version)

User supplied real client logo files for the 5 case-study companies
(Fugro, Haskoning, ODIDO, Waterprof, Podcast Tuhaf) and asked for them in
the "Worked with" marquee, plus a small logo on each project pill so
visitors recognize the brand at a glance.

### Files
Copied each supplied logo to a URL-safe kebab-case filename in `logos/`
(existing site convention — spaced/mixed-case originals kept, only the
safe copy referenced in HTML): `fugro-logo.svg`, `haskoning-logo.png`,
`odido-logo.png`, `waterprof-logo.png`, `tuhaf-logo.png`.

**tuhaf-logo.png was cropped.** The original was a 1080×1080 canvas with
the actual mark (Arabic wordmark + geometric star) sitting in a narrow
horizontal band — fine full-size, but once fit into a small fixed-height
marquee/chip box next to four normally-proportioned logos it rendered
almost invisibly small. Trimmed the transparent margins in-browser
(canvas alpha-channel bounding-box scan + 20px pad) rather than fighting
it with a one-off CSS transform, so it now sits at the same visual scale
as the other four everywhere it's used.

### Marquee ("Worked with")
Replaced the placeholder `<span>FUGRO</span>` text row with the 5 actual
logo images, desaturated/inverted-white and dimmed (`grayscale(100%)
brightness(0) invert(1) opacity(0.55)`) to match the ghosted look used on
reference sites like Xomnia, brightening to full color on hover.

First pass sized each logo only by a fixed height with the width left to
its own aspect ratio — the user pointed out this made every logo a
different width, some barely readable. Fixed by giving every marquee logo
a fixed width AND height box (`110×36px`) with `object-fit: contain`, so
all five now read at the same visual size regardless of native
proportions.

### Project cards
Initial version put each logo in a small white circular chip in the top
corner of the card, full color. User asked instead for the marquee's
ghosted-filter treatment, applied directly on the pill's own color
background — no separate chip. Changed to a transparent `56×32px` slot,
logo at `grayscale(100%) brightness(0) opacity(0.45)` (black rather than
white, since these cards sit on bright teal/gold/coral, not dark navy),
brightening to `opacity(0.85)` on card hover — consistent with the tag
label directly above it, which already uses the same dark-on-light
`rgba(13,16,48,…)` treatment. Applied to the 5 real case-study cards only
(Fugro, Haskoning, ODIDO, Waterprof, Podcast Tuhaf) — the 3 non-client
website links (Qynzoo, Podcast Tuhaf's own site, An Cultuurhuis) have no
client logo and were left unchanged.

### Verified
Full contrast scan and broken-image scan (same in-browser method as the
consistency pass above) clean after both rounds. Checked marquee hover
color-reveal and project-card hover both still work. Checked at 375px
mobile width — marquee and card logos both read correctly, no overflow.

## 2026-09-12 — Homepage Design Consistency Pass (v4.1.7, same version)

Follow-up to the same-day redesign below: the user flagged real
inconsistencies between the new dark bento system and leftover pieces of
the old neo-brutalist design still showing through in About, Contact, and
FAQ. Went through the whole homepage systematically rather than patching
spot-reports.

### Method
Wrote a small in-browser script (`javascript_tool`) that walks every leaf
element under `body.qz-redesign`, computes text-vs-background luminance,
and flags anything under a contrast threshold — plus a second pass that
flags any element still carrying the old system's signature hard drop
shadow (`rgb(0,0,0) Npx Npx 0px 0px`) or 2-3px solid white border. Re-ran
both after every fix until both came back empty. This caught things that
would have been easy to miss eyeballing section by section.

### Bugs found and fixed
- **Gold-on-teal eyebrow labels**: `.neo-eyebrow` (About, FAQ) is a solid
  teal pill with dark text in the old design; the redesign had only
  overridden the text color to gold, producing low-contrast gold-on-teal.
  Added a page-wide `.qz-redesign .neo-eyebrow` reset (no background,
  border, shadow, or padding) so every eyebrow across the page — new
  sections and the three still using old markup — renders identically:
  flat, mono, colored text only.
- **Dark-on-dark form labels and buttons**: the contact form's floating
  labels and the "Book a Free 30-Min Call" button were unreadable — both
  had a `color: var(--dark-bg) !important` (or equivalent dark background)
  baked into neo.css that only becomes a contrast bug on the new dark
  background. Fixed with matching-specificity overrides.
- **Boxed form wrapper**: `.contact-form-wrapper`'s old bordered/shadowed
  card was still wrapping the new underline-input form, clashing with the
  coral background. Stripped to transparent/no border/no shadow.
- **Section numbering gap**: About sits between Projects (03) and
  Testimonials, but had no number — renumbered the whole sequence in true
  DOM order (What I Do 02 → Projects 03 → About 04 → Testimonials 05 →
  How It Works 06 → Contact 07 → FAQ 08).
- **Remaining brutalist shapes**: nav dropdown cards and the nav's own
  "Book Free Call" button, the sticky mobile CTA, the footer newsletter
  button, the About photo's circular icon badges and "Available for
  projects" pill, and the Contact section's icon circles were all still
  carrying the old 2-3px white border + hard offset shadow. All flattened
  to match the new borderless, shadowless, fully-rounded pill language
  (kept their existing colors — this was a shape fix, not a recolor).

### About section, restructured (not just recolored)
- Eyebrow + heading ("04. ABOUT" / "Hi, I'm Mostafa.") pulled out of the
  two-column grid into a full-width header above it, so it left-aligns
  flush with every other section's heading instead of sitting indented in
  the text column on the right.
- Photo and text columns swapped (text now leads on the left, photo on
  the right) and the column ratio flipped from 0.8fr/1.2fr to 1.15fr/1fr
  (text-wide) — matching the Hero and Flagship sections' established
  text-left/visual-right, text-wide/visual-narrow pattern. Scoped the
  ratio override to `min-width: 901px` only, after first shipping it
  unscoped and finding it broke the existing mobile stacking behavior
  (photo rendered mid-paragraph instead of below the text) — caught and
  fixed before commit.
- Photo, badges, and all body copy are unchanged — only their shape/
  position/typography were touched, per explicit instruction to keep the
  content as-is.

### Investigated, found pre-existing, left alone
While testing the FAQ accordion after restyling `.neo-faq-item`, found
that clicking a question does not expand its answer — traced this with
getBoundingClientRect/getComputedStyle/direct event dispatch to the
inline `onclick="this.parentElement.classList.toggle('open')"` handler
itself never firing on a real click (a programmatic `.onclick.call()`
works; `.click()` and a real mouse click do not). Confirmed by testing
the untouched pre-redesign backup — same failure there — so this is a
**pre-existing bug, not something this pass introduced**, most likely
related to how the CSP is delivered via a `<meta>` tag (browsers handle
meta-tag CSP enforcement of inline event-handler attributes less
consistently than a real HTTP header). Left as-is since it's outside this
task's scope; flagged to the user for a separate fix.

### Verified
Full contrast scan and full shape scan (described above) both return zero
findings after fixes. Re-checked About at desktop and 375px mobile widths
— text stacks cleanly above the photo on mobile with no overlap. Nav
hamburger dropdown, FAQ card shapes, and footer all re-checked visually.

## 2026-09-12 — Homepage Redesign: Dark Bento System (v4.1.7)

Rebuilt the homepage's visual design around the aesthetic on Mostafa's
business card — dark navy ground (`#0d1030`), JetBrains Mono display type
paired with Inter body text, and chunky fully-rounded pill/card blocks
rotating through the site's existing teal/gold/coral accents. Structural
patterns (numbered section eyebrows, sticky-label-style section headers,
a full-bleed "flagship offer" callout band, a scrolling client-logo
marquee, underline-only contact inputs) are adapted from an analysis of
xomnia.com done earlier in the same session. The user built a mockup in
an external design tool and asked for it to be reconciled with the site's
real content and connectivity.

### Scope
Homepage (`index.html`) only, by deliberate choice — case studies, blog
posts, FAQ, process, and legal pages keep today's lighter neo-brutalist
design for now and are unaffected (confirmed: `qz-redesign` styling is
scoped to `body.qz-redesign`, which only index.html carries). All existing
inner-page links continue to resolve; nothing in the shared nav/footer
component was restructured, only re-themed for the homepage.

### What changed
- New `css/qz-redesign.css`, loaded only by index.html.
- Hero: headline replaced with the new motto, "Automate your work — with
  or without AI" (previously the belief-statement subtitle; the old H1 and
  the floating skill bubbles are retired in favor of a bento skills grid).
  The floating-bubble and typewriter JS in script.js were left as-is —
  their target selectors no longer match anything in the new hero markup,
  so they no-op harmlessly rather than needing to be ripped out.
- What I Do: same 3-item copy, restyled as numbered full-width rows.
- New client-logo marquee (Fugro/Haskoning/ODIDO/Waterprof/Podcast Tuhaf).
- Projects: same 8 real project cards/links (5 case studies + 3 external
  sites), restyled into the new pill-card grid — no placeholder copy
  shipped anywhere.
- New flagship-offer callout: "Automation that respects enterprise data
  rules," backed by and linking to the real Waterprof case study (Azure,
  human-in-the-loop) rather than an invented claim — deliberately chosen
  over a more speculative "strategic AI agent" pitch, since nothing on the
  site yet backs that claim.
- About: markup and copy left completely untouched per explicit
  instruction, only re-skinned via CSS to sit on the dark background.
- Testimonials: same real Werner Halter quote/photo/LinkedIn link,
  restyled into the new card treatment.
- How It Works: same real 3-step copy (not padded to 4 to match the
  mockup), restyled.
- Contact: same functional form (honeypot, field IDs, web3forms handler
  all untouched) restyled to underline-only inputs. Caught and fixed two
  contrast bugs from unstyled neo.css leftovers: the form wrapper's old
  boxed-card chrome was still applying against the new coral background,
  and both the floating field labels and the "Book a Free 30-Min Call"
  button were rendering dark-on-dark (a `color: var(--dark-bg) !important`
  in neo.css was overriding the new light text color) — both fixed with
  explicit overrides in qz-redesign.css.
- Footer: fully preserved (Quick Links, More/Blog/FAQ/Process, Newsletter,
  legal links), re-skinned only.
- Version bumped V4.1.4 → V4.1.7 in the footer (per project's "always add
  a decimal on deploy" rule).

### Verified
Full-site backup taken first (`backups/full-site-20260912-162333`,
gitignored, local only) before any edits. Checked in-browser at desktop
and 375px mobile widths; hero, projects grid, and contact form all reflow
correctly. Confirmed the hamburger nav menu still opens/closes and its
links are unaffected. Followed internal links from the homepage into a
case study and back, and to blogs.html — both load with no console
errors and are visually unaffected by the new homepage-only CSS. Re-parsed
the JSON-LD block after editing nearby markup — still valid.

## 2026-09-03 — MSc Added to About Section (v6.44)

Added the University of Twente Master's to the About section.

Placed at the **start of the existing background paragraph** rather than as
a new sentence or bullet — that paragraph already covers where the
engineering grounding comes from, so the degree belongs there. Reworded the
following clause from "That's shaped how I approach every project since" to
"That engineering grounding is why…", so the degree and the Fugro work
connect to the point instead of the credential just sitting there.

Also worth noting the placement is now right above Werner's testimonial,
which independently makes the same point ("thanks to his civil engineering
background, he also understands the physical processes") — the claim and
the third-party confirmation reinforce each other.

### Schema.org
Added `alumniOf` (University of Twente, linked to utwente.nl) and
`hasCredential` (MSc Civil Engineering and Management, Master's degree) to
the existing Person node, so the credential is machine-readable rather than
prose-only. Re-parsed the full JSON-LD block after editing to confirm
validity.

No console errors.

## 2026-09-03 — Testimonials Section (v6.43)

Added a testimonials section to the homepage with the first testimonial,
from Werner Halter (Principal Consultant, Fugro), quoted verbatim as
supplied.

### Placement
Between About and How It Works, as `.neo-page` (dark) — About above it is
`.neo-page-alt`, so this keeps the page's alternating band rhythm. Social
proof also lands better right after the About story and before the process
pitch. Added to the card-nav under Work.

### Component
New `.neo-testimonial*` classes in `neo.css`, matching the existing
neo-brutalist card language (surface fill, white border, hard shadow).
`auto-fit` grid so this single testimonial sits centred rather than
stranded in a narrow left column; further testimonials will flow into a row
with no markup change.

Werner's photo copied to a URL-safe `werner-halter-fugro.jpeg` (original
kept), rendered as a 60px circular avatar with a teal ring. His name links
to his LinkedIn profile with `rel="noopener noreferrer"`.

### Schema.org
Added the testimonial as a `Review` on the existing `ProfessionalService`
node. **Deliberately no `reviewRating`** — Werner gave a written
recommendation, not a star rating, and inventing one would be fabricating
data he never provided (Google also penalises unsubstantiated review
markup). Re-parsed the full JSON-LD block after editing to confirm it's
still valid.

Verified: photo loads and renders 60×60; LinkedIn glyph resolves from
"Font Awesome 6 Brands"; grid centred; section background alternates
correctly; mobile fills width with balanced 20px gutters, no horizontal
overflow; no console errors.

## 2026-08-29 — LinkedIn Post Generator Screenshot on Waterprof; Figures Centred (v6.41 → v6.42)

### Screenshot added
Added the user-supplied `Linkedin bot generator.png` to the Waterprof case
study, in the Approach section under the tool chips. Copied to a URL-safe
`linkedin-bot-generator.png` (original kept), consistent with how the
Haskoning and Podcast screenshots were handled.

Used `.is-portrait` (520px cap) rather than `.is-wide` (1100px): the image is
981×900, so `.is-wide` would have upscaled it well past native size and
softened it. At 520px it renders sharp.

**Caption written from the actual image, not assumed.** A first draft
described it generically as "draft in, human review before publishing" — on
opening the file, it's Waterprof's own branded internal tool showing a
concrete three-step flow, including *"Kies uit SharePoint"* and step 3
*"Controleer en plaats"* (check and post). The SharePoint integration is
direct visual evidence for the case study's "data stays in their Microsoft
environment" claim, so the caption now names it:

> The internal tool Waterprof's team uses — pull a project straight from
> SharePoint, generate a draft, then check and edit before it goes out

### Figures centred
`.case-figure` had `margin: 28px 0 0` — zero left/right, so figures sat flush
left under the body copy. Changed to `margin: 28px auto 0`, and figcaptions
to `text-align: center` (a left-aligned caption under a centred image reads
as a misalignment).

Applied globally rather than scoped: all three pages using figures
(Waterprof, Haskoning, Podcast Tuhaf) show standalone visuals, not
inline-with-text elements, so centring suits all of them. Verified after the
change — Haskoning's two figures and Podcast Tuhaf's three all centre
correctly with images still loading.

Verified: Waterprof figure centred (340px both sides), caption centred,
image loads at 520px from 981px native; mobile 375px fills width with
balanced 20px gutters and no horizontal overflow; no console errors.

## 2026-08-29 — Hero Centres When the Bubbles Hide (v6.40)

Below 1300px the bubble field is hidden, which left the hero text
left-aligned against a large empty gap on the right where the bubbles used
to be. The hero column, its text, and the CTA buttons now centre at that
same breakpoint.

- Breakpoint is `max-width: 1299.98px` — deliberately the exact complement of
  the bubble field's `min-width: 1300px`, so the layout flips at precisely
  the width the bubbles disappear, never a range where both states are wrong.
- `.hero-buttons` needed `justify-content: center` separately — it's a flex
  row, so `text-align` alone doesn't move it.

### Inline styles moved to CSS (required, not cleanup)
The two hero subtitles carried `style="max-width: 680px; margin: 20px 0 12px"`
inline in index.html. Inline styles beat stylesheet rules, and that
`margin: … 0 …` pins left/right margin to zero — so the centring rules could
never have taken effect while those attributes remained. Moved to
`.hero-subtitle-lead` / `.hero-subtitle-clients` classes with the same
values, plus `auto` side margins inside the breakpoint.

Verified at 1100px: bubbles hidden, `text-align: center`, buttons centred,
subtitle margins resolve to 40px/40px, column centred (163px both sides).
At 1352px: bubbles visible, text still left-aligned — unchanged. Mobile
(375px) centres correctly with buttons still stacking vertically, no
horizontal overflow, no console errors.

## 2026-08-29 — "What I Do" Tweaks: Spacing, Clock Icon, Copy (v6.39)

- **Icon spacing widened** on the homepage row: gap `36px → 72px`, with
  max-width `760px → 940px`. The extra width is what actually separates the
  columns — a bigger gap alone would just squeeze each column narrower.
  Mobile uses a tighter `40px` since the row stacks vertically there.
  **Scoped to `#what-i-do`**, not applied to `.case-highlights` globally —
  the same component is used on four case-study pages, where the tighter
  36px still reads correctly under a narrower body-copy column. Verified
  after the change: case-study pages still compute `36px / 760px`.
- **Icon changed** `fa-robot → fa-clock`.
- **Copy changed** to the user's wording: "Automate your work (with or
  without AI)".

Verified: measured visual gaps between adjacent columns are a real 72px;
clock glyph resolves; no console errors; no horizontal overflow on mobile.

### Note
`fa-clock` is now used both here and on the Haskoning case study ("Six hours
down to one"). Different pages, so no visual conflict — flagged only in case
a distinct icon is preferred later.

---

## 2026-08-29 — New "What I Do" Section Before Projects (v6.38)

Added a three-icon summary section between the hero and Projects & Case
Studies, on the same `.neo-page-alt` background as the About section
(verified identical: both `rgb(20, 25, 54)`).

**Heading:** "Less busywork. More of the work that grows your business."

| Icon | Caption |
|---|---|
| `fa-robot` | Automate the repetitive work — with AI where it helps, plain scripts where it doesn't |
| `fa-lock` | Your company data stays yours, handled to enterprise standards |
| `fa-mug-hot` | Get your hours back for the decisions only you can make |

### Copy
User supplied three internal-sounding bullets and asked for them to be
rewritten to attract a client. Reframed each from a description of *what is
built* into the *outcome for the reader*: "automate your daily work using
either AI or hardcoded scripts" → "automate the repetitive work — with AI
where it helps, plain scripts where it doesn't" (keeps the honest
non-hype framing already used across the hero), "safe handling of enterprise
data" → "your company data stays yours", "focus on strategies that matter" →
"get your hours back for the decisions only you can make".

### Implementation
Reused the existing `.case-highlights` component from the case-study pages —
already yellow, boxless, centred, and responsive — rather than adding a new
one.

### Spacing note
The v6.29 rule `.neo-hero-centered + .neo-section { padding-top: 40px }`
targets the hero's *immediate* sibling. This new section is now that sibling,
so it correctly inherits the tightened 40px and the hero gap stays at 64px;
Projects returns to the standard 90px, which is right — it's no longer
adjacent to the hero.

Verified: all three icons resolve to real glyphs and compute to yellow
(`rgb(255,193,7)`); mobile collapses to one column with 44px icons, no
horizontal overflow; no console errors.

## 2026-08-29 — Hero Gap Returned (Self-Inflicted) + Hero/Projects Left Edges Aligned (v6.37)

### The gap came back — caused by the v6.29 fix itself
Nothing regressed in the code; all four v6.29 spacing fixes were still
applying correctly (verified: hero padding 16px, text padding 8px, button
margin 0, projects padding 40px). The culprit was the **601px pinned bubble
field** added in that same release to stop the bubbles moving.

As a flex sibling with a fixed 601px height, the field became the tallest
item in the row and propped the container open to 601px, even though the
text only needs ~495px. Measured directly: hiding the field dropped the hero
737px → 631px.

**Fix:** the field stays a flex item (so flexbox still computes the
text/field width split) but is now `height: 0` + `align-self: flex-start`,
contributing nothing to the row's height. Because a percentage `top` against
a zero-height parent resolves to 0 — which would stack all six bubbles at the
top — the bubbles' `top` values were converted from percentages to the exact
pixel offsets those percentages produced against the old 601px field
(24/72/276/445/228/529px). Verified: bubble tops unchanged at
144/192/396/565/348/649.

Result: **gap 117px → 64px**, hero 737px → 631px.

An intermediate attempt using `position: absolute` on the field was tried and
abandoned — it let the text expand to its full 760px, leaving the field only
its 220px `min-width` and shifting every bubble ~76px left.

### Hero and Projects now share one left edge
Separately, the hero headline sat 78px right of "Projects & Case Studies".
`.hero` is `display: flex` (style.css), which makes its `.container` a flex
*item* — and a flex item shrink-wraps to its content rather than filling to
its own `max-width`. The hero container was 1044px against the Projects
container's full 1200px. Added `width: 100%` so it claims the full width like
every other section.

Verified: both titles now at x=108 (desktop) and x=20 (mobile). No console
errors, no horizontal overflow, bubbles still hidden below 1300px.

## 2026-08-29 — Result Highlights Rolled Out to Three More Case Studies (v6.34)

Extended the `.case-highlights` icon row (built for Waterprof) to three more
case studies, using the same optional `resultHighlights` generator field:

**Haskoning** — `fa-clock` "Six hours down to one" · `fa-database` "Draws on
past project risks" · `fa-user-check` "Risk manager still decides"

**Odido** — `fa-calendar-check` "Reports arrive on schedule" ·
`fa-circle-check` "Manual entry errors eliminated" · `fa-map-location-dot`
"Runs nationwide, every store"

**Podcast Tuhaf** — `fa-eye` "50,000+ viewers reached" · `fa-bullseye`
"Niche audience, precisely targeted" · `fa-scissors` "AI picks the best clips"

### Fugro deliberately excluded
Proposed and then dropped at the user's direction — agreed it's the wrong
fit. That case study's strength is its honesty: it states plainly that
friction angle *couldn't* be predicted and why (dataset too small and
inconsistent). A row of three upbeat icons would flatten a genuinely mixed
result into a clean win, undercutting the credibility that makes the page
work. Verified 0 highlights render there.

### Verified
- Per-page counts: fugro 0, haskoning 3, odido 3, waterprof 3,
  podcast-tuhaf-dashboard 3.
- All new icons resolve to real glyphs (checked computed `font-family` and
  `::before` content on each — six of the nine weren't used anywhere on the
  site before, and a missing Font Awesome glyph renders as a silent blank
  box). No console errors.

---

## 2026-08-29 — Three Result Highlights on the Waterprof Case Study (v6.31 → v6.32)

### Summary
Added a three-icon highlight row under **Results** on the Waterprof
("Secure LinkedIn Content Automation on Azure") case study — large
standalone yellow icons, each with a single short caption:
1. `fab fa-microsoft` — "Enterprise data stays on Azure"
2. `fas fa-user-check` — "A human always approves"
3. `fas fa-clock` — "Faster, same quality bar"

### Changes
- `scripts/gen_case_studies.js` — added an optional `resultHighlights`
  field, rendered after the Results paragraphs. Optional by design: the
  other four case studies don't define it and their output is unaffected.
- `css/neo.css` — new `.case-highlights` / `.case-highlight` component:
  52px yellow icons (44px on mobile), centred, one bold short line under
  each, no border/background.

### Centred (v6.33)
`.case-highlights` had `margin: 40px 0 8px` — zero left/right margin, so the
760px-wide grid sat flush left under the body copy rather than centred in the
page. Changed to `margin: 40px auto 8px`. Verified: 163px gap on both sides at
desktop, 20px both sides on mobile.

### Design revision (v6.31 → v6.32)
First pass reused the existing `.neo-info-grid` / `.neo-info-card`
component (bordered boxes, 22px icons, full paragraphs). User asked for
bigger icons, yellow, no surrounding box, and ~5-word captions instead of
paragraphs — so `.case-highlight` was written as its own class rather than
modifying `.neo-info-card`, which the blog pages still use and which needed
to stay untouched.

### Verified
- Computed styles confirm the spec: `font-size: 52px`, colour
  `rgb(255,193,7)` (yellow), `border-style: none`, transparent background,
  captions at 5/4/4 words.
- All three icons resolve to real glyphs (checked `::before` content and
  computed `font-family` — `fa-microsoft` correctly loads "Font Awesome 6
  **Brands**" via the `fab` prefix). Worth checking because two of the three
  weren't used anywhere on the site yet, and a missing glyph silently
  renders as a blank box.
- Mobile: collapses to a single column, icons scale to 44px, no horizontal
  overflow. No console errors.

### Note
The request also opened with "I want to add the following on the problem:"
but the content after it didn't come through. Confirmed with the user —
Problem section left untouched, icons only.

---

## 2026-08-29 — Bottom Bubble No Longer Cut by Projects Section (v6.30)

### Summary
After the hero was shortened (v6.29), the bottom-most bubble ("Website
Building") overhangs the hero's bottom edge by 24px — intended — but was
being sliced off. Two independent causes, both fixed:

1. **`.hero { overflow: hidden }`** (global rule in style.css, kept for
   other pages) was clipping the overhang at the hero's boundary.
   → `overflow: visible` scoped to `.neo-hero-centered` only.
2. Even unclipped, `#projects` is `position: relative` with an opaque
   background and comes later in the DOM, so it painted *over* the
   overhanging bubble.
   → Projects section pinned to `z-index: 0`, bubble field raised to
   `z-index: 2`.

### Stacking order now
`.neo-hero-text` (3) > `.neo-bubble-field` (2) > `.neo-hero-centered +
.neo-section` (0). The text was bumped 1 → 3 so it stays above the bubbles
— a bubble drifting leftward can never cover the headline or CTAs.

### Verified
- `elementFromPoint` at the bubble's lowest point returns the bubble
  itself, not the section — proving it paints on top rather than being
  covered.
- `.hero` computed `overflow: visible`; overhang measured at 24px.
- Hit-tested the headline (returns `.hero-title`) and the first project
  card (returns `.project-card-tag`, `closest('.project-card')` non-null)
  — so neither the text layering nor card clickability regressed from the
  `z-index: 0` on the section. No console errors.

---

## 2026-08-29 — Closed the Hero → Projects Gap (v6.29)

### Summary
Large dead space between the hero CTA buttons and the "Projects & Case
Studies" section. Measured gap from buttons to the "SELECTED WORK" eyebrow:
**264px → 117px**, with every bubble staying in exactly its previous
position (hard requirement from the user).

### Root cause — measured, not guessed
An earlier attempt at this blamed the bubble field's `align-self: stretch`
and was reverted after it didn't help. Measuring properly this time:
hiding `.neo-bubble-field` entirely left the hero's height **completely
unchanged**, ruling the bubbles out. The 264px was four separate things
stacking up, none of them the bubbles:
- `50px` — `.hero-buttons { margin-bottom: 50px }` (global rule in
  style.css, the 50px I couldn't account for on the previous attempt)
- `64px` — `.neo-hero-text` padding-bottom
- `60px` — `.hero` padding-bottom
- `90px` — `.neo-section` padding-top on `#projects`

### Changes (`css/neo.css`, all scoped to the hero — global rhythm untouched)
- `.neo-hero-centered .hero-buttons { margin-bottom: 0 }` — overrides the
  global rule for this hero only, since other pages still want the 50px.
- `.neo-hero-centered .neo-hero-text` padding-bottom `64px → 8px`
- `.neo-hero-centered { padding-bottom: 16px }` (was 60px via `.hero`)
- `.neo-hero-centered + .neo-section { padding-top: 40px }` (was 90px) —
  adjacent-sibling selector, so only the section directly after the hero
  tightens up. Verified `#projects` is in fact the hero's immediate next
  sibling before relying on it.

### Keeping the bubbles still
Bubbles use percentage `top` values against `.neo-bubble-field`, so
shrinking the hero would have dragged them all upward and bunched them.
Pinned the field to `height: 601px` (exactly its pre-change height) with
`align-self: flex-start` so the flex row can't stretch it back out. The
bubbles therefore hold position and simply extend past the hero's bottom
edge into the Projects section — explicitly approved ("the bubbles may
overlay on the 2nd section").

Verified: all six bubble bounding boxes are byte-identical before and after
(top 144/192/396/565/348/649, left 1040/916/1056/934/918/1024). No console
errors; mobile checked separately and benefits from the tighter spacing.

---

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
