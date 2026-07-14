# CSS Craft Recipes

这些配方用于实现 Design Contract 中已经选定的材质。每个页面通常只选一项主要配方；效果不能代替构图。

## 1. Tinted depth｜带色深度

让阴影吸收背景色相，避免默认灰黑浮层：

```css
.surface {
  border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
  box-shadow:
    0 1px 0 rgb(255 255 255 / 0.45) inset,
    0 18px 50px color-mix(in srgb, var(--accent) 9%, transparent);
}
```

适合浅色产品页。高密度报告只保留边框或分隔线。

## 2. Restrained glass｜克制玻璃

玻璃需要背后有真实层次；空白背景上的 blur 没有意义。

```css
.glass {
  background: rgb(255 255 255 / 0.14);
  border: 1px solid rgb(255 255 255 / 0.24);
  box-shadow: 0 1px 0 rgb(255 255 255 / 0.18) inset;
  backdrop-filter: blur(18px) saturate(115%);
}
```

保证玻璃上的正文对比度，避免整个页面每一层都玻璃化。

## 3. Paper grain｜纸张颗粒

用极低透明度纹理打破数字平滑感：

```css
.paper { position: relative; }
.paper::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}
```

适合编辑、档案和静奢方向；不要覆盖交互层。

## 4. Precision hairline｜精密细线

```css
.hairline {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    linear-gradient(115deg, rgb(255 255 255 / .45), rgb(255 255 255 / .05)) border-box;
}
```

适合暗色工业界面。只强调结构边缘，不添加外发光。

## 5. Metallic band｜金属带

```css
.metal {
  background: linear-gradient(105deg,
    #6f7379 0%, #d8d9da 18%, #8b8e93 36%,
    #f2f2ef 52%, #878a90 71%, #c8c9ca 86%, #686b70 100%);
  box-shadow: inset 0 1px 1px rgb(255 255 255 / .35),
              inset 0 -1px 1px rgb(0 0 0 / .25);
}
```

只用于小面积标签、分隔或产品细节，不用于整页正文背景。

## 6. Controlled glow｜受控光晕

光源应有位置和原因：

```css
.lit-stage {
  background:
    radial-gradient(circle at 72% 28%, rgb(var(--accent-rgb) / .18), transparent 32%),
    linear-gradient(180deg, #111317, #090a0c);
}
```

让光照亮主体或数据，不给每个容器单独加 glow。

## 7. Motion with restraint｜克制动效

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    animation: reveal .65s cubic-bezier(.2,.8,.2,1) both;
  }
  @keyframes reveal {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

一组内容使用同一动效并轻微错峰。不要同时使用漂浮、旋转、视差和粒子。

## 8. Chart finish｜图表收尾

- 网格线降低到正文对比度的 10–18%。
- 轴线和边框能删则删；直接标注关键序列。
- 高亮一条主序列，其余降到中性灰。
- 数字使用 tabular figures：`font-variant-numeric: tabular-nums;`。
- tooltip、图例和页面字体保持一致。
