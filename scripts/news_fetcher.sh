#!/bin/bash
# News fetcher and email sender for NewsNow

RECIPIENT="wangke0614@sina.com"
DATE=$(date "+%Y-%m-%d")

# Fetch news from NewsNow
curl -s "http://192.168.50.4:4444/" > /tmp/news_raw.html 2>/dev/null

# Extract news items - we'll categorize based on keywords
# Categories: 国际, 财经, 科技, 娱乐, 体育, 社会, 其他

INTERNATIONAL=""
FINANCE=""
TECH=""
ENTERTAINMENT=""
SPORTS=""
SOCIETY=""
OTHER=""

# Parse the HTML and categorize (simplified)
# This is a basic version - can be enhanced later

# For now, let's create a simple report
SUBJECT="每日新闻汇总 - $DATE"

BODY="每日新闻汇总
日期: $DATE
来源: NewsNow (http://192.168.50.4:4444/)

---
注意: 新闻抓取脚本需要进一步完善才能正确分类
---

请访问 http://192.168.50.4:4444/ 查看完整新闻

--
自动发送"
