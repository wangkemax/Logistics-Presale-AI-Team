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

## 核心 Agent（11个）

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
| QA Agent | 质量审核（QA门禁，P0问题禁止通过） |

---

## 工作流

| 文件 | 用途 |
|------|------|
| `workflows/tender-workflow.yaml` | 完整投标流程（12阶段，QA门禁，v2改进版） |
| `workflows/solution-design.yaml` | 方案设计独立工作流 |
| `workflows/ppt-generation.yaml` | PPT生成工作流 |
| `workflows/project-init-template.md` | 项目初始化模板（阶段0） |

---

## v2.1 改进（2026-03-28）

相比 v2.0 的关键修复：

1. **QA Agent 输入模式修复** — 强制内联传入文档内容，禁止自行扫描文件系统
2. **共享状态文件机制** — 所有 Agent 通过 `stage_N_output.md` 共享状态
3. **项目假设基准文件** — 阶段0生成 `stage_0_project_assumptions.md`，所有 Agent 共享假设
4. **Agent 追踪机制** — 标准 label 命名 + sessions_list 主动追踪
5. **超时配置** — 每个 Agent 设置超时分钟数，防止无限挂起

详见 [CHANGELOG.md](CHANGELOG.md)

---

## 目录结构

```
Logistics-Presale-AI-Team/
├── agents/                        # 11个核心Agent定义
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
│   ├── qa-agent.yaml             ← v2.1修复：强制内联输入
│   └── data-analyst.yaml
│   └── README.md
├── workflows/                     # 工作流编排
│   ├── tender-workflow.yaml      ← v2.1重写：含状态管理+QA门禁
│   ├── solution-design.yaml
│   ├── ppt-generation.yaml
│   └── project-init-template.md  ← v2.1新增：阶段0模板
├── AI-Knowledge-Base/             # 知识库
├── tender-analysis/               # 投标分析文档（参考）
├── AGENTS_EXECUTION_GUIDE.md     ← v2.1新增：执行指南
├── CHANGELOG.md                  ← v2.1新增：版本记录
└── README.md
```

---

## 使用方法

### 1. 项目初始化（必须先执行）

```bash
# 创建项目工作目录
mkdir project_workspace/{project_name}/

# 复制阶段0模板
cp workflows/project-init-template.md project_workspace/{project_name}/stage_0_project_assumptions.md

# 填写假设文件（所有 P0 数据必须标注，待客户确认）
```

### 2. 按工作流顺序执行 Agent

建议使用 `sessions_spawn` 派发 Agent，每个 Agent 传入：
- `input_files`：上一阶段输出文件的路径和内容
- `label`：标准命名 `{project}-{stage-name}`
- `timeout`：对应的时间限制

详见 [AGENTS_EXECUTION_GUIDE.md](AGENTS_EXECUTION_GUIDE.md)

### 3. QA 门禁

- QA Agent 输出为 `FAIL` 时，流程阻塞，必须修复 P0 问题
- P0 问题修复后重新执行对应 Agent，再进行 QA
- QA 输出为 `CONDITIONAL PASS` 时，需确认 P1 问题是否可接受

### 4. 完成后上传 Google Drive

```bash
gog drive mkdir "{ProjectName}_Analysis_{date}" --parent <parent_folder_id>
gog drive upload stage_11_tender_draft.md --parent <folder_id>
# ... 其他文档
```

---

## 质量门禁

QA Agent 是强制质量门禁：

- **P0 致命问题** — 禁止通过，必须修复
- **P1 严重问题** — 应当修复
- **P2 一般问题** — 建议修复

所有 P0 问题修复后，才能进入下一阶段。

---

## 关键数据库

系统真正能力来自这三块：

1. **自动化场景数据库** — `AI-Knowledge-Base/automation_cases/`
2. **成本模型** — `AI-Knowledge-Base/cost_models/`
3. **案例知识库** — `AI-Knowledge-Base/logistics_cases/`
