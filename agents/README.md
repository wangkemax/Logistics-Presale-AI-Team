# Logistics Presale AI System — Agent Definitions

## 系统概述

《Logistics Presale AI System v2 — Agent Role / Prompt 标准版》

让每个 Agent 有清晰职责、输入输出结构统一、可在 OpenClaw 中直接使用。

## 核心 Agent 目录

| # | Agent | 文件 | 职责 |
|---|-------|------|------|
| 1 | Presale CEO Agent | `ceo-agent.yaml` | 总控：任务分解、Agent调度、结果整合 |
| 2 | Tender Requirement Extractor | `requirement-extractor.yaml` | 从招标文件中提取结构化需求 |
| 3 | Requirement Clarifier | `requirement-clarifier.yaml` | 识别缺失数据、不明确需求、假设条件 |
| 4 | Logistics Architect Agent | `logistics-architect.yaml` | 设计物流解决方案（分区、流程、人员） |
| 5 | Automation Solution Agent | `automation-solution.yaml` | 推荐自动化方案（含评分、投资、ROI） |
| 6 | Cost Model Agent | `cost-model.yaml` | 计算完整成本结构（ROI、IRR、NPV、回本周期） |
| 7 | Benchmark Agent | `benchmark-agent.yaml` | 匹配相似案例，提供实战经验 |
| 8 | Risk & Compliance Agent | `risk-compliance.yaml` | 风险识别与合规检查 |
| 9 | Tender Writer Agent | `tender-writer.yaml` | 将技术输出转化为专业投标文档 |
| 10 | Knowledge Base Agent | `knowledge-base.yaml` | 从知识库检索相关资料 |
| 11 | QA Agent | `qa-agent.yaml` | 质量审核（QA门禁，P0问题禁止通过） |
| 12 | Data Analyst Agent | `data-analyst.yaml` | 分析客户数据，提取业务洞察 |

## Agent 架构

```
Presale CEO Agent
│
├─ Tender Requirement Extractor
├─ Requirement Clarifier
├─ Data Analyst
├─ Knowledge Base Agent
├─ Logistics Architect Agent
├─ Automation Solution Agent
├─ Benchmark Agent
├─ Cost Model Agent
├─ Risk & Compliance Agent
├─ Tender Writer Agent
└─ QA Agent
```

## 工作流

- `workflows/tender-workflow.yaml` — 完整投标工作流（12阶段，含QA门禁）
- `workflows/solution-design.yaml` — 方案设计独立工作流
- `workflows/ppt-generation.yaml` — PPT生成工作流

## 核心数据库（关键）

真正的系统能力来自这三块：

1. **自动化数据库** (`AI-Knowledge-Base/automation_cases/`)
2. **成本模型 Python Engine** (`AI-Knowledge-Base/cost_models/`)
3. **案例知识库** (`AI-Knowledge-Base/logistics_cases/`)

这三块做好，系统才能发挥真正价值。

## 使用方式

每个 Agent 的 YAML 文件包含：
- `name` — Agent 名称
- `role` — 角色定位
- `mission` — 核心任务
- `input` — 输入规范
- `output` — 输出规范
- `thinking_framework` — 思考框架
- `prompt_template` — 可直接使用的 Prompt（含占位符 `{variable}`）

在 OpenClaw 中，可通过 `sessions_spawn` 或 `clawteam` 调用各 Agent。
