# SKY AGRO — Website Build Brief

## What this is

Marketing + catalogue site for **SKY AGRO**, a UK supplier of brewing ingredients, hygiene chemicals, processing aids, and brewing equipment. The company has three divisions: **SKY MALT** (ingredients), **SKY LABS** (chemicals), **SKY TECH** (equipment).

Audience: UK and international breweries — technical buyers, brewmasters, procurement. Tone is professional, plain-spoken, trade-focused. Not consumer-y, not flashy. Always use UK english.

## Goal for this build

1. **Replicate the mockups in `/mockups/`** as the starting point for layout, colour, and overall composition.
2. **Then build out the rest of the site** using the same design system — product category pages, product detail pages, blog index, blog post template, division pages (SKY MALT / SKY LABS / SKY TECH), legal pages (privacy, T&Cs, cookies, chemical safety).
3. If a mockup detail is ambiguous, match the pattern from the nearest comparable mockup rather than inventing something new. Flag genuinely unresolved questions in a `QUESTIONS.md` file rather than guessing in code.

### Designer latitude — important

The mockups were made by someone who is not a professional designer. Treat them as a **directional brief, not a pixel-perfect spec**. You have explicit permission — and are encouraged — to improve on them where your judgement says the result will be better, specifically on:

- **Typography** — sizing, hierarchy, line-height, letter-spacing, weight pairings. If a mockup heading looks cramped or awkwardly sized, fix it. Follow the type scale defined in this brief (below) rather than eyeballing from the PNGs.
- **Spacing and rhythm** — vertical spacing between sections, padding inside cards, gutter widths. If the mockup feels tight or uneven, loosen it using the spacing scale.
- **Visual hierarchy** — if a section's eyebrow / heading / subheading / body relationship feels flat, adjust weight or size contrast so the eye moves correctly.
- **Alignment and grid** — if columns don't line up in the mockup, make them line up in code.
- **Mobile layout** — the mockups are desktop-only. Mobile is yours to design well (guidance below).
- **Accessibility fixes** — if a mockup colour combination fails WCAG AA, darken / lighten until it passes and note the change.

What you should **not** change without asking: the brand colour palette, the core logo / wordmark treatment, the overall section order, the presence of specific content (e.g. don't delete the timeline section because you'd lay it out differently — redesign it).

When you make a meaningful departure from the mockup, add a one-line note to `CHANGES.md` explaining what and why (e.g. "Home hero: reduced H1 from 56px to clamp(2.5rem, 4vw + 1rem, 3.5rem) — original was cramped on tablet"). Keep it brief.

## Stack — hard constraints

- **Plain HTML, CSS, vanilla JavaScript.** No React, no Vue, no Svelte, no frameworks.
- **No build step** unless absolutely necessary. No Webpack, no Vite, no bundlers. If you need to split CSS, use multiple `<link>` tags or a single `@import`.
- **No CSS frameworks** (no Tailwind, no Bootstrap). Write CSS from scratch.
- **No jQuery.** Vanilla JS only.
- **Minimal JS.** Only use JS where HTML/CSS can't do the job — mobile nav toggle, tabs on the home page ("New / Deals / Top Sellers"), carousel arrows, form validation, subscribe form submit. Prefer CSS solutions (`:checked`, `:target`, `:has()`) where they're reasonable.
- Progressive enhancement: site must be usable and look correct with JS disabled.

## File structure

```
/
  index.html
  about.html
  contact.html
  blog.html
  blog/<slug>.html
  /products/
    (category and product pages as we build them out)
  /legal/
    privacy.html
    terms.html
    cookies.html
    chemical-safety.html
  /css/
    reset.css         — modern CSS reset
    tokens.css        — colour, type, spacing variables
    base.css          — typography, links, buttons, forms
    layout.css        — header, footer, container, grid helpers
    components.css    — cards, hero, tabs, timeline, etc
    pages.css         — page-specific overrides only if needed
  /js/
    nav.js            — mobile nav + dropdowns
    tabs.js           — home page product tabs
    forms.js          — contact + subscribe validation
  /assets/
    /images/          — photography and hero images
    /logos/           — SKY AGRO, SKY MALT, SKY LABS, SKY TECH
    /icons/           — inline SVG preferred, but file-based ok for large ones
  /mockups/           — reference PNGs (do not ship these)
```

## Design system — extracted from the mockups

### Colours

```css
:root {
  /* Brand */
  --color-green-dark:  #0F5132;  /* top utility bar, primary brand green */
  --color-green:       #1B7A3E;  /* logo wordmark, "Home" active link, headings accent */
  --color-green-deep:  #093B21;  /* "Everything started with Malt" band background */

  /* Accents */
  --color-gold:        #C79A5B;  /* "ABOUT SKY AGRO" eyebrow text, Subscribe button, View all articles button */
  --color-orange:      #E8703A;  /* "Discover our Malts" CTA on hero */

  /* Neutrals */
  --color-cream:       #FAF4E8;  /* main page background, product card backgrounds */
  --color-cream-soft:  #F5EEDE;  /* alternating section background */
  --color-ink:         #111111;  /* body text and headings on light */
  --color-ink-soft:    #555555;  /* secondary text, descriptions */
  --color-rule:        #E6DFCE;  /* hairlines, card borders */
  --color-white:       #FFFFFF;  /* product card interior, form fields */

  /* Dark footer */
  --color-footer-bg:   #1F1F1F;
  --color-footer-text: #FFFFFF;
  --color-footer-muted:#9A9A9A;  /* copyright and bottom links */

  /* Category tag colours on blog cards */
  --color-tag-tech:    #1F5E9E;  /* TECHNICAL GUIDE */
  --color-tag-news:    #1B7A3E;  /* INDUSTRY NEWS */
  --color-tag-new:     #B8572C;  /* NEW PRODUCTS */
}
```

### Typography

**Root setup**

- Do **not** set a pixel `font-size` on `:root` or `html`. Leave it at the browser default so users who set a larger default get larger text. Use `rem` everywhere downstream; `1rem = 16px` for the user's default.
- Body `font-size: 1rem` (16px), `line-height: 1.6`.
- **No text below `0.8125rem` (13px) anywhere on the site.** Legal / copyright in the footer is the absolute floor. Form helper text, meta, captions — all 0.875rem minimum.
- **Use `rem` for every font-size, margin, padding, gap, max-width and border-radius value.** The only exceptions: `1px` borders, `100%` widths, viewport-unit values inside `clamp()`, and `line-height` (unitless).

**Font family: Montserrat** (local variable font). Files: `assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf` (normal) and `assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf` (italic). Load via `@font-face` in `css/base.css` with `font-weight: 100 900` and `font-display: swap`. No external network request needed. Fallback stack: `'Montserrat', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

**Type scale** — use these exact tokens, don't improvise one-off sizes.

```css
:root {
  /* Font sizes — fluid between mobile and desktop */
  --fs-eyebrow:   0.8125rem;                              /* 13px, fixed */
  --fs-small:     0.875rem;                               /* 14px, fixed */
  --fs-body:      1rem;                                   /* 16px, fixed */
  --fs-body-lg:   1.125rem;                               /* 18px, intro paragraphs */
  --fs-h5:        clamp(1.125rem, 0.25vw + 1.0625rem, 1.25rem);  /* 18–20px — card titles */
  --fs-h4:        clamp(1.25rem,  0.5vw  + 1.125rem,  1.5rem);   /* 20–24px */
  --fs-h3:        clamp(1.5rem,   1vw    + 1.25rem,   2rem);     /* 24–32px */
  --fs-h2:        clamp(1.875rem, 2vw    + 1.375rem,  2.5rem);   /* 30–40px */
  --fs-h1:        clamp(2.25rem,  3vw    + 1.5rem,    3.5rem);   /* 36–56px */

  /* Line heights */
  --lh-tight:     1.1;   /* large display headings */
  --lh-snug:      1.25;  /* H2 / H3 */
  --lh-normal:    1.4;   /* H4 / H5 / small headings */
  --lh-body:      1.6;   /* body copy */

  /* Weights */
  --fw-regular:   400;
  --fw-medium:    500;
  --fw-semibold:  600;
  --fw-bold:      700;

  /* Letter spacing */
  --ls-tight:     -0.01em;  /* large headings */
  --ls-normal:    0;
  --ls-wide:      0.08em;   /* eyebrow labels */
  --ls-wider:     0.12em;   /* uppercase utility-bar links */
}
```

**Applied hierarchy**

| Element | Size | Weight | Line-height | Letter-spacing | Case |
|---|---|---|---|---|---|
| H1 (hero / page title) | `--fs-h1` | 700 | `--lh-tight` | `--ls-tight` | sentence case (UPPERCASE only when mockup explicitly shows it, e.g. "FROM FIELD TO GLASS") |
| H2 (section) | `--fs-h2` | 700 | `--lh-snug` | `--ls-tight` | sentence case |
| H3 (subsection) | `--fs-h3` | 700 | `--lh-snug` | normal | sentence case |
| H4 | `--fs-h4` | 600 | `--lh-normal` | normal | sentence case |
| H5 / card title | `--fs-h5` | 600 | `--lh-normal` | normal | sentence case |
| Body | `--fs-body` | 400 | `--lh-body` | normal | — |
| Body large (intro paragraphs, hero lede) | `--fs-body-lg` | 400 | `--lh-body` | normal | — |
| Small / meta | `--fs-small` | 400 | 1.5 | normal | — |
| Eyebrow label | `--fs-eyebrow` | 600 | 1 | `--ls-wide` | UPPERCASE |
| Utility bar nav | `--fs-small` | 500 | 1 | normal | sentence case |

**Harmony rules**

- Body copy sits at `1rem` / `--lh-body`. Everything else is tuned so that a heading + its following paragraph feel like they belong to the same family — no 48px heading jammed against 14px body.
- Between any two adjacent type levels, the size ratio should be roughly 1.2–1.33. The scale above is already tuned this way; don't add intermediate one-off sizes.
- Headings get tighter line-heights (`--lh-tight` / `--lh-snug`), body gets looser (`--lh-body`).
- Max measure for body text: `65ch` (use `max-width: 65ch` on long text blocks so lines don't stretch across the full container on wide screens).
- Paragraph spacing: `margin-block: 0 1em` on `<p>`, using em so it scales with each block's font-size.
- Heading spacing: `margin-block-start: 2em; margin-block-end: 0.5em` — again em-based, then the first heading in a section gets `margin-block-start: 0` via `:first-child`.

**Inter specifics**

- Enable tabular figures on anything numeric that sits in a column (prices, stats, dates in blog meta): `font-variant-numeric: tabular-nums;`.
- Don't use Inter's default fractions or stylistic sets unless you have a specific reason.

### Spacing

Base unit: `0.25rem` (4px). **Use the token scale — don't write arbitrary rem values.**

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.5rem;    /* 24px */
  --space-6:   2rem;      /* 32px */
  --space-7:   3rem;      /* 48px */
  --space-8:   4rem;      /* 64px */
  --space-9:   6rem;      /* 96px */
  --space-10:  8rem;      /* 128px */

  /* Section rhythm — use these for the vertical padding on <section> */
  --section-pad-y:   clamp(3rem, 5vw + 1.5rem, 6rem);    /* 48px → 96px */
  --section-pad-y-lg: clamp(4rem, 7vw + 2rem,  8rem);    /* 64px → 128px */

  /* Container */
  --container-max:   80rem;      /* 1280px */
  --container-pad-x: clamp(1rem, 3vw, 1.5rem);  /* 16px → 24px */

  /* Radii */
  --radius-sm: 0.25rem;   /* 4px — buttons, inputs */
  --radius-md: 0.5rem;    /* 8px — cards */
  --radius-lg: 0.75rem;   /* 12px — larger panels */
}
```

- Section vertical padding uses `--section-pad-y` by default. Hero sections and major CTA bands use `--section-pad-y-lg`.
- Cards: internal padding `--space-5` (24px). Gap between cards in a grid: `--space-5` mobile, `--space-6` desktop.
- Form inputs: `padding: var(--space-3) var(--space-4)` (12px / 16px), min-height `2.75rem` (44px) for touch targets.
- Buttons: `padding: var(--space-3) var(--space-5)` for default, min-height `2.75rem`.
- Never use negative margins to fix a layout. If it wants a negative margin, the structure is wrong.

### Components

All component dimensions must use tokens (`--space-*`, `--radius-*`, `--fs-*`) rather than hardcoded values.

- **Buttons** come in four variants. All share: `min-height: 2.75rem`, `padding: var(--space-3) var(--space-5)`, `border-radius: var(--radius-sm)`, `font-weight: 600`, `font-size: var(--fs-body)`, no uppercase by default.
  - Primary green (`Talk to our team`, `Learn more about us`, `Read more` on SKY MALT card) — solid `--color-green`, white text.
  - Orange hero CTA (`Discover our Malts`) — solid `--color-orange`, white text, arrow icon on the right.
  - Gold secondary (`Subscribe`, `View all articles`, `Get in Touch`) — solid `--color-gold`, white text.
  - Ghost (`Learn more about us` on About hero) — transparent, 1px `--color-green` border, green text.
- **Cards** (product, blog, division) — white background, 1px `--color-rule` border, `border-radius: var(--radius-md)`, subtle `box-shadow: 0 0.0625rem 0.125rem rgba(0,0,0,0.04)` at rest, stronger shadow on hover. Image on top, text block below with `padding: var(--space-5)`.
- **Eyebrow label** — short gold em-dash + uppercase gold text, sits above section H2s with `margin-bottom: var(--space-3)`. Build as one reusable component.
- **Section dividers** between numbered steps on "What Sets SKY Apart" — thin 1px `--color-gold` horizontal rule under each number, width `3rem`.
- **Timeline** (Our Story band) — vertical 1px `--color-gold` line with dot markers, year + heading + body right of each marker. Inside the deep green band, text is white / cream. Each entry spaced with `--space-6` vertical gap.
- **Forms** — labels above inputs, labels in `--fs-small` `--fw-medium`, inputs full-width, min-height `2.75rem`, padding `var(--space-3) var(--space-4)`, 1px `--color-rule` border, `border-radius: var(--radius-sm)`, white background, focus state uses `--color-green` outline with `outline-offset: 0.125rem`. Error states use a red token — add `--color-error: #B42318` to tokens if needed.

### Header (see `header-mockup.png`)

- **Row 1 — utility bar:** dark green `--color-green-dark`, white text, 14px. Left: Spanish flag + "Comprar en España", then About us / Blog / Services / Catalogues / T&Cs. Right: "Contact us", mail icon + email, phone icon + number.
- **Row 2 — main bar:** white, 80px tall. Logo left, big search bar centre (flex-grow, green icon button on the right end of the search), then account / wishlist / cart.
- **Row 3 — category nav:** white with a bottom rule. Links: Home, Brewing Ingredients ⌄, Chemical Products ⌄, Brewing & Beverage Equipment ⌄, One-way Kegs ⌄. Active link is green. Dropdowns open on hover (desktop) and click (mobile).

### Footer (see `footer-mockup.png`)

- Dark `--color-footer-bg`, white text. Four columns: logo + address, Company, Customer Service, Stay in touch (email input + gold Subscribe button, social icons below).
- Thin divider, then bottom row: copyright left, legal links right, all in `--color-footer-muted`.

## Page-specific notes

### Home (`home-mockup-1/2/3.png`)

Sections in order:
1. Hero — full-bleed image, overlaid text right-aligned on image, orange CTA.
2. "Our Product Selection" — 4×2 grid of category cards on cream.
3. "New Offers" tabs — New / Deals / Top Sellers, 4-up product row, arrow controls top right. JS tab switcher.
4. "Three Divisions. One Company." — 3-column band with the three sub-brand logos and read-more buttons colour-matched to each division (green, navy blue, dark grey).
5. "About SKY AGRO" — two-column: copy + image.
6. "Find Us on Social Media" — two-column: image + copy.
7. "News and know-how" — 4-up blog card row with coloured category tags, gold "View all articles" button.
8. Footer.

### About (`about-us-mockup.png`)

1. Hero strip — cream background, copy left, image right, "ABOUT SKY AGRO" eyebrow, primary + ghost buttons.
2. "What Sets SKY Apart" — 3-column numbered features with gold icons and rules.
3. "Trusted by Brewers across the World" — image left, copy right, on cream-soft.
4. "Everything started with Malt." — **deep green band**, white type, timeline on the right with years 2024 / 2025 / Late 2025 / Today.
5. "Three Divisions, One Company" — 3 division cards.
6. "Our Facility in Daventry" — two passes, image left / copy right, then image right / copy left (lorem-ipsum-looking text in the mockup — use placeholder and flag in QUESTIONS.md).
7. "Enough About Us. Let's Talk About You." — dark band CTA block.
8. Footer.

### Contact (`contact-us-mockup.png`)

1. Hero — full-bleed beer-pour image with green gradient left, eyebrow + H1 + short copy overlay.
2. "Give us a Call" — two-column: four department contact blocks (Orders, Chemicals, Brewing ingredients, Equipment) left, form right (name / phone / email / company / message / reCAPTCHA placeholder / Send button).
3. Map + company details — map iframe placeholder left, address + hours + delivery + legal numbers right.
4. Footer.

Form note: real submission endpoint TBD — wire the form to `action="#"` with a JS handler that prevents default, validates, and shows a success state. Leave a `// TODO: wire to backend` comment.

## Build order

1. Set up `css/tokens.css`, `reset.css`, `base.css` and a basic layout shell.
2. Build **header** and **footer** as standalone partials you include in every page. Since there's no build step, either (a) duplicate the HTML and keep them in sync, or (b) inject via a small `header.js` / `footer.js` that writes innerHTML on page load. Go with (b) — one source of truth, no framework.
3. Build **home** page section by section, matching mockups.
4. Build **about** and **contact**.
5. Build **blog index** + one example **blog post** template.
6. Build **division pages** (sky-malt, sky-labs, sky-tech) — reuse the home division card styling and expand.
7. Build **product category / product detail** templates.
8. Legal pages last — plain typographic pages, reuse `base.css`.

## Responsive — mobile-first, desktop mockups only

The mockups show desktop. **Design mobile from scratch** — it is not a squashed version of desktop. Mobile matters: most brewery trade buyers will open the site on a phone at some point.

### Approach

- Write CSS mobile-first. Base styles are mobile. Use `min-width` media queries to add tablet / desktop refinements. Never start desktop and strip things away.
- Test at 360px, 390px, 430px (phones), 768px (tablet portrait), 1024px (tablet landscape / small laptop), 1280px+ (desktop).
- Breakpoints (use `em`, not `px`, so they respect user font-size):
  ```css
  /* Tablet and up */     @media (min-width: 40em)  { /* 640px  */ }
  /* Small desktop and up */ @media (min-width: 64em)  { /* 1024px */ }
  /* Large desktop and up */ @media (min-width: 80em)  { /* 1280px */ }
  ```
- No horizontal scroll, ever. Add `overflow-x: hidden` only as a last resort — fix the real cause.

### Mobile layout rules

- **Single column by default.** Multi-column grids (4-up product cards, 3-up divisions, 4-up blog cards) collapse to 1 column on phones, 2 columns from ~40em, full column count from ~64em.
- **Two-column text + image sections stack vertically.** Image first, then text — unless the text is a hero/intro where text should read first.
- **Hero text overlays on images become full-width text blocks *below* the image** on phones (or use a darkening overlay + centred text if the image works cropped). Don't try to fit a 56px headline over a 360px-wide crop of a desktop photo.
- **Tap targets: minimum 2.75rem (44px) in both dimensions.** Links in tight nav lists need `padding` to hit this, not just font-size.
- **No hover-only interactions.** Dropdown menus open on tap, and the top-level link is itself tappable (either opens the menu or goes to the category index — pick one, apply consistently).

### Header on mobile

- Utility bar (top green strip) **hides below 64em**. Its content — Contact / email / phone / Comprar en España — moves into the mobile menu drawer, at the top.
- Main bar collapses to: logo left, search icon (opens full-width search), hamburger right. Account / wishlist / cart icons move into the drawer.
- Category nav becomes a hamburger drawer that slides from the right, full-height, with nested dropdowns expanding in place (accordion-style, not flyouts).
- Drawer must be keyboard-dismissable (Esc), trap focus while open, and return focus to the hamburger button on close.

### Footer on mobile

- Four columns collapse: on tablet, 2×2 grid (logo+address / Company / CustomerService / StayInTouch). On phone, single column, in this order: logo + address, Stay in Touch (subscribe form), Company, Customer Service. Subscribe goes near the top on phones so it's seen without a long scroll.
- Bottom row (copyright + legal links) stacks: copyright on its own line, then links wrapping.

### Type and spacing on mobile

- The `clamp()` values in the type scale already handle heading shrinkage. Don't add mobile overrides unless something looks wrong.
- Reduce section padding via `--section-pad-y` which already scales with viewport — no manual mobile overrides needed.
- Body copy stays at `1rem` (16px) on mobile. **Do not shrink body text below 1rem to fit more content.**
- Card internal padding stays at `--space-5` (24px) on mobile — don't cram it down to 12px. If a card feels cramped, shrink the card's max-width instead.

## Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Every image has meaningful `alt` text (or `alt=""` if purely decorative).
- Forms have real `<label>` elements (the mockup shows labels above inputs — keep that, don't replace with placeholders).
- Keyboard nav: all dropdowns, tabs, and carousels operable without a mouse. Visible focus styles — do not remove outlines without replacing them.
- Colour contrast: verify gold-on-cream for eyebrow labels passes AA for 13px. If marginal, darken the gold slightly for text-only uses while keeping the lighter gold for dividers.
- Skip-to-content link at top of `<body>`.

## Performance

- Montserrat loaded locally via `@font-face` (`font-display: swap`). No Google Fonts request.
- Images: use `<picture>` with WebP + JPEG fallback. Add `loading="lazy"` on anything below the fold. Set explicit `width` / `height` to prevent CLS.
- One CSS file per concern, linked individually — fine for HTTP/2. Don't inline everything.
- No tracking scripts, no analytics yet.

## Things to leave as TODO / placeholder

- Real product data — use 8 category cards and ~8 "new offer" products as shown; stub the rest.
- Blog posts — one real template, the 4 cards on home link to `#` for now.
- Spanish site (`Comprar en España`) — link is a placeholder, don't build it.
- Account / wishlist / cart — icons and counts only, no functionality.
- Search — input and button present, submits to `/search.html?q=...` which can be a stub page saying "Search coming soon".
- reCAPTCHA — visual placeholder only.
- Map — embed Google Maps iframe for Unit C, West March Industrial Estate, Daventry NN11 4SA.

## Don'ts

- **Don't use `px` for font-size, margin, padding, gap, or `max-width`.** Use `rem`, or `clamp()` with rem. `px` is allowed only for 1px borders and inside `rgba()` shadows.
- **Don't use font sizes below `0.8125rem` (13px) anywhere.** No 10px or 11px labels, captions, or legal text.
- **Don't invent one-off sizes** outside the type scale or spacing scale tokens. If you genuinely need a new token, add it to `tokens.css` with a comment explaining why.
- Don't introduce new colours, fonts, or border-radius values that aren't in the tokens above. Same rule — extend tokens, don't hardcode.
- Don't use `!important` to fix specificity — restructure.
- Don't use `<div>` where a semantic element fits.
- Don't set a pixel `font-size` on `:root` / `html` — leave the browser default alone so rem scales with user preference.
- Don't auto-play any video or audio.
- Don't add cookie banners or popups yet — there'll be a separate pass for that.
- Don't commit the mockup PNGs to the deployed site.

## When you're unsure

Write the question in `QUESTIONS.md` and proceed with your best guess, clearly marked with a `<!-- TODO: confirm -->` comment in the HTML. Don't block on me.
