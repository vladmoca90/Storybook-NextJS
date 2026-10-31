# Nocturne design and verification

Implemented at `/gothic`, with a Storybook entry under Projects/Nocturne Gothic Shop.

## Visual review

Reference: `concept.png`. Render: `implementation.png`. Both inspected with view_image. In-app browser used for all visual and interaction checks; no external Playwright fallback. Checked 1346 × 1169 (the generated reference dimensions), the default desktop viewport, and 390 × 844 mobile. Browser full-page capture produced a stitching artifact, so the saved render uses a normal viewport capture. Temporary viewport override was reset.

Comparison ledger:

- Copy: first-slide headline, supporting copy, navigation, CTA and manifesto match the reference. Above-the-fold copy diff: no added or removed words.
- Layout: brand/navigation, full-width hero carousel, manifesto, single collection and footer preserve reference order.
- Typography: ivory editorial serif throughout; Georgia is the practical system-font interpretation of the concept lettering.
- Palette: black #10100f, ivory #eee8dc and crimson #8d252e retained.
- Assets: separate generated fashion and product photography preserve the subject, mood and placement. Product art differs in garment details from the concept, intentionally.
- Spacing: portrait product frames intentionally show the entire garments; this makes the collection taller than the reference's square frames. Header and hero are also slightly taller.
- Controls: functional arrow icons, slide dots, category filters and search; CTA arrow added. Footer uses a moon and copyright instead of unconnected social links.
- Mobile: two-column product collection, wrapping navigation, readable hero; no horizontal overflow (375px content within 390px viewport).

The implementation was visually verified against the concept, with the intentional adaptations above; it is not a pixel-identical reproduction. No clipping or overflow remained in the checked layouts.

## Functional checks

Verified next-slide navigation, Halloween CTA filtering to the vampire coat, product preview, selection of size M, add to bag, increase quantity from one to two and subtotal from £189 to £378, and return to full collection. Native modal supplies focus trapping and Escape dismissal. Added accessible modal labels. Checkout is explicitly unavailable; products and prices are illustrative and bag state is session-only.

Project-wide TypeScript check reports existing errors in dashboard and people files, with no errors reported in new files. ESLint cannot start because the existing eslint-config-next/core-web-vitals import cannot resolve.

## Generated asset record

Built-in Image Gen used, not CLI. Workspace assets: `public/gothic/hero.png`, `public/gothic/products.png`; concept: `public/gothic/design/nocturne/concept.png`.

Prompt briefs: a complete NOCTURNE gothic boutique design with black/ivory/crimson palette, abbey fashion carousel and four-product collection; a standalone text-free cinematic photograph of a woman in a black Victorian lace gown at the right of a ruined abbey with shadowed negative space at left; a text-free four-panel studio product sheet featuring a black corset dress, burgundy vampire coat, ornate witch hat and black platform boots.
