#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import re
from datetime import datetime

# Use agent-browser to get the news
result = subprocess.run(
    ['agent-browser', 'open', 'http://192.168.50.4:4444/'],
    capture_output=True, text=True, timeout=30
)

import time
time.sleep(5)

result = subprocess.run(
    ['agent-browser', 'snapshot'],
    capture_output=True, text=True, timeout=30
)

html = result.stdout

# Extract news items - the snapshot shows the structure
# Pattern: "1 中美将举行第 6 轮经贸磋商，此次磋商有机会达成哪些共识？1462 万热度"
pattern = r'(\d+)\s+([^0-9]+?)(\d+)\s*万热度'
matches = re.findall(pattern, html)

# Define categories based on keywords
categories = {
    "国际": ["中美", "伊朗", "以色列", "美国", "俄罗斯", "欧洲", "联合国", "北约", "海湾", "外交", "谈判", "尼泊尔"],
    "财经": ["股市", "基金", "银行", "经济", "GDP", "通胀", "贸易", "关税", "营收", "市值", "315", "消费", "电商"],
    "科技": ["AI", "人工智能", "手机", "芯片", "互联网", "小米", "华为", "腾讯", "阿里", "百度", "电动车"],
    "娱乐": ["电影", "明星", "综艺", "电视剧", "演唱会", "恋情", "出轨", "官宣", "离婚", "演员", "票房"],
    "体育": ["足球", "篮球", "世界杯", "奥运", "F1", "赛车", "网球", "比赛", "冠军", "选手", "王楚钦"],
    "社会": ["学生", "学校", "教育", "医疗", "健康", "心理", "相亲", "婚恋", "骗局", "女子", "男子"],
    "汽车": ["宝马", "奔驰", "特斯拉", "比亚迪", "新能源", "汽车", "试驾", "销售"]
}

def categorize(title):
    for cat, keywords in categories.items():
        for kw in keywords:
            if kw in title:
                return cat
    return "其他"

# Build categorized news
all_cats = list(categories.keys()) + ["其他"]
categorized = {cat: [] for cat in all_cats}

for match in matches[:30]:
    rank, title, heat = match
    title = title.strip()
    if len(title) > 5:  # Filter out short matches
        cat = categorize(title)
        categorized[cat].append(f"{rank}. {title} ({heat}万热度)")

# Generate email content
date_str = datetime.now().strftime("%Y-%m-%d")
body = f"""每日新闻汇总
日期: {date_str}
来源: NewsNow (http://192.168.50.4:4444/)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"""

for cat in all_cats:
    items = categorized[cat]
    if items:
        body += f"【{cat}】\n"
        body += "\n".join(items[:5])
        body += "\n\n"

body += """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

完整新闻请访问: http://192.168.50.4:4444/

---
自动生成 by OpenClaw
"""

print(body)

# Save to file
with open("/Users/maxshow/Desktop/news_daily.md", "w", encoding="utf-8") as f:
    f.write(body)
