# Skills

个人维护的 AI Agent Skills 合集。每个 Skill 都是一个独立目录，以 `SKILL.md` 作为入口，并可按需包含 `references/`、`scripts/` 或 `assets/`。

This repository contains a growing collection of reusable AI agent skills. Each skill is self-contained and uses `SKILL.md` as its entry point.

## Skill 列表

| Skill | 说明 |
|---|---|
| [`visual-deliverables`](./visual-deliverables/) | 指导生成好看、专业、可分享的 HTML 报告、幻灯片、图表及其他视觉化交付物。 |

## 使用方式

将需要的 Skill 目录复制或链接到 Agent 所使用的 Skills 目录中。例如，Codex 可将 Skill 放在 `$CODEX_HOME/skills/`；未设置 `CODEX_HOME` 时通常使用 `~/.codex/skills/`。

也可以直接将仓库中的 Skill 路径提供给支持本地 Skills 的 Agent。

调用示例：

```text
使用 $visual-deliverables，把这份分析制作成一份专业的 HTML 报告。
```

## 仓库约定

```text
skills/
├── README.md
├── LICENSE
└── skill-name/
    ├── SKILL.md
    ├── references/   # 可选：按需读取的参考资料
    ├── scripts/      # 可选：可复用脚本
    └── assets/       # 可选：模板、图片等输出资源
```

- 每个 Skill 使用独立目录，目录名与 `SKILL.md` 中的 `name` 保持一致。
- `SKILL.md` 的 YAML frontmatter 只保留 `name` 和 `description`。
- 详细材料放入 `references/`，避免让入口文件过长。
- Skill 专属说明直接写在 `SKILL.md`，不在每个 Skill 目录重复创建 README。

## 作者

[LLLLJack](https://github.com/LLLLJack)

## 许可证

本仓库由 [MIT License](./LICENSE) 授权。仓库中如有明确标注的第三方内容，其版权和许可仍遵循原权利人的条款。
