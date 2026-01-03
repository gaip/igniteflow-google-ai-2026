
import { test, expect } from '@playwright/test';

test('test AI bio generator', async ({ page }) => {
  console.log('Navigating to the About page...');
  await page.goto('http://localhost:3003/about');
  console.log('Clicking the "Generate AI Bio" button...');
  await page.click('text=Generate AI Bio');
  console.log('Waiting for the "Generating..." text to appear...');
  await page.waitForSelector('text=Generating...');
  console.log('Waiting for the "AI-Generated Bio" text to appear...');
  await page.waitForSelector('text=AI-Generated Bio');
  console.log('Taking a screenshot...');
  await page.screenshot({ path: '/home/jules/verification/AI_Bio_Generated.png' });
  console.log('Test complete!');
});
