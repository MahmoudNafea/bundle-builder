# Bundle Builder

## Running it

```bash
npm install
npm start
```

Requires Node 16+. No backend — everything runs locally.

## Stack

- React 18 + TypeScript
- Plain CSS with custom properties — no Tailwind, no CSS-in-JS
- Context API for state (no Redux — the state shape is simple enough that a reducer would've been overhead)
- No backend — data comes from a local `products.json` file

---

## Project structure

```
src/
  components/
    builder/        # AccordionStep, ProductCard, VariantSelector, QuantityStepper
    review/         # ReviewPanel, ReviewLineItem, PriceSummary
  context/
    BundleContext.tsx
  hooks/
    useSaveSystem.ts
  data/
    products.json
  styles/
    tokens.css
  types/
    index.ts
```

---

## Design decisions

**Context over Redux.** The app has one piece of shared state: a flat map of `variantId → quantity`. No async, no derived server state. Context with a handful of helpers covers it without the boilerplate.

**Variant-keyed selections.** Instead of nesting quantities under products, selections are stored as `{ [variantId]: number }`. This makes the review panel trivial — filter by qty > 0, group by step. It also means variant switching is free: you're just changing which key the stepper reads, not moving data around.

**CSS custom properties for the design system.** The Figma uses Gilroy and TT Norms Pro with a consistent color palette. Extracting those into tokens in one file meant I could match the design closely without scattering hex values everywhere. Media query breakpoints follow the two Figma frames — 1200px switches from the sidebar layout to the full-width layout with the review panel below.

**products.json as the single source of truth.** All product data, pricing, variant options, and step structure live in one file. Nothing is hardcoded in components. The initial state seed in BundleContext references variant IDs from that file, so if the data changes, the defaults stay in sync.

---

## What I didn't finish

- The Figma uses Gilroy and TT Norms Pro. Both are paid fonts — I'm loading them via cdnfonts which covers most weights but may not be production-reliable. In a real project I'd either license the fonts or find free equivalents.
- No animations on accordion open/close. The expand/collapse is instant. Adding a CSS height transition here would've been straightforward but I prioritized getting the layout and logic right.
- The "Learn More" links go nowhere. They'd need real product URLs.
- No error boundary around the context. If localStorage returns malformed JSON on restore, it'll throw. Worth adding a try/catch in `useSaveSystem`.

---

## Fonts

Gilroy (cdnfonts) and TT Norms Pro (cdnfonts) are loaded via CDN import. If either fails to load, the browser falls back to the system sans-serif. The UI stays usable either way.