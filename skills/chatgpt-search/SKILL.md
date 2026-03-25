---
name: chatgpt-search
description: 使用真实 Chrome 浏览器打开 ChatGPT 网页并搜索内容。当用户要求"用 ChatGPT 搜索"、"让 ChatGPT 帮我查"、"在 ChatGPT 里搜索"或类似请求时触发此技能。
---

# ChatGPT Search Skill

通过 Chrome DevTools MCP Attach Mode（profile="user"）调用用户真实 Chrome 浏览器中的 ChatGPT 进行搜索，并返回结果。

## 工作流

1. **打开 ChatGPT**
   - 使用 `browser(action=open, profile="user", targetUrl="https://chatgpt.com")`
   - 或 `targetUrl="https://chat.openai.com"`

2. **等待页面加载**
   - 执行 `browser(action=snapshot, profile="user", targetId=<targetId>)` 确认页面已加载

3. **定位输入框**
   - 在 snapshot 中找到 textbox（通常 ref 形如 `1_119` 或类似）
   - 使用 `browser(action=act, profile="user", targetId, ref, kind="type", text=<搜索内容>)`

4. **提交搜索**
   - `browser(action=act, profile="user", targetId, kind="press", key="Enter")`

5. **等待回复生成**
   - 等待 5-8 秒（流式输出需要时间）
   - 再次执行 `snapshot` 获取回复内容

6. **提取并呈现结果**
   - 从 snapshot 的 `statictext` 节点中提取 ChatGPT 的回答
   - 整理后用中文总结给用户

## 关键细节

- **必须使用 `profile="user"`**，否则无法复用用户的真实 Chrome 登录态
- ChatGPT 输入框 ref 不固定，每次需通过 snapshot 确认
- 等待时用 `exec(command="sleep N")`，不要用 snapshot poll 轮询
- 如果回复很长（显示 "1/2" 等分页），滚动到底部或等待完整加载后再抓取
- 首次 attach 时 Chrome 会弹出确认框，需用户手动批准

## 示例触发语

- "帮我用 ChatGPT 搜索一下 XXX"
- "让 ChatGPT 查一下 XXX"
- "在 ChatGPT 里搜索 XXX"
