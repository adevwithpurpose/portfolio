import { chromium } from 'playwright';

const browser = await chromium.launch({ 
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to service 1 (Custom Web Solutions) - it's below hero
// Click nav button for section 2 (service 1)
await page.click('button:has-text("Go to section 2")');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/service-1-custom-web.png', fullPage: false });

// Scroll to service 2 (Intelligent Automation)
await page.click('button:has-text("Go to section 3")');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/service-2-automation.png', fullPage: false });

// Scroll to service 3 (Agent as a Service)
await page.click('button:has-text("Go to section 4")');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/service-3-agent-service.png', fullPage: false });

console.log('Screenshots saved!');
await browser.close();
