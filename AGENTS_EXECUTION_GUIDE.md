# Agent 执行指南 v2

## 概述

本文档定义了 Logistics Presale AI System 中 Agent 的标准执行流程，包含状态管理、错误处理和追踪机制。

---

## 标准工作流（v2 改进）

### 阶段0：项目初始化（必须先执行）

```
1. 创建项目工作目录: project_workspace/{project_id}/
2. 创建 stage_0_project_assumptions.md
3. 填充所有已知数据，留空待确认项
4. 将本文件路径作为 input 传给后续所有 Agent
```

### 标准 Agent 调用模式

每次启动 Agent 时，必须传递以下信息：

```
input_files:
  - path: "stage_0_project_assumptions.md"
    content: "<完整内容>"
  - path: "stage_N_xxx.md"
    content: "<完整内容>"

timeout_minutes: 10
task_label: "project-{id}-{stage-name}"
```

### 执行检查清单

- [ ] 启动前读取 stage_0_project_assumptions.md
- [ ] 所有假设值引用 assumptions 文件中的编号
- [ ] Agent 输出中标注 [ASSUMPTION] 的数据不能凭空捏造
- [ ] Agent 完成后将结果写入 stage_N_output.md
- [ ] 确认写入后再启动下一阶段
- [ ] QA 阶段必须传入所有相关文档的完整内容

---

## Agent 状态追踪机制

### 方法1：使用 sessions_spawn 的 label 参数

每个 Agent 启动时分配唯一 label：
```
sessions_spawn task="..." label="porsche-tianjin-extractor"
```

追踪状态：
```
sessions_list kinds=subagent messageLimit=1
```

### 方法2：使用 subagents 工具

```
subagents action=list  # 查看所有运行中的 Agent
subagents action=kill target="<session_key>"  # 终止卡住的 Agent
```

### 方法3：使用 cron job 定期检查（适用于长时间运行）

不推荐用于短期任务，推荐使用 sessions_list 主动追踪。

---

## 错误处理策略

| 错误类型 | 处理策略 |
|---------|---------|
| Agent 超时 | 终止并重试一次（timeout_minutes×2） |
| Agent 输出 FAIL | 检查错误信息，修复后重新执行 |
| QA P0 问题 | 阻塞流程，修复后重新 QA |
| 数据不一致 | 以 stage_0_project_assumptions.md 为准 |

---

## 文档命名规范

| 文件 | 用途 |
|------|------|
| `stage_0_project_assumptions.md` | 所有 Agent 的共享假设基准 |
| `stage_1_requirement_extraction.md` | 需求提取结果 |
| `stage_2_requirement_clarification.md` | 需求澄清结果 |
| `stage_3_data_analysis.md` | 数据分析结果 |
| `stage_4_knowledge_retrieval.md` | 知识检索结果 |
| `stage_5_solution_design.md` | 方案设计结果 |
| `stage_6_automation_recommendation.md` | 自动化推荐结果 |
| `stage_7_benchmark.md` | 案例匹配结果 |
| `stage_8_cost_model.md` | 成本模型结果 |
| `stage_9_risk_assessment.md` | 风险评估结果 |
| `stage_10_qa_review_1.md` | QA 一审报告 |
| `stage_11_tender_draft.md` | 标书草稿 |
| `stage_12_qa_review_2.md` | QA 二审报告 |

---

## Agent 超时配置（分钟）

| Agent | 超时 |
|-------|------|
| Tender Requirement Extractor | 10 |
| Requirement Clarifier | 8 |
| Logistics Architect Agent | 15 |
| Automation Solution Agent | 15 |
| Cost Model Agent | 15 |
| Benchmark Agent | 10 |
| Risk & Compliance Agent | 10 |
| Tender Writer Agent | 15 |
| QA Agent | 10 |
| Data Analyst Agent | 10 |
| Knowledge Base Agent | 8 |

---

## QA 门禁规则

1. QA Agent 必须通过 `input_files` 接收文档内容，不得自行扫描文件系统
2. P0 问题必须修复，否则流程阻塞
3. QA verdict 为 FAIL 时，禁止进入下一阶段
4. QA verdict 为 CONDITIONAL PASS 时，需确认 P1 问题是否可接受

---

## 常见问题处理

### Agent 启动后无响应
```
subagents action=list  # 查看状态
subagents action=kill target="<session_key>"  # 终止
# 检查 prompt 是否正确，重新启动
```

### 数据不一致
```
# 以 stage_0_project_assumptions.md 为准
# 通知相关 Agent 重新执行，并传入正确的假设值
```

### QA 误报（文件未传入）
```
# 检查 input_files 参数是否正确传递
# 确保文件路径和内容都传入了 prompt
```

---

## Google Drive 自动上传（可选）

在所有阶段完成后，可选将结果上传到 Google Drive：

```bash
# 创建项目文件夹
gog drive mkdir "ProjectName_Analysis_{date}" --parent <parent_folder_id>

# 上传所有文档
gog drive upload stage_11_tender_draft.md --parent <folder_id>
gog drive upload stage_12_qa_review_2.md --parent <folder_id>
```

---

## 示例：完整执行流程

```bash
# 1. 初始化
mkdir project_workspace/porsche-tianjin/
# 创建 stage_0_project_assumptions.md

# 2. 启动需求提取 Agent
sessions_spawn task="<prompt with assumptions>" label="porsche-tianjin-extractor"

# 3. 等待完成后启动需求澄清（并行）
sessions_spawn task="<prompt>" label="porsche-tianjin-clarifier"

# 4. 并行启动方案设计和自动化推荐
sessions_spawn task="<prompt with assumptions>" label="porsche-tianjin-architect"
sessions_spawn task="<prompt with assumptions>" label="porsche-tianjin-automation"

# 5. 启动成本建模
sessions_spawn task="<prompt>" label="porsche-tianjin-costmodel"

# 6. QA 审核（传入所有文档内容）
sessions_spawn task="<prompt with all doc contents inline>" label="porsche-tianjin-qa"

# 7. 标书生成
sessions_spawn task="<prompt with all doc contents>" label="porsche-tianjin-writer"

# 8. QA 二审
sessions_spawn task="<prompt>" label="porsche-tianjin-qa2"

# 9. 上传 Google Drive
gog drive mkdir "Porsche_Tianjin_Analysis_2026-03-28"
# upload all stage files
```
