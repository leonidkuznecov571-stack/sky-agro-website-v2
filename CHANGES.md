# CHANGES.md — Departures from mockup / design brief

## Typography

- **Font: switched from Inter (Google Fonts) to Montserrat (local variable font)** — confirmed by client. Loaded via `@font-face` from `assets/fonts/Montserrat/`. No external network request. CLAUDE.md updated accordingly.

## Home — Hero

- **Hero implemented as a 5-slide auto-advancing carousel** rather than the single static malt image in the mockup — actual banner assets (malt, equipment, chemicals, kegs, yeast) supplied in `assets/home/hero-slider/`. Text is baked into the images; malt and equipment slides carry an orange "Discover" / "Explore" CTA button positioned in the lower-right to match the mockup's orange CTA placement.
- **Product category heroes moved onto a shared `product-category-hero` pattern** across ingredients, chemicals, kegs & packaging, and equipment, with a reduced shared height so the category pages open more compactly.
- **Slides 1 and 2 CTA buttons moved upward to sit directly beneath the baked-in copy** — improves alignment with the banner messaging and reduces the feeling that the button is detached from its related text.
- **Mobile: images cropped to 16:9 via `aspect-ratio` + `object-fit: cover`** — at natural 2.74:1 ratio the banners would be ~136px tall on a 375px phone, which is too thin for a hero. Center-crop preserves readable content in all 5 images.

## Navigation

- **Category nav height increased** from `3rem` to `3.5rem` with `padding-block: var(--space-3)` on links — original felt vertically tight on desktop.
- **Brewing & Beverage Equipment** replaced with a full-width mega-menu panel (5 category columns: Brewhouses, Tanks, Processing, Additional Products, Other Beverages). Processing column uses a 2-column grid of sub-groups to handle its depth. CSS-only: hover / `:focus-within` triggers.
- **One-way Kegs** uses a 2-level CSS flyout dropdown: 5 size categories → sub-items (with/without bags).

## Contact page

- **Map implemented as an embedded OpenStreetMap iframe** rather than a static screenshot from the mockup — keeps the layout faithful while making the location panel actually usable for directions and zooming.

## Utility pages

- **Spain placeholder rebuilt as a background-image hero with an overlaid content panel** — keeps the supplied placeholder artwork prominent while making the page feel intentional and readable across desktop and mobile.

## Home — Featured Products (formerly "New Offers")

- **Renamed section from "New Offers" to "Featured Products"** — the original name implied only promotional items; the section shows a curated product sample.
- **Tab labels updated to "New Arrivals / Deals / Best Sellers"** — clearer intent per tab; removed confusing arrow buttons that cycled tabs instead of scrolling a carousel.
- **Tabs restyled as pill selector** (segmented-control pattern: filled active pill on a rule-coloured track) — visually distinct from the tab underline pattern used elsewhere, and correct for a 3-option switcher.
- **Product cards upgraded to full prod-card--compact** — real per-product images from `assets/product-images/`, EBC/type meta label, price range, and "View Product" ghost button, matching the product category pages.
- **Added "Browse all products →" link** at the bottom-right of the section.
- **Section background changed from `--color-cream` to `--color-cream-soft`** to visually separate it from Our Product Selection above.

## Product category pages

- **Malts listing switched from a full-width top toolbar to a 2-column catalogue layout with a sticky left filter rail** — keeps the template scalable for future category pages and prevents the product cards feeling cramped as more filters are added.
- **Catalogue filter rail reduced from `19.5rem` to `17.55rem` across product listing templates** — gives the product grid roughly 10% more room while keeping the filter groups comfortably readable.
- **Equipment landing page: reduced top padding on "Our Equipment Solutions"** — closes the gap beneath "Built around your production plan" so the page flow feels more connected.
- **CIP listing page switched to a compact equipment-card layout** — narrowed the content width further, reduced the media ratio, and added section padding so the two product cards read as catalogue items rather than oversized feature blocks.
- **CIP hero switched to a centred placeholder layout** — centred the eyebrow, title, and lede so the intro reads more intentionally while the page awaits a fuller bespoke hero treatment.
- **Additional Chemical Products detail pages scaffolded from the `IPA 70%` template** — added product pages for the remaining catalogue items, using contact-led technical-sheet buttons and temporary pack-size assumptions where the source catalogue did not specify them yet.

## Contact page

- **Post-hero contact section rebuilt into a soft two-panel band** — replaced the old heading-plus-list layout with department contact cards and a calmer structured enquiry form, following the `contact_page_redesign_v4.html` direction while keeping the site token system and mobile stacking rules intact.
