# QUESTIONS.md — Unresolved items flagged during build

## Header

**Q1: Account name "Ssirota"**
The main bar mockup shows a specific account name ("Ssirota"). Is this a placeholder for a logged-in user's name, or should it say something generic like "My account"? Keeping "Ssirota" as a placeholder for now.

**Q2: Hamburger / mobile nav**
The mobile nav drawer requires `nav.js` to function (slide-in, focus trap, Esc to close). Marked with `aria-expanded="false"` and `aria-controls="mobile-nav"` — wired up correctly, just needs the JS.

## Footer

**TODO: Social media links**

**TODO: Header/footer refactor**
Refactor the repeated header and footer HTML into simple reusable injected components (`site-chrome.js` or equivalent) so page-wide footer/header edits only need to happen in one place.

**Q5: Catalogues link**
Utility bar and footer both link "Catalogues" to `#` — does this open a downloadable PDF, a page, or a modal?

## Home page — Our Product Selection

**Q7: Duplicate category images**
`assets/home/our-product-selection/finings.jpg` and `processing-aids.jpg` are the same file (SKY LABS HLT / Hot Liquor Treatment, 25L white container). The "Finings & Clarification" category card currently uses `finings.jpg` as a placeholder. Please provide a separate image for either finings or processing aids so they are visually distinct.

**Q8: Finings & Clarification product name**
The HLT product shown in `finings.jpg` is clearly a processing/acid product, not a fining agent. Is "Finings & Clarification" even a category you stock? If so, please supply an appropriate image (e.g. Isinglass, Biofine, etc.).

## General

**Q6: Search results page**
Search form submits to `/search.html?q=...`. This page does not exist yet — stubbing with a placeholder is fine until backend is wired.

## Additional Chemical Products

**Q9: Additional Chemical Products pack sizes**
Only `IPA 70%` had a built detail page to copy from. The newly scaffolded Additional Chemical Products pages currently assume these pack sizes until confirmed:

- `IPA 98%`: 5 L and 25 L
- `Glycol (MPG)`: 25 L and 200 L
- `Peracetic Test Strips`, `pH Test Strips`, `Water Test Strips`, `Phenolphthalein Test Strips`: packs of 100 and 500
- `ATP Swabs`: boxes of 100 and cases of 500

These assumptions are marked in-page with `<!-- TODO: confirm -->` comments.

**Q10: SDS files without matching product pages**
The following SDS PDFs exist in `assets/downloads/SDS/`, but I could not find matching product pages to link them from: `CIP-Sequestrant-SDS.pdf`, `Sodium-Chloride-SDS.pdf`, and `Hydrochloric-acid-28-SDS.pdf`. Please confirm whether these need new product detail pages or should be linked from an existing page.

**Q11: Pricing items without detail pages**
Pricing was added to category cards where possible, but these priced items do not currently have product detail pages to update: `Keystones` and `Shives (Clear, ribbed)`. `Foam Doctor G205a` was not added because no matching page or card exists yet.

**Q12: IPA price mapping**
The supplied price list says `IPA 25L: £75.50`, while the site has separate `IPA 70%` and `IPA 98%` pages. I applied the 25 L price to both IPA pages for now; please confirm if only one concentration should carry that price.

**Q13: Product hub filter callout arrow**
The original inline SVG arrow in the Brewing Ingredients filter callout rendered incorrectly in-browser. It is temporarily hidden on hub pages and replaced with a CSS-generated arrow until the final button/icon treatment is confirmed.

**Q14: Cart page icon alignment**
The shopping cart icon on the cart/checkout page still needs a final visual pass. Current placeholder icon tile is functional, but the icon should be refined so it sits cleanly within the square at all viewport sizes.

**Q15: Sugars & adjuncts placeholder page assumptions**
Placeholder product pages were added for `Dextrose Powder`, `Lactose Powder`, `Invert Sugar`, `Maltodextrin Powder`, and `Caramel Colouring`. Until product data is confirmed, they currently assume:

- `Dextrose Powder`: 25 kg bag, £41.00
- `Lactose Powder`: 25 kg bag, £42.00
- `Invert Sugar`: 25 kg pail, £84.00
- `Maltodextrin Powder`: 25 kg bag, price on request
- `Caramel Colouring`: 25 kg drum, price on request

These assumptions are marked in-page with `<!-- TODO: confirm -->` comments.
