# Wine shop verification

Reference: concept.png. Inspected the generated concept and the browser screenshot using view_image.

Checked in the Codex in-app browser at 1487 × 1058 and 390 × 844. Mobile has no horizontal overflow.

- Copy: all seven supplied names and categories preserved. Removed the concept's inaccurate six-origins claim.
- Layout: header, centered introduction, filters/search, four-column desktop collection, and footer preserved. Mobile uses one column; tablet uses two.
- Typography: Georgia headings and sans-serif controls retain the reference hierarchy.
- Palette: burgundy text, ivory canvas, neutral product panels.
- Controls: rounded outlined controls, visible focus states, and selected category treatment.
- Assets: supplied photos were absent; a labeled shared illustrative bottle intentionally replaces the concept's varied bottles. Add the seven named JPGs to public/wines before rebuilding to use actual photos.
- Spacing: wider vertical spacing and a constrained content width intentionally accommodate responsive typography.

Verified red category shows two items; unmatched search shows empty state; reset restores seven items; add, increase, remove, and empty bag states work. Browser renders the route successfully. Bag is visit-local; no prices or checkout were invented.

TypeScript check reports existing people/dashboard/validation errors and no wine-file errors. ESLint cannot start because the installed eslint-config-next does not provide the configured core-web-vitals import.

The reference hierarchy, palette, typography, controls, and responsive layout were visually verified; this is not a pixel-exact reproduction because of the documented asset, copy, and spacing differences.
