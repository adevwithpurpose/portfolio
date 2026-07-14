import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const SITES = [
  { name: 'luminous', url: 'https://luminous.outafbox.com' },
  { name: '99ads', url: 'https://99ads.com' },
  { name: 'calmicollar', url: 'https://calmicollar.com' },
  { name: 'nuumi', url: 'https://nuumipet.com' },
  { name: 'amanotte', url: 'https://amanotte.it' },
  { name: 'fantasticane', url: 'https://shop.fantasticane.com' },
  { name: 'diesel-patriots', url: 'https://dieselpatriots.com' },
  { name: 'comfort-truss', url: 'https://comfort-truss.com/pages/hernia-belt-comparison' }
];

const outDir = path.resolve('public/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Launching browser...');
const browser = await chromium.launch({ 
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

for (const site of SITES) {
  console.log(`Navigating to ${site.url}...`);
  try {
    const context = await browser.newContext({ 
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();

    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    
    // Wait slightly for lazy loaded images
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy(0, -window.innerHeight));
    await page.waitForTimeout(1000);

    const dest = path.join(outDir, `${site.name}.png`);
    console.log(`Capturing fullpage screenshot to ${dest}...`);
    await page.screenshot({ path: dest, fullPage: true });
    
    await context.close();
    console.log(`Success: ${site.name}`);
  } catch (err) {
    console.error(`Failed to capture ${site.name}:`, err.message);
  }
}

await browser.close();
console.log('All captures done.');
