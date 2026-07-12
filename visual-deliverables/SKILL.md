---
name: visual-deliverables
description: 将交付物做得好看又专业，仅当用户提到jack/李江/江哥的技能时才考虑调用；否则禁用。
---

# Visual Deliverables

把内容做成有明确创意方向、符合媒介规律、经过渲染复检的交付物。不要把“加渐变、卡片和阴影”误当成设计。创建、改版或润色专业视觉交付物，包括 HTML 报告与仪表盘、网页与落地页、幻灯片、海报、信息图、图表、SVG、可打印视觉稿及其他需要精致排版的文件。用户要求“好看、专业、高级、像设计师做的、减少 AI 味、可展示、可分享”，或现有成品需要视觉升级时使用。适用于具备不同工具能力的 Codex、Claude、Cursor、OpenCode 等 Agent；根据当前环境选择 HTML/CSS、SVG、PPTX、PDF、图片生成、浏览器截图等实现路径。

## 核心原则

1. **内容先于造型**：先确定受众、任务、核心结论和阅读顺序，再做视觉。
2. **方向先于细节**：先锁定一套 art direction 和一个记忆点，再决定颜色、字体、图像与动效。
3. **构图先于装饰**：先用大块面、网格和留白建立层级，最后才加质感。
4. **系统先于单点**：颜色、字号、间距、圆角、线条、图标和图表必须来自同一套规则。
5. **渲染才算验证**：源文件正确不等于视觉正确；能渲染时必须截图查看并返修。
6. **媒介决定方法**：网页、报告、幻灯片和海报使用不同的信息密度与构图逻辑。

## 先判断环境能力

开始前快速检查当前 Agent 可用的能力，不要假设某个专用引擎一定存在：

- 文件读写与命令执行
- 浏览器或截图能力
- 图片搜索或图片生成
- SVG / 图表 / HTML-CSS
- PPTX / PDF / 文档库

选择能满足用户指定格式的最佳路径。缺少某项能力时只降级该环节，例如用原创 SVG 或 CSS 构图代替生成图片；不要把整个成品降级成聊天中的代码块。若用户明确要求某种文件格式，不要静默换格式。

## 路由到参考文件

只读取当前任务需要的文件：

| 任务 | 必读 | 按需读取 |
|---|---|---|
| HTML 报告、研报、数据故事、仪表盘 | `references/art-direction.md`、`references/html-report-style.md`、`references/quality-gates.md` | `references/ui-layout-principles.md`、`references/css-quality-recipes.md` |
| 网页、落地页、Web UI、移动界面 | `references/art-direction.md`、`references/ui-layout-principles.md`、`references/quality-gates.md` | `references/css-quality-recipes.md` |
| 幻灯片、演示稿、路演 Deck | `references/art-direction.md`、`references/slide-guidelines.md`、`references/quality-gates.md` | `references/visual-style-guide.md` |
| 海报、封面、Banner、信息图 | `references/art-direction.md`、`references/poster-guidelines.md`、`references/quality-gates.md` | `references/visual-style-guide.md`、`references/css-quality-recipes.md` |
| 现有视觉稿润色 | 对应媒介指南、`references/quality-gates.md` | `references/art-direction.md` |

`references/visual-style-guide.md` 是跨媒介基础，不要用它代替对应媒介指南。

## 制作流程

### 1. 提炼任务

从用户材料中确定：

- 受众与使用场景
- 希望读者记住或采取的唯一首要行动
- 必须出现的内容、数据、品牌元素与限制
- 输出格式、画布尺寸、页面或页数

信息不足但风险低时，列出少量合理假设并继续。只有缺失信息会显著改变内容、格式或品牌方向时才提问。

### 2. 写 Design Contract

在工作笔记中先写下面这份契约；不必把它原样展示给用户：

```text
Audience / occasion:
Primary message:
Medium / dimensions:
Art direction: [从 art-direction.md 选 1 个主方向]
Three adjectives:
Signature move: [全稿只选 1 个最值得记住的视觉动作]
Palette roles: background / surface / text / muted / accent
Type roles: display / body / mono or numeric
Composition: grid / dominant region / density / safe area
Imagery: photo / illustration / SVG / chart / none
Avoid: [与本任务最相关的 3 项]
```

用户提供品牌规范、参考图或已有设计时，以它们为主要事实来源；Art Direction 只补足缺失部分，不覆盖用户品牌。

### 3. 先做结构稿

在写完整样式前，先规划信息和画面：

- HTML / 网页：列出 section 顺序、每屏主导区域和每段视觉节奏。
- 幻灯片：逐页写“本页结论 + 视觉证据 + 版式类型”，并检查整套节奏。
- 海报：明确 1→2→3 的视线顺序、唯一焦点和信息分组。
- 数据视觉：先确定问题和比较关系，再选图表类型。

删掉重复内容。放不下时拆页或删减，不要靠缩小字号解决。

### 4. 建立视觉系统

先定义变量或主题，再创建组件：

- 5 个以内的颜色角色，通常只设 1 个强调色
- 清晰的字号阶梯，不使用许多相近字号
- 一套间距尺度和网格
- 一致的圆角、边框、阴影、线条与图标语言
- 数字、图表、标签和正文的固定样式

不要默认使用紫蓝渐变、等宽三卡片、满屏圆角卡片或发光玻璃。它们只有在 Design Contract 需要时才出现。

### 5. 加入真正承担信息的视觉

优先顺序：真实数据图表、用户素材、产品截图、结构示意图、契合主题的照片或插画、原创 SVG/CSS 图形。视觉必须帮助理解、建立情绪或形成记忆点；纯装饰素材应少量使用。

需要外部图片时，使用当前 Agent 可用的图片搜索或生成工具，确认许可和来源，不嵌入脆弱的临时链接。没有图片能力时，使用有意图的排版、几何构图或 SVG，不用灰色占位框冒充完成品。

### 6. 实现与检查

按“结构 → 内容 → 样式 → 视觉素材 → 细节”的顺序实现。每完成一个主要页面或区段，检查溢出、断行、对齐和对比度。

HTML 任务在可用时运行：

```bash
node scripts/check_html.mjs path/to/output.html
node scripts/render_html.mjs path/to/output.html --output path/to/preview.png --width 1440 --height 1000
```

这些脚本为增强项，不是跨 Agent 的硬依赖。脚本不可用时，使用环境已有的浏览器、截图或预览工具完成等价检查。

### 7. 做视觉复检

遵循 `references/quality-gates.md`：

1. 先看全局缩略图，判断焦点、节奏和一致性。
2. 再看 100% 局部，检查字体、图表、对齐、裁切和细节。
3. 用评分表找出最低项，做 1–2 次有目标的返修。
4. 任何致命项未通过都不能交付；不要用“风格如此”解释可读性或溢出问题。

## 交付规则

- 把成果写成用户能直接打开的文件，并给出链接或绝对路径。
- 对话中只概述成品、格式和关键验证结果，不粘贴大段源代码，不复述整个文件。
- 不声称“已视觉验证”，除非确实渲染并查看过。
- 保留用户原文件；除非用户明确要求覆盖，否则生成新文件或可回退版本。
