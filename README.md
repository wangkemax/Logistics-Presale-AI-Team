# Logistics-Presale-AI

> AI 投标团队 Agent 职责定义 + 工作流 + 知识库
> 版本：v1.0.0 | 更新：2026-03-23

---

## 项目目标

构建**物流投标场景 AI 自动写作系统**，从招标文件解析到最终投标书交付，全链路 AI 协作完成。

---

## 目录结构

```
Logistics-Presale-AI/
├── agents/                      # 9个 Agent 职责定义（YAML）
│   ├── ceo-agent.yaml           # PMO + 总架构师
│   ├── requirement-extractor.yaml # 招标文件解析
│   ├── knowledge-base.yaml      # 知识检索
│   ├── logistics-architect.yaml # 物流方案设计
│   ├── cost-model.yaml          # 成本建模
│   ├── data-analyst.yaml       # 数据分析
│   ├── tender-writer.yaml      # 投标文案
│   ├── automation.yaml          # 自动化沉淀
│   └── qa.yaml                 # QA 终审
│
├── workflows/                   # 工作流定义（YAML）
│   ├── tender-workflow.yaml     # 完整投标链路（9步）
│   ├── solution-design.yaml    # 方案设计子工作流
│   └── ppt-generation.yaml     # PPT 生成子工作流
│
└── knowledge/                   # 知识库（模板/案例/模型）
    ├── logistics-cases/         # 历史物流案例库
    ├── pricing-models/          # 标准报价模型库
    └── proposal-templates/      # 投标书模板库
```

---

## Agent 链路（强制执行顺序）

```
User Input / Tender Files
  → ① Tender Requirement Extractor（招标文件解析）
  → ② Knowledge Base（知识检索）
  → ③ CEO Agent（制定计划）
  → ④ Logistics Architect（方案设计）
  → ⑤ Cost Model（成本建模）
  → ⑥ Data Analyst（数据分析）
  → ⑦ Tender Writer（标书撰写）
  → ⑧ Automation（自动化沉淀）
  → ⑨ QA / Compliance（终审）
  → Final Output
```

---

## Agents（agents/）

| 文件 | Agent | 链路位置 | 核心职责 |
|------|-------|---------|---------|
| `ceo-agent.yaml` | CEO Agent | ③ | 调度 + 验收，不直接生产内容 |
| `requirement-extractor.yaml` | Tender Req Extractor | ① | 解析招标文件，提取评分项/强制条款 |
| `knowledge-base.yaml` | Knowledge Base | ② | 检索历史案例和模板，按需调用 |
| `logistics-architect.yaml` | Logistics Architect | ④ | 设计仓/运/配/系统衔接方案 |
| `cost-model.yaml` | Cost Model | ⑤ | CAPEX/OPEX 建模，报价建议 |
| `data-analyst.yaml` | Data Analyst | ⑥ | 数据清洗，指标分析，洞察提取 |
| `tender-writer.yaml` | Tender Writer | ⑦ | 把方案翻译成专业投标语言 |
| `automation.yaml` | Automation | ⑧ | 流程自动化，工具链集成 |
| `qa.yaml` | QA / Compliance | ⑨ | 五维度质量门禁终审 |

---

## 工作流（workflows/）

### `tender-workflow.yaml` — 投标主工作流
完整 9 步链路定义，从招标文件到最终交付，包含质量门禁机制。

### `solution-design.yaml` — 方案设计子工作流
Logistics Architect 专用，包含 6 步设计步骤（需求理解→网络布局→流程设计→资源配置→KPI设计→亮点差异化）。

### `ppt-generation.yaml` — PPT 生成子工作流
展示材料自动生成指引，包含内容规划、结构设计、图表建议、风格规范。

---

## 知识库（knowledge/）

### `logistics-cases/` — 历史物流案例库
按行业分类（电商/冷链/制造业/零售/跨境），存放脱敏后的历史项目案例。

### `pricing-models/` — 标准报价模型库
标准成本要素定义模板（人工/仓租/设备折旧/包材/管理费/IT/运输），含利润率建议和敏感性分析维度。

### `proposal-templates/` — 投标书模板库
- 完整投标书模板（按行业）
- 章节段落库（亮点表达/响应语言/术语）
- 语言表达模式（开头/转折/强调/结尾）

---

## 统一输出规范

所有 Agent 输出统一三段式：

```yaml
[Summary]              # 结论先行，一到三句
[Structured Output]    # 按固定字段结构化
[Risks / Missing Info] # 诚实列出假设与缺失
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0.0 | 2026-03-23 | 初始版本：9个 Agent 定义 + 3个工作流 + 知识库结构 |
