# HTML Reports, Dashboards & Data Stories

## 1. 先选产品形态

- **Executive brief**：结论先行，适合管理层和快速分享；通常浅色、编辑感、单页滚动。
- **Research report**：证据、来源、方法与注释完整；适合研报和深度分析。
- **Dashboard**：持续监控、筛选和比较；强调状态与操作，不追求叙事滚动。
- **Scrollytelling**：按故事顺序揭示数据；适合公众传播，但必须保持可访问的静态内容。

不要把所有 HTML 都做成深色 SaaS 仪表盘。

## 2. 内容架构

分析型页面建议按下面顺序选择：

1. Title / scope / date / source status
2. Executive summary：一句判断 + 3–5 个关键证据
3. Context：问题、范围和口径
4. Evidence sections：每段一个结论标题和一组证据
5. Implications / scenarios / recommendation
6. Methodology, sources and caveats

标题写结论，不写“数据分析”“市场趋势”等空泛章节名。首屏让读者在 10 秒内理解核心判断。

## 3. 页面系统

- 使用 CSS 自定义变量定义颜色、字体、间距、圆角和内容宽度。
- 正文阅读列通常控制在约 60–75 个字符；图表和表格可突破阅读列进入宽内容区。
- 建立 Summary / Section header / Insight callout / Chart frame / Source note / Data table 等少量组件。
- 高密度报告用边线、背景带和列组织信息，不给每个模块加阴影卡片。
- 数字使用 tabular figures，单位和时间范围始终可见。

## 4. 图表选择

先写出读者要回答的问题，再选图：

| 问题 | 优先图形 |
|---|---|
| 随时间如何变化 | 折线、面积、K 线 |
| 类别谁高谁低 | 排序条形图、点图 |
| 组成如何变化 | 堆叠条形、100% 堆叠；类别很少时用环形 |
| 分布与离群 | 直方、箱线、散点 |
| 两变量关系 | 散点、气泡；必要时加趋势线 |
| 流程、关系、产业链 | SVG / HTML 结构图 |
| 精确查阅 | 表格 |

### 图表规则

- 每张图只突出一个洞察；标题直接写洞察。
- 直接标注关键序列，减少读者在图例和图之间来回找。
- 同一语义在全页使用同一颜色；颜色不够时用线型、形状和明暗。
- 轴从零开始与否要符合图表类型并避免误导；截断时明确说明。
- 空值、零值和缺失值不要混为一谈。
- 双轴只有在关系明确且标注充分时使用；否则拆图或指数化。
- 提供数据来源、时间范围、单位和必要方法说明。
- 数据密集模块可提供图/表切换，让趋势和精确值都可用。

## 5. HTML 实现

- 默认生成语义化、响应式的单文件 HTML；若外部资源较大，可使用清晰的相对目录结构。
- 对核心内容不要依赖 JavaScript 才能出现；脚本失败时至少保留标题、结论和数据表。
- 图表库按环境选择。使用 CDN 时保证 URL 稳定，并让页面在加载失败时显示明确提示。
- 每个图表容器设置明确高度，并监听容器或窗口尺寸变化。
- 不使用重复 ID；本地图片、字体和脚本路径必须真实存在。
- 动效遵循 `prefers-reduced-motion`，打印样式隐藏交互控件并保持来源可见。

## 6. 交付前验证

从 skill 根目录运行，或用环境中的等价工具：

```bash
node scripts/check_html.mjs path/to/report.html
node scripts/render_html.mjs path/to/report.html --output path/to/desktop.png --width 1440 --height 1000
node scripts/render_html.mjs path/to/report.html --output path/to/mobile.png --width 390 --height 844
```

然后实际查看截图：

- 首屏是否先给结论，而不是大段背景？
- 图表是否渲染、标签是否重叠、颜色是否可辨？
- 1440px 和窄屏下是否有横向溢出？
- 表格在窄屏是否采用合适的摘要或折叠方案？
- 来源、时间、单位和 caveat 是否靠近相应证据？
- 打印或导出 PDF 时是否断页合理？

文件写出来但没有打开检查，不算完成。
