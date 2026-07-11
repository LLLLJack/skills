# UI / Web Layout Principles

> Portable, de-branded from a UI-design skill. These are tool-agnostic product-design laws plus
> layout patterns for web apps, landing pages, tables, and responsive/mobile. Use them whenever
> the deliverable is an interface, dashboard, web page, or any screen-like artifact. They pair
> with `visual-style-guide.md` (aesthetics) and `css-quality-recipes.md` (effects).

## A. Universal Product-Design Laws (apply to ANY screen)

1. **Purpose First** — every screen answers one dominant question and supports one primary action.
   Competing goals → separate surfaces.
2. **Dominant Region** — one region carries the most visual weight; everything else is subordinate.
   Avoid equal-weight, competing focal points.
3. **Understandability** — labels clear, actions recognizable, icons never replace essential text,
   system state visible. If a user must guess, redesign it.
4. **Progressive Disclosure** — show essentials first; advanced controls contextual. Detail opens on
   demand. Complexity allowed, confusion not.
5. **Recognition Over Recall** — surface relevant actions when needed; predictable navigation;
   consistent control placement.
6. **System Status Visibility** — every data surface supports loading / empty / error / success /
   permission states. No silent failure, no blank ambiguity.
7. **Action Hierarchy** — one primary action per screen/section; secondary visually reduced;
   destructive clearly distinct; rare actions in overflow.
8. **Structural Consistency** — similar problems get similar solutions; stable nav logic; rhythm
   feels system-driven; spacing follows one scale.
9. **Density Intentionality** — Compact (high-data) / Medium (default) / Airy (low-complexity).
   Don't mix modes arbitrarily within one screen.
10. **Spatial Logic** — one dominant axis per screen; prefer two structural zones before three;
    avoid nested scroll containers; whitespace for separation; decorative dividers only if functional.
11. **Feedback & Response** — every action gets immediate acknowledgment, clear validation,
    reversible where possible, destructive confirmed.
12. **Responsiveness** — hierarchy survives all breakpoints. Mobile: single column, sheets/stacked
    panels, no horizontal scroll. Desktop: multi-zone, higher density OK.
13. **Entity Integrity** — for any entity (user/record/doc), show its name, status, key metadata,
    obvious actions. Make it concrete.
14. **Constraint Over Decoration** — if an element doesn't aid navigation/understanding/decision/
    action, it shouldn't exist. As little design as possible.
15. **Scalability** — more data/features extend patterns, not create chaos.
16. **Adaptation Logic** — infer product type from the prompt, then derive dominant region, primary
    action, density, disclosure level. Don't assume dashboards/tables/sidebars unless required.

## B. Landing Page / Marketing Site

**Philosophy:** content before visuals. A landing page is a conversion engine, not artwork.
Lead with the *transformation* the visitor wants, not the feature list.

**Proven section pool** (pick, don't dump all): Header → Hero → Problem/Solution → Core Features
→ Secondary Features Grid → Social Proof → Pricing → FAQ → Final CTA → Footer. Header/Hero/Footer
are mandatory; the rest are selected per need.

**Hero (most important — one screen):**
- One clear idea; no feature lists competing for attention.
- Headline states the promise/outcome (make sense on its own); subheadline clarifies the mechanism.
- One primary CTA (+ optional lower-commitment secondary). One light credibility signal.
- Layout: stacked vertically preferred; text+visual side-by-side allowed; if screenshot below text,
  center the text. Fill most of the viewport before the fold.
- Works **without** visuals — visuals support, not explain.
- AI-generated images go in their own container, never as a text background fill.

**Visual rhythm & section alternation:** don't stack many text-only sections. After a heavy-text
section, shift energy — imagery, mockup, bento, or card grid — so the page breathes.

**Avoid "AI slop":** choose distinctive characterful typefaces; commit to one cohesive theme; use
motion deliberately (one crafted reveal beats scattered interactions); avoid flat solid backgrounds
— add gradients/patterns/textures; avoid predictable boilerplate card rows; vary aesthetics across
generations, never converge on the same safe choices.

**Footer:** familiar structure (logo, link groups, legal), plus one bold decorative visual moment.

**Product screenshots:** use placeholder boxes (1:1 or 16:9) labeled "Screenshot placeholder" —
don't hand-draw fake UI inside them.

## C. Tables

- Structure: a **header row** (column titles) + one or more **data rows**. If no data given,
  generate believable placeholder values (see AI-tells: no `99.99%`, use organic numbers).
- Cell: fixed width, fills row height. Row: fills container width, fixed height.
- **Responsive:** a wide multi-column table on mobile → convert to stacked **cards**, not a
  horizontally scrolling table, unless explicitly required.

## D. Mobile / Responsive Composition

- Wrap **all** content in one container: consistent left/right padding (16–20px) applied once;
  vertical spacing via `gap` (24–32px between major sections, 12–16px within), not per-element
  margins.
- One primary intent per screen; first 1–2 elements answer "where am I / what can I do".
- Single vertical scroll container; avoid nested scrolls. Sticky headers OK for filters/segmented
  controls.
- Touch targets comfortable; primary actions reachable in the lower half when one-handed.
- Bottom navigation (pill tab bar): 3–5 top-level destinations, active state a **solid fill** (not
  just a color shift), labels uppercase, respects safe-area inset; content gets bottom padding so
  it isn't obscured.
- Always design loading / empty / error / success as first-class states.
