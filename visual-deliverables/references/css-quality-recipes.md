# CSS Quality Recipes — Composite Visual Effects

> Portable, de-branded from a design engine's layered-effect library. Each recipe maps the
> engine's effect model directly to CSS so you can reproduce the same premium feel in plain
> HTML/CSS. Use these to add "craft" **on top of** the baseline rules in `visual-style-guide.md`
> — do NOT violate that file's AI-tells bans (e.g. no neon outer glow on *containers*; the neon
> recipe here is text-only by design).

## 1. Glassmorphism (毛玻璃)
**Trigger keywords:** glass, frosted, translucent surface, backdrop-blur.

- `backdrop-filter: blur(16px)` on the element
- semi-transparent white fill `background: rgba(255,255,255,0.2)` (opacity **must be < 0.5**)
- 1px white border at 15–30% opacity
- elevation shadow + inner top highlight to simulate the physical edge "refraction"

```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15),
              inset 0 1px 2px rgba(255, 255, 255, 0.2);
}
```

> **Dark variant:** swap fill to `rgba(255,255,255,0.08)` on a dark background, keep the white
> inner border — that inner edge is what sells the "glass" look.

## 2. Neon Glow (霓虹发光文字)
**Trigger keywords:** neon, glow text, ambient-glow.

Apply 4–6 layered `text-shadow` **on the text node itself**, radius decreasing and opacity
increasing from outer to inner. Adjust the RGB to your brand accent.

```css
.neon {
  color: #cfe0ff;
  text-shadow:
    0 0 80px rgba(51, 102, 255, 0.10),
    0 0 40px rgba(51, 102, 255, 0.25),
    0 0 20px rgba(51, 102, 255, 0.50),
    0 0 10px rgba(51, 102, 255, 0.80),
    0 0  4px rgba(51, 102, 255, 1.00);
}
```

> Use on a **single accent word**, never body text. This respects the "no outer glow on
> containers" ban — it is text-only by design.

## 3. Metallic / Chrome (金属 / 铬)
**Trigger keywords:** metallic, chrome, multi-stop-gradient.

`linear-gradient(45deg, …)` with **5 stops alternating dark → light → dark → light → dark**.
The metallic feel comes from the *contrast and alternation frequency* between stops, not from
saturation.

```css
.metallic {
  background: linear-gradient(45deg,
    #bec3c9 0%, #f0f0f0 25%, #8e92a0 50%, #e8e8e8 75%, #6c7080 100%);
  /* stamped feel: inner top highlight + bottom shade */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3),
              inset 0 -1px 2px rgba(255, 255, 255, 0.2);
}
```

## 4. Glow Border (发光边框)
**Trigger keywords:** glow border, accent-tinted border, inner-glow.

Two `inset` shadows (zero offset, accent color, radius 2–6) + one outer `box-shadow` for ambient
glow. Best on smaller elements / buttons / chips.

```css
.glow-border {
  border: 1px solid rgba(51, 102, 255, 0.6);
  box-shadow:
    inset 0 0 4px rgba(51, 102, 255, 0.8),
    inset 0 0 8px rgba(51, 102, 255, 0.4),
    0 0 16px rgba(51, 102, 255, 0.2);
}
```

## 5. Iridescent / Holographic (虹彩 / 全息)
**Trigger keywords:** iridescent, holographic, oil-slick.

`conic-gradient` with 6–8 evenly distributed hues + a `radial-gradient` highlight in `screen`
blend (use a `::after` pseudo-element with `mix-blend-mode: screen`). Base color must not be
too dark or the effect washes out.

```css
.iridescent {
  position: relative;
  background: conic-gradient(from 0deg,
    #ff3366, #ff9944, #ccff33, #33ff99, #3399ff, #9933ff, #ff3366);
}
.iridescent::after {
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(circle at center,
    rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 70%);
  mix-blend-mode: screen;
}
```

## 6. Neumorphism (新拟态 / Soft-UI)
**Trigger keywords:** neumorphism, soft-ui, dual-shadow.

Background and element share the **same** color (e.g. `#E0E5EC`). Background must NOT be pure
white or pure black.

```css
/* Raised (凸起) */
.neu-raised {
  background: #e0e5ec;
  box-shadow: -6px -6px 8px rgba(255, 255, 255, 0.8),
               6px  6px 8px rgba(163, 177, 198, 0.5);
}
/* Recessed / pressed (凹陷) */
.neu-recessed {
  background: #e0e5ec;
  box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.5),
              inset -4px -4px 8px rgba(255, 255, 255, 0.8);
}
```

## Porting note (engine → CSS)

The original design engine modeled these as stacked effect layers and used a
`showShadowBehindNode` flag: set `false` when the node has a semi-transparent fill (opacity < 1)
so the shadow doesn't bleed through, `true` when fully opaque. In CSS this is automatic:

- A drop shadow is always drawn **behind** the element — no flag needed.
- For semi-transparent fills, the **inner highlight** (`inset` shadow / white inner border) is
  what keeps the edge crisp. That is the CSS equivalent of the engine's edge-refraction trick.

No kernel needed for any of the above — all six run in a plain browser.
