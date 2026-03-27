# CHANGELOG — Logistics Presale AI System

## v2.1 (2026-03-28)

### 修复的问题

#### P0：QA Agent 误报（文件系统扫描问题）
**问题：** QA Agent 尝试自行扫描 workspace 获取文档内容，导致读取到旧文件（百事）而非当前项目文档。

**修复：**
- 更新 `qa-agent.yaml`，强制使用 `input_files` 参数内联传入文档内容
- 新增 `qa_input_mode: inline` 配置项
- 新增 `prompt_note`：明确禁止自行扫描文件系统
- 在 `tender-workflow.yaml` 中为 QA 阶段配置所有输入文件的路径和内容

#### P0：Agent 间状态传递依赖人工复制粘贴
**问题：** 每个 Agent 独立启动，上一阶段输出靠我人工复制粘贴传递，效率低且容易出错。

**修复：**
- 建立 `state_management` 配置段，定义所有 Agent 的输入输出文件路径规范
- 所有 Agent 输出必须写入 `stage_N_name.md`
- 下一阶段 Agent 必须读取上一阶段的输出文件
- 新增 `workflows/project-init-template.md` 作为阶段0初始化模板

#### P1：各 Agent 独立假设，缺乏共享基准
**问题：** Architecture、Automation、Cost Model 各自估算仓储面积、人数等参数，导致数值不一致。

**修复：**
- 强制阶段0（`stage_0_project_assumptions.md`）先于所有 Agent 执行
- 所有 Agent 必须引用 assumptions 文件中的估算值，并标注 `[ASSUMPTION]` 标签
- 新增 `input_files` 字段规范，确保每个 Agent 读取假设文件

#### P1：Agent 执行状态缺乏追踪机制
**问题：** Agent 散落在不同 session，我人工监控哪些完成、哪些还在跑。

**修复：**
- 在 `AGENTS_EXECUTION_GUIDE.md` 中定义标准 label 命名和追踪方法
- 新增 `sessions_list` 主动追踪和 `subagents kill` 错误处理
- 定义 `timeouts` 配置段，每个 Agent 设置超时分钟数

#### P2：缺乏超时设置
**问题：** Agent 可能无限期挂起。

**修复：**
- 所有 Agent 配置 `timeout_minutes` 参数
- 超时后自动重试一次（`error_handling.retry_on_timeout: true`）

### 新增文件

| 文件 | 用途 |
|------|------|
| `workflows/project-init-template.md` | 阶段0初始化模板 |
| `AGENTS_EXECUTION_GUIDE.md` | Agent 执行指南（含状态管理、错误处理） |
| `CHANGELOG.md` | 版本变更记录 |

### 更新的文件

| 文件 | 变更 |
|------|------|
| `workflows/tender-workflow.yaml` | 重写，新增状态管理、QA门禁、超时、错误处理 |
| `agents/qa-agent.yaml` | 强制内联输入模式，禁止自行扫描 |
| `README.md` | 更新目录结构和使用说明 |

---

## v2.0 (2026-03-25) — 初始版本

- 10个核心 Agent 定义（YAML格式）
- 3个工作流（投标流程、方案设计、PPT生成）
- AI Knowledge Base（案例、成本模型、行业报告）
- 保时捷上海临港投标实战资料
