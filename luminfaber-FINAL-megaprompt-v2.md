# LUMINFABER — FINAL CLAUDE CODE MEGA-PROMPT v2
**Project:** luminfaber.com · v1 production build (frontend-first, backend deferred)
**Owner:** Lokavya (techlogist1 · lokavya12@gmail.com)
**Generated:** April 20, 2026 · v2 (image paths fixed, Pretext via npm, luminfaber repo locked)
**Execution model:** Fully autonomous local build (Phase A) → gated integration session (Phase B)

This is the single source of truth. Paste § 16 (THE PASTE) into Claude Code AFTER running the separate PRE-FLIGHT prompt. Everything between is context for humans or reference for Claude Code.

---

## § 0 — CONTEXT FOR CLAUDE CODE (environment already prepped)

Before you received this file, the user ran a separate PRE-FLIGHT prompt that verified:

- Current directory is `C:\dev\luminfaber\` (git repo already initialized)
- Font staging folder `C:\dev\luminfaber-fonts\` exists with 9 .woff2 files
- Antigravity settings.json has `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `opus-4-7`, `xhigh`
- MJ image assets exist at `C:\dev\imageshero\mj\non upscaled\` (5 PNG files)
- fal Premise assets exist at `C:\dev\imageshero\fal\` (12 PNG files)

**DO NOT** run `mkdir luminfaber`, `git init`, or `cd C:\dev`. You're already where you need to be.

**Repo:** fresh `techlogist1/luminfaber` (create via `gh repo create techlogist1/luminfaber --public --source=. --remote=origin` if GitHub MCP is authenticated; otherwise skip silently and note it for Phase B).

Any reference to "pretext" in this document refers EXCLUSIVELY to Cheng Lou's library `@chenglou/pretext`. There is no user-owned "pretext" repo being touched.

---

## § 1 — THE ASK

**Build:** luminfaber.com — production-ready v1 agency website, frontend-complete, backend mocked.

**Company:** Luminfaber. Web + AI automation agency. Jaipur, India. Two cofounders (Lokavya = builder/technical; Raghav = strategy/sales) + one employee (Bhomik = operations, 70% opacity in Who We Are). Services: Web + Automation only. Pricing: "Request a custom quotation" — no numbers.

**Positioning:** "We create things that are actually beautiful and aesthetic for the current world. We are designers first."

**Audience:** Indian SMBs (₹2Cr–₹50Cr revenue) who care about design. Global English tone, not Indian-English-coded.

**Goal:** Live, indexable, performant site that turns prospects into Cal.com bookings.

**Execution model:** Phase A builds complete frontend on localhost:3000 with mocked backend. Phase B (separate gated session, trigger = user says "integrate and ship") wires real Supabase + Resend + Cal.com + Vercel + Cloudflare.

---

## § 2 — AESTHETIC TARGET (LOCKED — DO NOT DRIFT)

**Register:** 2026 editorial remix — indie + editorial + vintage + warm.

**Reference anchors (study via Context7 / web fetch for mood):**
- Las Veras (lasveras.org) — full-bleed cover, small centered serif, tiny mono caption
- Aspect Studio — split 50/50 color-block + photo layouts
- BSTN × Adidas "No time for new deals" — maximum restraint, full-bleed warm interior
- Perplexity "Where knowledge begins" campaign — saturated 70s editorial, vintage-CRT-in-nature
- Kinfolk, Cereal, Gentlewoman, Aesop, Le Labo — broader mood anchors

**Explicitly NOT the target (prior iterations proved these fail):**
- ❌ Terminal ASCII dashboards, box-drawing, code status bars
- ❌ Museum-print: "VOLUME I · ISSUE 01", "NO. 05 · NOTEBOOK", "PLATE I", drop caps, roman numerals i./ii./iii.
- ❌ Dark/night palette or scroll-driven palette transitions
- ❌ Scroll-scrubbed video backgrounds
- ❌ Parallax, page transitions, text scramble (EXCEPT the 3 whitelisted moments in § 6), cursor trails, magnetic buttons, skewed marquees
- ❌ Comet-style uniform rounded containers — editorial asymmetry required

---

## § 3 — DESIGN SYSTEM

### 3.1 — Palette

```css
/* app/globals.css */
:root {
  --bg:              #F5EFE0;  /* warm cream */
  --fg:              #1C1814;  /* warm near-black */
  --fg-muted:        #6B5F4D;  /* secondary text, eyebrows (a11y-safe on cream) */
  --fg-subtle:       #A89577;  /* borders, placeholders */
  --accent-amber:    #E8A849;  /* CTA button fill + decorative accents only */
  --accent-amber-dk: #8B6F1F;  /* amber-for-text variant (a11y-safe on cream, 4.7:1) */
  --accent-terra:    #B54A33;  /* italic emphasis */
  --accent-olive:    #758048;  /* reserved */
  --accent-cobalt:   #1D3B6E;  /* reserved */
  --grain-opacity:   0.03;
}
```

**CRITICAL A11Y:** `--accent-amber` #E8A849 has 2.0:1 contrast on cream — **fails WCAG AA**.
- ✅ Amber allowed as: CTA button FILL (text on top is near-black), decorative link underlines
- ❌ Amber NEVER used as: eyebrow text, body text, caption text
- Amber-colored text → use `--accent-amber-dk` (#8B6F1F, 4.7:1)
- Eyebrow default → `--fg-muted` (#6B5F4D, 5.2:1)

### 3.2 — Typography stack (LOCKED)

| Role | Font | Weights | Self-hosted |
|---|---|---|---|
| Display serif | Prata | 400 | Yes |
| Italic serif | EB Garamond | 400 italic, 500 italic | Yes |
| Body/UI sans | Switzer | 300/400/500/600/700 | Yes |
| Captions/mono | Fragment Mono | 400 | Yes |

All 9 .woff2 files pre-staged at `C:\dev\luminfaber-fonts\`. Phase A copies them into `public/fonts/`.

**Pairing rules (strict):**
- Prata: display only, 32px+, **weight 400 only**, NEVER italic (no italic variant exists — would render faux)
- EB Garamond: **italic-only usage** — pairs with Prata for 2 italic moments (sub-headline + `<em>`)
- Switzer: body/UI, never above 32px
- Fragment Mono: captions only, always uppercase, tracked 0.12em

### 3.3 — Type scale

```ts
// tailwind.config.ts — extend.fontSize
{
  'display-xl':  ['102px', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '400' }],
  'display-l':   ['77px',  { lineHeight: '1',    letterSpacing: '-0.02em', fontWeight: '400' }],
  'display-m':   ['58px',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
  'heading-l':   ['38px',  { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '400' }],
  'heading-m':   ['28px',  { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '400' }],
  'body-l':      ['19px',  { lineHeight: '1.5',  fontWeight: '400' }],
  'body':        ['16px',  { lineHeight: '1.6',  fontWeight: '400' }],
  'caption':     ['12px',  { lineHeight: '1.4',  letterSpacing: '0.12em', fontWeight: '400' }],
}
```

### 3.4 — Grid + spacing

- Container: `max-w-[1440px]`, horizontal padding 40px desktop / 20px mobile
- Section vertical rhythm: 180px desktop / 80px mobile
- Editorial asymmetry encouraged

### 3.5 — Treatments

- Film grain overlay sitewide, SVG noise, `mix-blend-multiply`, 3% opacity
- Border radius: default 0. Exception: CTA pill = 999px
- Shadows: avoid. Exception: CTA button subtle `0 4px 8px rgba(232,168,73,0.15)`
- Images: per-section treatment per § 5, NOT uniform containers
- **`<img>` tag FORBIDDEN.** All images use Next.js `<Image>` with responsive `sizes`. `next.config.js` configured for AVIF + WebP.

---

## § 4 — SITE STRUCTURE

### Homepage — 7 sections

1. Hero — full-bleed runner, wordmark TL, nav TR, Pretext morph centered
2. Premise — text-only manifesto + scattered cut-out objects + typewriter entrance
3. Service 01 Web — split 50/50 (image LEFT)
4. Service 02 Automation — mirrored split (image RIGHT)
5. Who We Are — scrapbook collage + 3 name cards
6. CTA — full-bleed contact image + pill button + inline form
7. Footer — texture bg + 20% cream overlay + 3-col nav

### Deep pages

- `/work` — 3 placeholder case studies
- `/command-center` — atmospheric single page
- `/book` — Cal.com iframe

### 404

`app/not-found.tsx` — branded, Prata "This page doesn't exist. Yet."

### File tree

```
app/
├── layout.tsx              # Fonts, grain, cursor, metadata, JSON-LD
├── page.tsx                # Homepage (composes 7 sections)
├── globals.css             # Design tokens
├── not-found.tsx
├── work/page.tsx
├── command-center/page.tsx
├── book/page.tsx
├── api/contact/route.ts    # MOCK in Phase A
├── sitemap.ts
└── robots.ts

components/
├── layout/
│   ├── Wordmark.tsx
│   ├── Nav.tsx             # Desktop: 3 links; Mobile <768px: "Book a call" only
│   ├── Footer.tsx
│   ├── GrainOverlay.tsx
│   └── CustomCursor.tsx    # @media (hover: hover) and (pointer: fine)
├── sections/
│   ├── Hero.tsx
│   ├── Premise.tsx
│   ├── ServiceWeb.tsx
│   ├── ServiceAutomation.tsx
│   ├── WhoWeAre.tsx
│   └── CTA.tsx
├── pretext/                # React wrappers around @chenglou/pretext
│   ├── Morph.tsx
│   ├── Explode.tsx
│   └── Typewriter.tsx
├── premise/
│   ├── CollageObject.tsx
│   └── SVGMarks.tsx
├── motion/
│   ├── KenBurns.tsx
│   ├── SectionReveal.tsx
│   └── LinkUnderline.tsx
└── ui/
    ├── Button.tsx
    ├── Container.tsx
    └── ContactForm.tsx

lib/
├── fonts.ts                # next/font/local × 4 families
└── utils.ts

public/
├── fonts/                  # 9 .woff2 files copied from C:\dev\luminfaber-fonts\
└── images/
    ├── hero/hero-FINAL.png
    ├── service-web/service-web-FINAL.png
    ├── service-automation/service-automation-FINAL.png
    ├── cta/contact-FINAL.png
    ├── footer/footer-texture-FINAL.png
    └── premise/            # 12 files with premise- prefix preserved

INTEGRATIONS.md             # Phase A final deliverable
```

---

## § 5 — PER-SECTION SPECS

### 5.1 — HERO

**Layout:** Full viewport `95svh` (svh not vh — Safari chrome fix), full-bleed bg.

**Background:** `public/images/hero/hero-FINAL.png` via `<Image fill priority>`. Ken Burns 1.00→1.04 over 14s infinite alternate ease-in-out. Film grain on top.

**Content (4 elements only):**

1. **Top-left wordmark** — "Luminfaber" Prata 22px cream #F5EFE0, `position: absolute; top: 28px; left: 36px`

2. **Top-right nav (desktop ≥768px):** Prata 15px cream, gap 28px, 3 links "Index" → `/work`, "Work" → `/work`, "Book a call" → `/book`. Link-underline-grow effect per § 6.

3. **Top-right nav (mobile <768px):** ONE link — "Book a call" → `/book`. No hamburger. Deliberate editorial choice.

4. **Centered Pretext morph** — Prata 104px desktop / 64px mobile, cream, letter-spacing -0.02em. Two phrases cycling 4s dwell + 800ms morph: "You dream." / "We build."

5. **Film grain** — absolute, pointer-events none, 3%, mix-blend-multiply.

NOT on this section: no subtitle, no eyebrow, no scroll hint, no vignette.

### 5.2 — PREMISE

**Layout:** Full-width, cream bg, 180px/80px vertical padding.

1. **Sub-headline:** "A design agency for companies that care how things look."
   - **EB Garamond 400 italic** 24px, color `var(--accent-terra)`
   - Max-width 600px, left-aligned, margin-bottom 80px

2. **Main headline:** "We care how things look."
   - Prata display-xl (102px desktop / 58px mobile), color `var(--fg)`, line-height 0.95
   - Left-aligned, 2 lines
   - **TYPEWRITER ENTRANCE** via `components/pretext/Typewriter.tsx`:
     - IntersectionObserver `{ threshold: 0.3, once: true }`
     - Letters appear sequentially, 50ms stagger, 200ms each ease-out (opacity 0→1, translateY 4px→0)
     - Total ≈ 1.3s for 22 chars
     - Fires ONCE per session, does not re-animate
     - `prefers-reduced-motion` → falls back to opacity fade-up
   - Margin-bottom 60px

3. **Scattered cut-out objects** (6-8 of 12, absolutely positioned):
   - `<Image>` with transparent PNG
   - Scale 80-200px, rotation -8° to +8°
   - Gentle float: translateY ±2px, 6-8s infinite ease-in-out, unique delay per object
   - z-index below headline
   - `prefers-reduced-motion` → static
   - Suggested placements (tune for balance):
     - `premise-whiskey-glass` top-right near headline
     - `premise-typewriter-key` bottom-left overlap with "look."
     - `premise-wildflower` mid-right tall vertical
     - `premise-compass` near body copy
     - `premise-film-roll` mid-left
     - `premise-book-stack` far left beside sub-headline
     - `premise-toy-car` between headline and body
     - `premise-postage-stamp` small near sign-off

4. **Hand-drawn SVG marks** via `components/premise/SVGMarks.tsx`, 2px stroke `var(--fg)`:
   - Ink arrow `→` between sub-headline and headline
   - Squiggle under period of "look."
   - Asterisk cluster near body

5. **Body:** "That's not a tagline — it's the whole job. Every website we build, every automation we ship, every system we design: the bar is *actually beautiful*. We think that's a higher bar than most agencies set."
   - Switzer 19px line-height 1.5, max-width 600px
   - "actually beautiful" wrapped in `<em>`: **EB Garamond 400 italic**, color `var(--accent-amber-dk)` (#8B6F1F, a11y-safe)

6. **Sign-off:** "— LUMINFABER, DESIGNERS FIRST, EST. 2026"
   - Fragment Mono 12px uppercase tracked 0.12em, color `var(--fg-muted)`
   - Margin-top 40px

**Marginalia** (Fragment Mono 10-11px `var(--fg-muted)`):
- `P.01` superscripted beside sub-headline
- `§§§` floating in left margin
- `//////////` row between body and sign-off

### 5.3 — SERVICE 01: WEB

**Layout:** 50/50 split desktop, stacked mobile. Cream bg.

**LEFT (50%):** `public/images/service-web/service-web-FINAL.png` at 4:5, matted frame (padding 40px bg `var(--bg)`), Ken Burns 1.00→1.03 / 12s. `sizes="(max-width: 768px) 100vw, 50vw"`.

**RIGHT (50%):** Text col, left padding 80px, vertical center, gap 32px:
1. Fragment Mono eyebrow `01 — WEB` color `var(--fg-muted)` (NOT amber)
2. Prata display-m "Websites that feel like something."
3. Switzer body-l max-width 480px: "Bespoke, editorial-grade sites. Hand-crafted typography, film-grade imagery, motion that means something. We build in Next.js, TypeScript, Tailwind — the modern stack, composed with taste."
4. Switzer body max-width 480px: "Strategy + brand foundations — Design system + component library — Development, launch, ongoing care"
5. CTA link "Request a custom quotation →" Switzer 16px 500, amber bottom-border grows on hover

### 5.4 — SERVICE 02: AUTOMATION

Mirror of 5.3. LEFT = text (padding on RIGHT), RIGHT = image.
- Eyebrow `02 — AUTOMATION` in `var(--fg-muted)`
- Heading "Pipelines that do the work."
- Body "We build custom AI automations, internal tools, and data pipelines. Your team stops doing the boring parts. The good work compounds."
- List "Workflow automation, custom built — AI pipelines with real reliability — Internal dashboards + operator tools"
- CTA "Request a custom quotation →"
- Image `service-automation-FINAL.png` in matted frame

### 5.5 — WHO WE ARE

**Layout:** Full-width cream, 120vh, scrapbook chaos.

**Top:**
1. Eyebrow `THE PEOPLE` Fragment Mono 12px `var(--fg-muted)`
2. Prata display-l "Three people, based in Jaipur."
3. Switzer body-l max-width 500px: "A small studio. A long attention span. One conversation from idea to ship."

**Below — scrapbook collage:**

6-8 dashed-border cream placeholder rectangles:
- Varied sizes: 280×200, 180×240, 420×280, 220×300, 260×180, 200×260, 340×240, 180×200
- Rotation -6° to +6°
- Asymmetric positions, controlled overflow allowed
- Caption `DIGICAM PHOTO — PLACEHOLDER` Fragment Mono 10px centered
- Some with faux-washi-tape corners (small cream rectangles at 45°)

**Three name cards nested INTO collage:**

```
[Name]           Prata 38px var(--fg)
[ROLE · ROLE]    Fragment Mono 12px uppercase 0.12em var(--fg-muted)
[Tagline]        Switzer 16px var(--fg-muted) max-width 280px
```

1. **Lokavya** / `BUILDER · TECHNICAL` / "Writes the code. Designs the systems. The one making things exist."
2. **Raghav** / `STRATEGY · SALES` / "Runs the conversations. Shapes the strategy. Makes sure we build the right things."
3. **Bhomik** / `OPERATIONS` / "Keeps the wheels turning. Handles the details everyone forgets." *(card at 70% opacity)*

Desktop: grid with intentional overlap. Mobile: stacked, no rotations, no overlap.

### 5.6 — CTA

**Layout:** 100svh, full-bleed bg.

**Background:** `public/images/cta/contact-FINAL.png` via `<Image fill>` + Ken Burns. No blur. Subtle 15% cream overlay only if readability demands.

**Content:** centered max-w 800px, vertical-center, cream text #F5EFE0:
1. Fragment Mono eyebrow `START SOMETHING` cream 80% opacity
2. Prata display-xl "Let's build something beautiful."
3. Switzer body-l max-width 500px: "We take on two new projects a month. If your company cares how it looks — and how it works — we'd love to talk."
4. CTA pill button:
   - padding 18px 36px, bg `var(--accent-amber)`, text `var(--fg)`
   - radius 999px, shadow `0 4px 8px rgba(232,168,73,0.2)`
   - Label "Start the conversation →"
   - Hover: Pretext Explode (600ms)
   - Click: reveals inline contact form below (slide-down 400ms)
5. Fragment Mono caption `USUALLY RESPOND WITHIN 24 HOURS` cream 70%

**Inline form (on button click):**
- Fields: name / email / company / message
- Switzer inputs, cream bg, 0.5px `var(--fg-muted)` borders, radius 0
- Submit: amber pill
- Posts to `/api/contact`
- Success: replaces form with Prata 28px "Thanks — we'll be in touch within 24 hours." + Fragment Mono "We usually reply faster than that."
- Error: inline error `var(--accent-terra)` below form

### 5.7 — FOOTER

**Layout:** Full-width, ~400px, `footer-texture-FINAL.png` bg + 80% cream overlay (`::after { background: rgba(245,239,224,0.8) }`).

3-col grid, padding 80px 40px, max-w-1440:

**Col 1:** Prata 58px "Luminfaber" / Switzer body "A design agency. Jaipur, India." `var(--fg-muted)`

**Col 2:** Fragment Mono heading "INDEX" `var(--fg-muted)` / stacked Switzer 500 16px links: Work / Command Center / Book a call / Email

**Col 3:** Fragment Mono heading "ELSEWHERE" / mailto + Twitter + Instagram (Lucide 16px)

**Bottom strip:** border-top 0.5px `var(--fg-subtle)`, padding 16px 40px:
- Left: "© 2026 Luminfaber" Fragment Mono 10px
- Right: "Made with care in Jaipur" Fragment Mono 10px italic

### 5.8 — DEEP PAGES

**`/work`** — stacked editorial, 120px gaps:
- Each: 16:9 placeholder + Prata display-m name + Switzer body summary + "Read the case →"
- Northfield Studio — "Brand system + e-commerce. 38% lift in AOV. Ongoing care."
- Paper & Ink Ltd. — "Editorial platform rebuild. 2× organic traffic. Launched in 9 weeks."
- Forest & Field Co. — "D2C site + AI product recommender. 4× conversion lift."

**`/command-center`** — atmospheric:
- Cropped detail of `service-automation-FINAL.png`
- Eyebrow `THE COMMAND CENTER` `var(--fg-muted)`
- Prata display-l "We built our own operating system."
- Body: "Every Luminfaber project runs through the Command Center. It's how we ship fast, stay organized, and give you real visibility into the work. We use it internally today. You'll use it too, soon."
- "← Back to index"
- NO ASCII, NO dashboard mockup

**`/book`** — minimal:
- Prata display-l "Let's talk."
- Iframe `https://cal.com/luminfaber/30min` (will 404 in dev — Phase B fixes)

**`not-found.tsx`:**
- Cream bg + grain
- Prata display-l "This page doesn't exist. Yet."
- Switzer body muted: "You might've followed an old link. Or we haven't built that page."
- "← Back to home"

---

## § 6 — MOTION STACK

### IN (8):
1. Film grain overlay sitewide — 3% opacity, `mix-blend-multiply`
2. Ken Burns on all section images — 1.00→1.04, 12-14s infinite alternate
3. Pretext hero morph — 2 phrases, 4s dwell + 800ms morph
4. Scroll entrance reveals — Framer Motion `whileInView`, y 24→0, 600ms, 80ms stagger
5. Pretext-explode CTA button on hover — 600ms scatter + reassemble
6. Link underline grow on hover — 0.5px, width 0→100%, 0.35s ease, left origin
7. Custom cursor — 12px amber → 40px `mix-blend-difference`. Gated behind `@media (hover: hover) and (pointer: fine)`. Respects `prefers-reduced-motion`.
8. Premise typewriter — one-shot on scroll-in, 50ms stagger, 200ms ease-out, fires once

### OUT:
- ❌ Parallax, page transitions, scroll palette transitions
- ❌ Text scramble/glitch — EXCEPTIONS: hero morph, Premise typewriter, CTA explode (only 3 whitelisted)
- ❌ Cursor trails, magnetic buttons, skewed marquees

### Safety:
All motion checks `prefers-reduced-motion: reduce`. Custom cursor ALSO checks `(hover: hover) and (pointer: fine)`.

---

## § 7 — PRETEXT INTEGRATION (VIA NPM)

**Install:** `npm install @chenglou/pretext`

Pretext is Cheng Lou's text-measurement library (44.6k stars). Use its `prepare`/`layout`/`prepareWithSegments`/`layoutWithLines` functions as the measurement engine inside React component wrappers.

**Reference repo (clone for effect patterns only):**
```bash
git clone https://github.com/pablostanley/typexperiments.git references/typexperiments
```
Read its Morph/Explode effect code — we implement similar effects as React components using `@chenglou/pretext` for measurement.

### 7.1 — Morph (`components/pretext/Morph.tsx`)

Takes `phrases: string[]`. Uses `@chenglou/pretext`'s measurement to compute per-character positions at both source and target phrase. Interpolates on requestAnimationFrame.

**Character matching:** index-based (not letter-based) — cleaner for "You dream." → "We build." with low character overlap.

**Fallback:** if `prefers-reduced-motion` or canvas fails, opacity crossfade.

```ts
type MorphProps = {
  phrases: string[];       // ['You dream.', 'We build.']
  fontSize?: number;       // 104 desktop, 64 mobile
  dwellMs?: number;        // 4000
  morphMs?: number;        // 800
  fontFamily?: string;     // 'Prata'
  color?: string;          // cream
}
```

### 7.2 — Explode (`components/pretext/Explode.tsx`)

Wraps text. On hover, each char scatters (random translateX/Y 0-8px + rotate 0-15°) with 20ms sequential delay, reassembles after 400ms on hover-out. Framer Motion `motion.span` per char.

### 7.3 — Typewriter (`components/pretext/Typewriter.tsx`)

Wraps text. On scroll-into-view (IntersectionObserver threshold 0.3, `once: true`), splits into characters, animates each: opacity 0→1 + translateY 4px→0, 200ms ease-out, 50ms stagger. Preserves spaces. Respects `prefers-reduced-motion`.

```ts
type TypewriterProps = {
  text: string;
  className?: string;
  staggerMs?: number;      // 50
  durationMs?: number;     // 200
  threshold?: number;      // 0.3
}
```

---

## § 8 — ASSET REGISTRY

### 8.1 — MJ images

**Source directory:** `C:\dev\imageshero\mj\non upscaled\`
(Note: folder name contains a SPACE. Use quotes in commands.)
**Destination:** `public/images/{hero,service-web,service-automation,cta,footer}/`

| Source filename | Dest subfolder | Aspect |
|---|---|---|
| `hero-FINAL.png` | `hero/` | 21:9 |
| `service-web-FINAL.png` | `service-web/` | 4:5 |
| `service-automation-FINAL.png` | `service-automation/` | 4:5 |
| `contact-FINAL.png` | `cta/` | 21:9 |
| `footer-texture-FINAL.png` | `footer/` | 21:9 |

Keep filenames as-is during copy.

### 8.2 — fal Premise objects

**Source:** `C:\dev\imageshero\fal\`
**Destination:** `public/images/premise/`

12 PNG files, all transparent, ~1024×1024:
```
premise-book-stack.png        premise-film-roll.png        premise-toy-car.png
premise-camera-lens.png       premise-ink-bottle.png       premise-typewriter-key.png
premise-compass.png           premise-postage-stamp.png    premise-whiskey-glass.png
premise-dried-orange.png      premise-film-negative.png    premise-wildflower.png
```

**Keep `premise-` prefix.** Do NOT rename.

### 8.3 — Fonts

**Source:** `C:\dev\luminfaber-fonts\` (9 .woff2 files pre-staged by user)
**Destination:** `public/fonts/`

If any file missing, STOP. Report which. Do NOT fall back to CDN — Fontshare/Google URLs are unreliable.

---

## § 9 — TECH STACK

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "@chenglou/pretext": "latest",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

**NOT in Phase A:** `@supabase/supabase-js`, `resend` — Phase B only.

**`next.config.js`:**
```js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: { optimizePackageImports: ['framer-motion', 'lucide-react'] },
};
```

---

## § 10 — BACKEND (MOCKED IN A, REAL IN B)

### 10.1 — Phase A MOCK `/api/contact`

```ts
// app/api/contact/route.ts
export async function POST(req: Request) {
  const data = await req.json();

  if (!data.name || !data.email || !data.message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // TODO(Phase B): Replace with Supabase insert + Resend email
  console.log('[CONTACT FORM — MOCK]', {
    timestamp: new Date().toISOString(),
    ...data,
  });

  await new Promise(r => setTimeout(r, 600)); // simulate latency

  return Response.json({ success: true });
}
```

### 10.2 — Phase A `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=PENDING
SUPABASE_SERVICE_ROLE_KEY=PENDING
RESEND_API_KEY=PENDING
RESEND_FROM_EMAIL=contact@luminfaber.com
RESEND_TO_EMAIL=lokavya12@gmail.com
```

### 10.3 — Phase B (specced here, NOT executed in Phase A)

INTEGRATIONS.md (generated at end of Phase A per § 13) documents:
- Supabase project creation + schema SQL + env vars
- Mock handler swap for real Supabase + Resend code
- Resend account + DNS verification
- Cal.com username + event type
- GitHub push + Vercel connect + env vars + deploy
- Cloudflare DNS A record
- End-to-end verification

### 10.4 — SEO metadata (Phase A)

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://luminfaber.com'),
  title: 'Luminfaber — A design agency for companies that care how things look',
  description: 'We build editorial-grade websites and AI automations. Jaipur-based, global. Two-week projects, ongoing partnerships.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Luminfaber',
    description: 'A design agency for companies that care how things look.',
    url: 'https://luminfaber.com',
    siteName: 'Luminfaber',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

**JSON-LD in layout.tsx:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Luminfaber',
      url: 'https://luminfaber.com',
      description: 'A design agency for companies that care how things look.',
      address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressCountry: 'IN' },
    })
  }}
/>
```

Also generate `app/sitemap.ts` + `app/robots.ts` (standard Next.js patterns).

---

## § 11 — AGENT TEAMS WORKTREE SPLIT

5 worktrees, all Opus 4.7 xhigh, CLI terminal only.

### Worktree A — Foundation (Phase 1, solo)
**Scope:** Next.js setup, tokens, fonts, layout primitives, motion primitives.

**Files:**
- `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`
- `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (shell), `app/not-found.tsx`
- `lib/fonts.ts`, `lib/utils.ts`
- `public/fonts/*` (copy from `C:\dev\luminfaber-fonts\`)
- `components/layout/{Wordmark,Nav,GrainOverlay,CustomCursor}.tsx`
- `components/ui/{Button,Container}.tsx`
- `components/motion/{KenBurns,SectionReveal,LinkUnderline}.tsx`

**Blocks:** B/C/D can't start until A verifies.

### Worktree B — Hero + Premise (Phase 2, parallel)
- `components/sections/{Hero,Premise}.tsx`
- `components/pretext/{Morph,Typewriter}.tsx`
- `components/premise/{CollageObject,SVGMarks}.tsx`
- `public/images/hero/*`, `public/images/premise/*`

### Worktree C — Services + Team (Phase 2, parallel)
- `components/sections/{ServiceWeb,ServiceAutomation,WhoWeAre}.tsx`
- `public/images/service-web/*`, `public/images/service-automation/*`

### Worktree D — CTA + Footer + Deep (Phase 2, parallel)
- `components/sections/{CTA,Footer}.tsx`
- `components/pretext/Explode.tsx`
- `components/ui/ContactForm.tsx`
- `components/layout/Footer.tsx`
- `app/{work,command-center,book}/page.tsx`
- `public/images/cta/*`, `public/images/footer/*`

### Worktree E — Synthesizer (Phase 3)
- Compose `app/page.tsx`
- Wire Framer Motion `whileInView` across sections
- Build mock `/api/contact` per § 10.1
- `.env.local` per § 10.2
- `app/sitemap.ts`, `app/robots.ts`, metadata + JSON-LD per § 10.4
- `npm run build` — resolve type errors
- `/ultrareview` full codebase
- Chrome DevTools QA (§ 12 Phase 4)
- Generate `INTEGRATIONS.md` per § 13

---

## § 12 — PHASE A EXECUTION PLAN

**Phase 1 — Foundation (Worktree A, ~2 hrs)**

```
 Set up Luminfaber Next.js 14 foundation per § 3-4 + § 9 of this doc.
Copy pre-staged fonts from C:\dev\luminfaber-fonts\ to public/fonts/.
Build layout primitives + motion primitives per Worktree A scope.
Install @chenglou/pretext via npm.
```

**Verify before Phase 2:** `npm run dev` shows cream page, wordmark + nav visible (desktop: 3 links, mobile: 1 link), grain overlay at 3%, custom cursor working desktop + hidden on touch.

**Phase 2 — Parallel B/C/D (~4-6 hrs)**
Launch 3 Agent Teams. Non-overlapping file scopes. Each copies required images from `C:\dev\imageshero\mj\non upscaled\` or `C:\dev\imageshero\fal\`.

**Phase 3 — Synthesize + mock backend (~2-3 hrs)**
Compose `app/page.tsx`. Wire motion. Mock API. Metadata. Sitemap.

**Phase 4 — Chrome DevTools QA (~2-4 hrs)**

```
Chrome DevTools MCP:
1. npm run dev port 3000
2. Screenshot every section at 1440×900 and 390×844
3. Compare against § 2 anchors:
   - Hero: Las Veras register
   - Premise: Yosi Negrín energy + typewriter firing
   - Services: Aspect Studio split
   - CTA: BSTN restraint
4. Iterate: fix → re-screenshot → compare until match
5. Lighthouse mobile — 90+ perf, 95+ a11y, 95+ SEO
6. Test mock form: verify console.log + success UI
7. Save screenshots to qa-screenshots/
```

**Phase 5 — INTEGRATIONS.md + commit (~30 min)**

---

## § 13 — `INTEGRATIONS.md` DELIVERABLE

Generated at repo root. Phase B playbook. User follows top to bottom, 1-2 hrs to live.

**Required sections:**

1. **Preconditions** — accounts needed (Supabase, Resend, Cal.com, Vercel, Cloudflare, GitHub)
2. **Step 1: Supabase** — create `luminfaber-prod` (ap-south-1), copy URL + service role key to `.env.local`, run schema SQL (inline)
3. **Step 2: Swap mock for real** — `npm install @supabase/supabase-js resend`, replace `/api/contact` (full code block)
4. **Step 3: Resend** — account, verify domain, DNS records for Cloudflare (exact values), API key
5. **Step 4: Cal.com** — username `luminfaber`, event type `30min`, verify URL
6. **Step 5: GitHub + Vercel** — push, connect, env vars, deploy
7. **Step 6: Cloudflare DNS** — A record for `@` and `www` → Vercel
8. **Step 7: Production verification** — form e2e, email delivery, Cal.com iframe, Lighthouse prod
9. **Step 8: Post-launch TODOs** — favicon, og-image, real photos, real case studies, Plausible
10. **Troubleshooting** — common failures + fixes

Tone: procedural, no fluff.

---

## § 14 — VERIFICATION CHECKLIST (Phase A ship gate)

**Design:**
- [ ] Hero matches Las Veras
- [ ] Premise: typographic collage + typewriter fires on scroll
- [ ] Services: magazine-spread mirrors
- [ ] Who We Are: scrapbook + 3 name cards (Bhomik 70%)
- [ ] CTA: BSTN restraint
- [ ] Footer: texture + 3-col + bottom strip
- [ ] Cream bg throughout

**Motion:**
- [ ] Hero morph cycles
- [ ] Ken Burns all section images
- [ ] Grain visible 3%
- [ ] Entrance reveals stagger
- [ ] Custom cursor desktop only
- [ ] CTA explode on hover
- [ ] Link underlines grow
- [ ] Premise typewriter fires ONCE (doesn't re-animate)
- [ ] `prefers-reduced-motion` respected

**Typography:**
- [ ] Prata 400 only, 32px+, never italic
- [ ] EB Garamond italic-only (sub-headline + `<em>`)
- [ ] Switzer never above 32px
- [ ] Fragment Mono always uppercase + tracked

**A11y:**
- [ ] No eyebrow in amber (uses `--fg-muted` or `--accent-amber-dk`)
- [ ] All text ≥ 4.5:1 contrast
- [ ] Keyboard nav works
- [ ] Cursor gated behind hover+pointer query

**Perf (Lighthouse mobile):**
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95

**Cross-device:**
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile iOS Safari / Android Chrome
- [ ] Mobile nav = "Book a call" only
- [ ] No horizontal scroll mobile
- [ ] Hero uses `svh`

**Backend (mocked):**
- [ ] Form posts to mock `/api/contact`
- [ ] Console.log + success UI works
- [ ] `/book` iframe loads (Cal 404 expected)
- [ ] `.env.local` has PENDING

**Deliverables:**
- [ ] `INTEGRATIONS.md` at repo root
- [ ] Git committed locally (+ pushed if GitHub MCP auth'd)
- [ ] `qa-screenshots/` folder

---

## § 15 — REPORTING CADENCE

Every ~20 min during Phase A, report:

```
### Update [HH:MM]
- Done: [1-2 bullets]
- Doing: [1-2 bullets]
- Next: [1-2 bullets]
```

Nothing more.

**STOP AND ASK USER FOR:**
- Missing assets at source paths
- Genuine spec ambiguity (rare — doc is tight)
- Hard failures (npm install breaks, fonts corrupted)

**DO NOT ASK ABOUT:**
- Which 6-8 fal objects to include (pick balanced set)
- Exact placement of objects (use suggestions + judgment)
- Minor copy variations
- GitHub push (do it if MCP auth'd, skip silently otherwise)

---

## § 16 — THE PASTE (copy between the fences into Claude Code)

```
You are building the complete Luminfaber agency website (luminfaber.com).
Full spec is in luminfaber-FINAL-megaprompt-v2.md — attached to this
message (or pasted above). Treat that doc as the single source of truth.
No reinterpretation, no substitutions. If a decision conflicts with the
doc, ASK me before proceeding.

ENVIRONMENT (already prepped by user — do NOT re-do):
- pwd is C:\dev\luminfaber\ (directory and git repo already exist — do NOT mkdir or git init)
- Font staging folder C:\dev\luminfaber-fonts\ has 9 .woff2 files
- Antigravity settings.json has Agent Teams flag + opus-4-7 + xhigh
- MJ image assets at C:\dev\imageshero\mj\non upscaled\ (5 PNG files)
- fal Premise assets at C:\dev\imageshero\fal\ (12 premise-*.png files)

EXECUTION MODE: FULLY AUTONOMOUS PHASE A LOCAL BUILD.
Phase B (real integrations) is SEPARATE — do NOT run Phase B until I
explicitly say "integrate and ship."

Phase A steps (execute without asking permission, report per § 15):

1. VERIFY ENVIRONMENT
   - Confirm pwd is C:\dev\luminfaber (do NOT cd elsewhere)
   - DO NOT run mkdir luminfaber. DO NOT run git init. Repo exists.
   - If pwd is somewhere else, STOP and tell me.

2. SKILLS (install to ~/.claude/skills/ if missing, skip if present)
   - anthropic/frontend-design: git clone https://github.com/anthropics/skills.git _tmp, cp -r _tmp/skills/frontend-design ~/.claude/skills/, rm -rf _tmp
   - nextlevelbuilder/ui-ux-pro-max-skill: npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
   - obra/superpowers: /plugin marketplace add obra/superpowers-marketplace, /plugin install superpowers@superpowers-marketplace

3. REFERENCES (read-only, inside working dir)
   mkdir references
   git clone https://github.com/pablostanley/typexperiments.git references/typexperiments
   (NOT chenglou/pretext — we install that via npm instead)

4. NEXT.JS SCAFFOLD
   Install Next.js 14 with TypeScript strict + Tailwind + App Router + ESLint.
   Install dependencies from § 9 INCLUDING @chenglou/pretext via npm.
   Configure next.config.js with AVIF/WebP per § 9.
   DO NOT install @supabase/supabase-js or resend — Phase B only.

5. FONTS — copy from C:\dev\luminfaber-fonts\ to public/fonts/
   Expected 9 .woff2 files per § 3.2. If any missing, STOP and report.
   Wire via next/font/local in lib/fonts.ts per § 3.2.
   DO NOT fall back to CDN — unreliable.

6. ASSETS — copy from source paths (note the SPACE in "non upscaled"):
   MJ images (all .png, not .jpg):
     Copy-Item "C:\dev\imageshero\mj\non upscaled\hero-FINAL.png" -Destination "public\images\hero\"
     Copy-Item "C:\dev\imageshero\mj\non upscaled\service-web-FINAL.png" -Destination "public\images\service-web\"
     Copy-Item "C:\dev\imageshero\mj\non upscaled\service-automation-FINAL.png" -Destination "public\images\service-automation\"
     Copy-Item "C:\dev\imageshero\mj\non upscaled\contact-FINAL.png" -Destination "public\images\cta\"
     Copy-Item "C:\dev\imageshero\mj\non upscaled\footer-texture-FINAL.png" -Destination "public\images\footer\"
   fal Premise (keep premise- prefix):
     Copy-Item "C:\dev\imageshero\fal\premise-*.png" -Destination "public\images\premise\"
   (Create destination dirs as needed.)
   If any source missing, STOP and report which.

7. BUILD (Agent Teams per § 11)
   Phase 1: Worktree A solo. Verify npm run dev → cream page with wordmark,
   nav (desktop: 3 links, mobile: "Book a call" only), grain 3%, custom cursor
   working on desktop / hidden on touch.
   Phase 2: Launch B/C/D parallel, Opus 4.7 xhigh, non-overlapping scopes.
   Phase 3: Worktree E synthesizes — composes app/page.tsx, wires Framer Motion
   whileInView, builds MOCK /api/contact per § 10.1, .env.local PENDING per
   § 10.2, sitemap + robots + metadata + JSON-LD per § 10.4.

8. PHASE A MOCK BEHAVIOR:
   - /api/contact: console.log + return { success: true }
   - .env.local: all PENDING
   - /book iframe: placeholder URL (will 404 in dev, fine)
   - No Supabase, no Resend, no Vercel deploy
   - Git commits locally
   - GitHub push: do ONLY if GitHub MCP is authenticated. If not, skip silently
     and note in final report. Remote is techlogist1/luminfaber (fresh repo).
     If repo doesn't exist yet and MCP is auth'd, create it first via:
     gh repo create techlogist1/luminfaber --public --source=. --remote=origin

9. QA (Phase 4 of § 12)
   npm run dev port 3000. Chrome DevTools MCP screenshot every section at
   1440×900 and 390×844. Compare § 2 anchors. Iterate until match.
   Save to qa-screenshots/. Run Lighthouse mobile. Verify § 14 checklist.

10. DELIVERABLE: INTEGRATIONS.md at repo root per § 13.

11. HANDOFF — report:
    ```
    Phase A complete. Local build running on localhost:3000.

    ### Lighthouse mobile
    Performance: XX | Accessibility: XX | Best Practices: XX | SEO: XX

    ### Deliverables
    - Full frontend at C:\dev\luminfaber\ (git committed)
    - GitHub: [pushed / not pushed — reason]
    - INTEGRATIONS.md at repo root
    - Screenshots in qa-screenshots/

    ### What's mocked (expected)
    - /api/contact logs to console, returns success
    - .env.local has PENDING placeholders
    - /book Cal.com iframe 404s (event not yet created)

    Ready for user review. Say "integrate and ship" when ready for Phase B.
    ```
    Then STOP.

CRITICAL AESTHETIC GUARDRAILS (§ 2 — do not drift):
- Target: 2026 editorial remix (Las Veras / Aspect / BSTN / Perplexity-ad)
- NOT target: terminal ASCII, newspaper/museum, dark palette, parallax,
  magnetic buttons, cursor trails, Comet-style rounded containers

CRITICAL TYPOGRAPHY RULES (§ 3.2):
- Prata: 400 weight only, 32px+ only, NEVER italic
- EB Garamond: italic-only (sub-headline + <em>)
- No font-weight ≥ 500 on Prata
- Fragment Mono eyebrows use var(--fg-muted), NEVER amber

CRITICAL MOTION RULES (§ 6):
- 8 IN, 3 whitelisted kinetic text moments (morph, typewriter, explode)
- prefers-reduced-motion on ALL motion
- Custom cursor gated @media (hover: hover) and (pointer: fine)
- Hero uses svh

CRITICAL "WHO OWNS WHAT":
- @chenglou/pretext is a third-party npm library (Cheng Lou's text layout engine).
- Install via npm install @chenglou/pretext. DO NOT clone chenglou/pretext as reference.
- typexperiments IS cloned read-only as effect-pattern reference.
- There is no user-owned "pretext" repo. The repo for this project is techlogist1/luminfaber.

Start Phase 1 Worktree A Foundation immediately. Execute per spec. Do not enter plan mode.
```

---

## § 17 — END

Paste § 16 after the pre-flight prompt confirms environment is ready. Walk away 3-6 hrs. Come back to built site. Say "integrate and ship" → follow INTEGRATIONS.md → live in 1-2 hrs.
