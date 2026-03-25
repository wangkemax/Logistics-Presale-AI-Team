
## 飞书配置
- 用户 open_id: `ou_4b5f917f673c03c2c50fdf37c9af6e4f`
- 发送目标格式: `user:ou_4b5f917f673c03c2c50fdf37c9af6e4f`

## 2026-03-25 百事DC投标任务经验

### 关键教训

1. **CEO cron job 只巡检不派发** — 需要在 cron job 中显式添加 spawn 逻辑，否则任务永远卡在 PENDING

2. **clawteam spawn 不支持 headless** — Claude Code CLI 需要 OAuth 浏览器认证，不适合后台运行。使用 OpenClaw sessions_spawn 更稳定

3. **多 Agent 协作流程成功** — 链路: 需求提取→物流方案→成本模型→投标标书→QA审核→修正→QA二审，全自动流转

4. **QA 是质量门禁** — 必须保留反馈循环，QA发现问题→返回对应Agent修正→再次QA审核

### 技术要点

- clawteam board show <team> 查看任务状态
- sessions_spawn runtime="subagent" mode="run" 派发一次性 agent
- cron job 修改: openclaw cron edit <id> --message "..."
