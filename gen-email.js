const newsData = [
  // 知乎
  { href: "https://www.zhihu.com/question/2016164966399435420", text: "799 元镜片进价仅 15 元，溢价超 50 倍，这个利润空间合理吗？镜片质量对用眼健康实际影响多大？433 万热度", source: "zhihu", category: "财经" },
  { href: "https://www.zhihu.com/question/2016239937217851817", text: "塞尔维亚总统武契奇证实买了中国超音速导弹，为何选中国导弹？这笔交易释放了哪些信号？406 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/34816524", text: "什么东西早就应该发明出来，而现在却没有？278 万热度", source: "zhihu", category: "科技" },
  { href: "https://www.zhihu.com/question/2016277381732663354", text: "著名社会学家及哲学家尤尔根·哈贝马斯（Jürgen Habermas）逝世，如何评价他的生平及贡献？228 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/1986155615169574349", text: "腾讯、字节、阿里、小米、美团、京东、百度，中国互联网七巨头，谁的护城河最宽地位最牢固? 谁的潜力最大?205 万热度", source: "zhihu", category: "科技" },
  { href: "https://www.zhihu.com/question/2016229553916310360", text: "伊朗指挥官称结束战争有两个条件，一是收回所有损失，二是美国离开波斯湾，战争可能结束吗？后续走向会如何？178 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/2015910417793320691", text: "多人反映贷款逾期被银行划走养老金，银行此举是否合法合规？被划扣者又该如何维权？152 万热度", source: "zhihu", category: "财经" },
  { href: "https://www.zhihu.com/question/2014785530991236759", text: "宝马销售被指直播拉踩小米汽车，称「180 天造的车不敢开」，小米高管回怼问真实车主最有说服力，如何评价？139 万热度", source: "zhihu", category: "科技" },
  { href: "https://www.zhihu.com/question/2016251755034329560", text: "2026 WTT 重庆冠军赛，王楚钦 2-4 不敌松岛辉空，止步 8 强，如何评价本场比赛？127 万热度", source: "zhihu", category: "体育" },
  { href: "https://www.zhihu.com/question/2015804010213373773", text: "「鱼你在一起」菜盆被曝设「障眼法」，总高约 7.5 厘米，实则虚高 3.5 厘米，这算消费欺诈吗？102 万热度", source: "zhihu", category: "社会" },
  { href: "https://www.zhihu.com/question/2016062040624558429", text: "伊朗 30 枚超重导弹袭击以色列，是至今针对以色列最猛烈的空袭行动，意味着什么？为何是此时猛烈袭击？96 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/2016267906896322825", text: "美以袭击伊朗进入第 16 天，当前局势如何？哪些信息值得关注？90 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/659320225", text: "现代社会为什么没有出现像达芬奇这样全能的人了呢？78 万热度", source: "zhihu", category: "科技" },
  { href: "https://www.zhihu.com/question/2015094877113852627", text: "如何看待《镖人：风起大漠》国内票房突破 13 亿元，编剧俞白眉在采访中称电影差不多已经回本？72 万热度", source: "zhihu", category: "娱乐" },
  { href: "https://www.zhihu.com/question/2015892867273420813", text: "调查称拉不出屎正在成为中学生的集体秘密，这是为什么？你上学时有过这种经历吗？70 万热度", source: "zhihu", category: "社会" },
  { href: "https://www.zhihu.com/question/2016064576173598421", text: "特朗普宣布空袭伊朗石油出口枢纽「哈尔克岛」，其战略地位有多重要？若岛上石油设施被摧毁，会带来哪些影响？68 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/2015057062816671619", text: "如果可以选一位女作家成为你生活、旅行或工作中的搭子，你选谁？为什么？67 万热度", source: "zhihu", category: "娱乐" },
  { href: "https://www.zhihu.com/question/2014655508892624602", text: "尼泊尔选出 35 岁新总理，原为说唱歌手，新生代政客的时代要来了么？59 万热度", source: "zhihu", category: "国际" },
  { href: "https://www.zhihu.com/question/2007181043678077214", text: "GLM5 、 Kimi 2.5 、 Minimax M2.5 、千问、豆包，国产大模型选哪个？58 万热度", source: "zhihu", category: "科技" },
  { href: "https://www.zhihu.com/question/7747897575", text: "为什么都在说销售是最容易成为老板的职业?56 万热度", source: "zhihu", category: "财经" },
  // 微博
  { href: "https://s.weibo.com/weibo?q=%23%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%AD%A3%E8%A6%81%E8%BF%9B%E7%94%B5%E6%A2%AF%E8%A2%AB%E7%94%B7%E5%AD%90%E4%B8%80%E8%84%9A%E8%B8%B9%E5%80%92%23&t=31&band_rank=1&Refer=top", text: "机器人正要进电梯被男子一脚踹倒", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E8%83%96%E4%B8%9C%E6%9D%A5%E9%B8%A1%E8%9B%8B%E8%A2%AB%E6%8C%87%E4%BA%BA%E5%B7%A5%E8%89%B2%E7%B4%A0%E8%B6%85%E6%A0%87%23&t=31&band_rank=2&Refer=top", text: "胖东来鸡蛋被指人工色素超标", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%8D%81%E4%BA%94%E4%BA%94%E6%B0%91%E7%94%9F%E7%BA%A2%E5%8C%85%23&t=31&band_rank=3&Refer=top", text: "十五五民生红包", source: "weibo", category: "财经" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%8F%AF%E6%80%95%E7%9A%84%E7%A7%9F%E6%9C%BA%E8%B4%B7%E5%8F%88%E7%8E%A9%E5%BA%9F%E4%BA%86%E4%B8%80%E6%89%B9%E5%B9%B4%E8%BD%BB%E4%BA%BA%23&t=31&band_rank=4&Refer=top", text: "可怕的租机贷又玩废了一批年轻人", source: "weibo", category: "财经" },
  { href: "https://s.weibo.com/weibo?q=%23%E6%9A%97%E8%AE%BF10%E5%AE%B6%E4%BE%BF%E5%88%A9%E5%BA%9710%E5%AE%B6%E9%83%BD%E5%8D%96%E5%81%87%E7%83%9F%23&t=31&band_rank=5&Refer=top", text: "暗访10家便利店10家都卖假烟", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%8D%B0%E5%BA%A6%E4%B8%8E%E4%BC%8A%E6%9C%97%E7%B4%A0%E6%80%A5%E8%B0%88%E5%88%A4%23&t=31&band_rank=6&Refer=top", text: "印度与伊朗紧急谈判", source: "weibo", category: "国际" },
  { href: "https://s.weibo.com/weibo?q=%E5%88%98%E5%AE%87%E5%AE%81%E8%AF%B7%E4%BD%A0%E5%8E%9F%E8%B0%85%E7%8E%B0%E5%81%B6&t=31&band_rank=7&Refer=top", text: "刘宇宁请你原谅现偶", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%8D%9A%E4%B8%BB%E5%86%8D%E6%8C%87%E8%92%8B%E6%96%B9%E8%88%9F%E4%B8%8E%E5%A4%9A%E4%BD%8D%E4%BD%9C%E5%AE%B6%E5%BC%82%E6%9B%B2%E5%90%8C%E5%B7%A5%23&t=31&band_rank=8&Refer=top", text: "博主再指蒋方舟与多位作家异曲同工", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E4%B8%A4%E4%BC%9A%E7%BB%93%E6%9D%9F%E5%9B%BD%E5%8A%A1%E9%99%A2%E7%AB%8B%E5%88%BB%E8%A1%8C%E5%8A%A8%23&t=31&band_rank=9&Refer=top", text: "两会结束国务院立刻行动", source: "weibo", category: "财经" },
  { href: "https://s.weibo.com/weibo?q=%23%E9%80%90%E7%8E%89%E5%B9%BC%E5%B9%B4%E5%B8%9D%E5%90%8E%E7%9A%84%E6%95%91%E8%B5%8E%E6%84%9F%23&t=31&band_rank=10&Refer=top", text: "逐玉幼年帝后的救赎感", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E4%BC%8A%E6%9C%97%E8%A2%AD%E5%87%BB%E5%9C%B0%E5%8C%BA%E5%86%85%E7%BE%8E%E5%9B%BD%E9%93%B6%E8%A1%8C%23&t=31&band_rank=11&Refer=top", text: "伊朗袭击地区内美国银行", source: "weibo", category: "国际" },
  { href: "https://s.weibo.com/weibo?q=%23%E7%8B%97%E5%A4%B4%E8%90%9D%E8%8E%89%E7%B4%A0%E9%A2%9C%23&t=31&band_rank=12&Refer=top", text: "狗头萝莉素颜", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A4%A9%E9%B9%85%E5%87%BA%E8%BD%A8%E5%90%8E%E6%96%B0%E6%AC%A21%E5%B9%B4%E6%B2%A1%E4%B8%8B%E8%9B%87%E5%8E%9F%E9%85%8D%E6%8F%903%E5%A8%83%23&t=31&band_rank=13&Refer=top", text: "天鹅出轨后新欢1年没下蛋原配提3娃", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E4%B8%AD%E5%9B%BD34%E5%B2%81%E5%A5%B3%E5%AD%90%E5%9C%A8%E6%B0%91%E5%9B%BD%E8%A2%AB%E6%8A%9B%E5%B0%B8%E6%B0%B4%E6%B2%9F%23&t=31&band_rank=14&Refer=top", text: "中国34岁女子在泰国被抛尸水沟", source: "weibo", category: "国际" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A4%AE%E8%A7%86315%E6%99%9A%E4%BC%9A%E7%82%B9%E4%BA%864%E4%B8%AA%E9%A2%86%E5%9F%9F%23&t=31&band_rank=15&Refer=top", text: "央视315晚会点了4个领域", source: "weibo", category: "财经" },
  { href: "https://s.weibo.com/weibo?q=%23%E7%9B%B4%E5%87%BB%E7%BD%91%E7%BA%A2%E6%AF%9B%E8%82%9A%E7%94%9F%E4%BA%A7%E4%B9%B1%E8%B1%A1%23&t=31&band_rank=16&Refer=top", text: "直击网红毛肚生产乱象", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A5%B3%E5%AD%9F%E5%87%BA%E7%94%9F2%E5%A4%A9%E9%81%AD%E9%87%8D%E7%94%B7%E5%AD%90%E5%A5%B3%E7%88%B7%E7%88%B7%E9%81%97%E5%BC%83%23&t=31&band_rank=18&Refer=top", text: "女婴出生2天遭重男轻女爷爷遗弃", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%B8%A6%E8%B4%A7%E6%95%91%E5%A5%B3%E5%A6%88%E5%A6%88%E7%BB%88%E7%A9%B6%E6%B2%A1%E7%95%99%E4%BD%8F%E5%A5%B3%E5%84%BF%23&t=31&band_rank=19&Refer=top", text: "带货救女妈妈终究没留住女儿", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A5%B3%E5%AD%90%E6%8D%90%E8%B5%A04%E4%B8%87%E5%A4%9A%E6%AF%AB%E5%8D%87%E6%AF%8D%E4%B9%B3%E7%BB%99%E5%8C%BB%E9%99%A2%23&t=31&band_rank=20&Refer=top", text: "女子捐赠4万多毫升母乳给医院", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%E9%9F%A9%E7%BB%BC%E7%94%B7%E4%B8%BB%E6%8C%81%E5%BD%93%E4%BC%97%E6%AE%B4%E6%89%93%E5%A5%B3%E4%B8%BB%E6%8C%81&t=31&band_rank=22&Refer=top", text: "韩综男主持当众殴打女主持", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A5%B3%E5%AD%90%E6%82%A3%E7%BA%A2%E6%96%91%E7%8B%BC%E7%96%AE%E4%B8%BA%E5%A4%87%E5%AD%95%E5%81%9C%E8%8D%AF%E8%BF%9BICU%23&t=31&band_rank=23&Refer=top", text: "女子患红斑狼疮为备孕停药进ICU", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%BC%A0%E5%87%8C%E8%B5%AB%E4%B8%80%E5%8F%AA%E6%89%8B%E5%B0%B1%E6%8A%8A%E7%94%B0%E6%9B%A6%E8%96%87%E6%8F%90%E6%BA%9A%E8%B5%B7%E6%9D%A5%23&t=31&band_rank=24&Refer=top", text: "张凌赫一只手就把田曦薇提溜起来", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E7%8E%8B%E5%86%95%E5%AE%98%E5%AE%A3%E7%94%9F%E5%AD%90%23&t=31&band_rank=25&Refer=top", text: "王冕官宣生子", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E5%A5%B3%E5%AD%90%E7%BF%BB%E4%B8%8B%E5%A4%AB%E6%89%8B%E6%9C%BA%E5%8F%91%E7%8E%B0%E5%85%B6%E5%87%BA%E8%BD%A8%E5%87%A0%E5%8D%81%E4%BA%BA%23&t=31&band_rank=26&Refer=top", text: "女子翻丈夫手机发现其出轨几十人", source: "weibo", category: "社会" },
  { href: "https://s.weibo.com/weibo?q=%23%E6%98%A5%E6%99%9A%E4%B8%8E%E5%91%A8%E6%B7%B1%E5%90%8C%E5%8F%B0%E5%A5%B3%E5%AD%A9%E9%9D%A0%E8%BE%93%E8%A1%80%E7%BB%B4%E6%8C%81%E7%94%9F%E5%91%BD%23&t=31&band_rank=27&Refer=top", text: "春晚与周深同台女孩靠输血维持生命", source: "weibo", category: "娱乐" },
  { href: "https://s.weibo.com/weibo?q=%23%E6%88%90%E6%AF%85%E6%92%A4%E8%AF%89%23&t=31&band_rank=28&Refer=top", text: "成毅撤诉", source: "weibo", category: "娱乐" },
];

// Group by category
const categories = ["国际", "财经", "科技", "娱乐", "体育", "社会"];
const grouped = {};
categories.forEach(cat => grouped[cat] = []);

newsData.forEach(news => {
  if (grouped[news.category]) {
    grouped[news.category].push(news);
  }
});

// Generate HTML
let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>每日新闻汇总</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #4A90E2; padding-bottom: 10px; }
    h2 { color: #2c3e50; margin-top: 25px; border-left: 4px solid #4A90E2; padding-left: 10px; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 0; border-bottom: 1px solid #eee; }
    a { color: #4A90E2; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .source { color: #888; font-size: 12px; }
    .date { color: #666; text-align: right; }
  </style>
</head>
<body>
  <h1>每日新闻汇总 📰</h1>
  <p class="date">2026年3月15日</p>
`;

categories.forEach(cat => {
  if (grouped[cat].length > 0) {
    html += `\n  <h2>${cat}</h2>\n  <ul>\n`;
    grouped[cat].forEach(news => {
      // Clean up the title (remove leading number and热度)
      let title = news.text.replace(/^\d+\s*/, '').replace(/\s*\d+\s*万热度$/, '').trim();
      html += `    <li><a href="${news.href}" target="_blank">${title}</a></li>\n`;
    });
    html += `  </ul>\n`;
  }
});

html += `</body></html>`;

console.log(html);
