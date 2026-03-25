const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://192.168.50.4:4444/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Extract news links
    const news = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links
        .filter(a => a.href.includes('zhihu.com') || a.href.includes('weibo.com'))
        .map(a => ({ href: a.href, text: a.innerText.trim() }))
        .slice(0, 50);
    });
    
    console.log(JSON.stringify(news, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
