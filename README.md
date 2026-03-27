# Logistics Presale AI System v2

## Agent Role / Prompt 标准版

让每个 Agent 有清晰职责、输入输出结构统一、可在 OpenClaw 中直接使用的物流售前 AI 系统。

---

## 系统架构

```
Presale CEO Agent
│
├─ Tender Requirement Extractor   ← 招标文件解析
├─ Requirement Clarifier         ← 需求澄清
├─ Data Analyst                 ← 数据分析
├─ Knowledge Base Agent         ← 知识检索
├─ Logistics Architect Agent    ← 方案设计
├─ Automation Solution Agent    ← 自动化推荐
├─ Benchmark Agent             ← 案例匹配
├─ Cost Model Agent            ← 成本建模
├─ Risk & Compliance Agent      ← 风险评估
├─ Tender Writer Agent         ← 标书撰写
└─ QA Agent                    ← 质量审核
```

---

## 核心 Agent（10个）

| Agent | 核心任务 |
|-------|---------|
| Presale CEO Agent | 统筹协调、任务调度、结果整合 |
| Tender Requirement Extractor | 从招标文件提取结构化需求 |
| Requirement Clarifier | 识别缺失数据和模糊需求 |
| Logistics Architect Agent | 设计物流解决方案 |
| Automation Solution Agent | 推荐自动化方案（含评分、ROI） |
| Cost Model Agent | 计算成本、ROI、IRR、NPV、回本周期 |
| Benchmark Agent | 匹配相似案例 |
| Risk & Compliance Agent | 风险识别与合规检查 |
| Tender Writer Agent | 生成专业投标文档 |
| Knowledge Base Agent | 知识库检索 |

配套 Agent：QA Agent（质量审核）、Data Analyst（数据分析）

---

## 关键数据库

系统真正能力来自：

1. **自动化场景数据库** — `AI-Knowledge-Base/automation_cases/`
2. **成本模型** — `AI-Knowledge-Base/cost_models/`
3. **案例知识库** — `AI-Knowledge-Base/logistics_cases/`

---

## 工作流

- `workflows/tender-workflow.yaml` — 完整投标流程（12阶段，QA门禁）
- `workflows/solution-design.yaml` — 方案设计流程
- `workflows/ppt-generation.yaml` — PPT生成流程

---

## 目录结构

```
Logistics-Presale-AI-Team/
├── agents/                    # 10个核心Agent定义
│   ├── ceo-agent.yaml
│   ├── requirement-extractor.yaml
│   ├── requirement-clarifier.yaml
│   ├── logistics-architect.yaml
│   ├── automation-solution.yaml
│   ├── cost-model.yaml
│   ├── benchmark-agent.yaml
│   ├── risk-compliance.yaml
│   ├── tender-writer.yaml
│   ├── knowledge-base.yaml
│   ├── qa-agent.yaml
│   └── data-analyst.yaml
├── workflows/                  # 工作流编排
│   ├── tender-workflow.yaml
│   ├── solution-design.yaml
│   └── ppt-generation.yaml
├── AI-Knowledge-Base/          # 知识库
│   ├── automation_cases/       # 自动化案例
│   ├── company_materials/      # 公司资质
│   ├── cost_models/           # 成本模型参数
│   ├── data_models/           # 数据分析模型
│   ├── industry_reports/      # 行业报告
│   ├── logistics_cases/       # 历史物流案例
│   ├── solution_templates/   # 解决方案模板
│   └── tender_examples/       # 投标案例参考
├── porsche-rfq/               # 保时捷投标实战资料
└── tender-analysis/           # 投标分析文档
```

---

## 使用方法

每个 Agent YAML 文件包含可直接使用的 `prompt_template`，在 OpenClaw 中通过 `sessions_spawn` 调用。

### 示例调用流程

```bash
# 1. 提取招标文件需求
sessions_spawn agent=requirement-extractor

# 2. 方案设计
sessions_spawn agent=logistics-architect

# 3. 自动化推荐
sessions_spawn agent=automation-solution

# 4. 成本建模
sessions_spawn agent=cost-model

# 5. 质量审核
sessions_spawn agent=qa-agent

# 6. 生成标书
sessions_spawn agent=tender-writer
```

---

## 质量门禁

QA Agent 是强制质量门禁：

- **P0 致命问题** — 禁止通过，必须修复
- **P1 严重问题** — 应当修复
- **P2 一般问题** — 建议修复

所有 P0 问题修复后，才能进入下一阶段。
