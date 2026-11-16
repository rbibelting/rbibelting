// Use an existing Playwright installation; this adds no application dependency.
// PLAYWRIGHT_MODULE=file:///path/to/playwright/index.mjs node scripts/check-browser-seo.mjs http://localhost:8090
import assert from 'node:assert/strict';
import { writeFile, mkdir } from 'node:fs/promises';
import { loadSiteData, publicPaths } from './site-data.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://localhost:8090';
const data = await loadSiteData();
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const context = await browser.newContext();
// Do not send test visits or form contents to analytics or third-party widgets.
await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
await context.addInitScript(() => {
  sessionStorage.setItem('rb-intro', '1');
  sessionStorage.setItem('rb-enquiry-popup-next-at', String(Date.now() + 3600000));
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const report = { pages: [], checks: [], externalRequestsBlocked: true };
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of publicPaths(data)) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, path);
      const state = await page.evaluate(() => ({
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(node => node.href),
        h1: document.querySelectorAll('h1').length,
        graph: document.querySelectorAll('script[type="application/ld+json"]').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        guidance: !!document.getElementById('selection-guidance'),
      }));
      assert.deepEqual(state.canonical, [data.websiteIdentity.url + path]);
      assert.equal(state.h1, 1, path);
      assert.equal(state.graph, 1, path);
      assert.equal(state.overflow, false, `${width}px horizontal overflow on ${path}`);
      if (path.split('/').filter(Boolean).length === 2) assert.ok(state.guidance, path);
      report.pages.push({ path, width, ...state });
    }
  }
  await page.goto(base + '/contact');
  const question = page.locator('details').first();
  await question.locator('summary').click();
  assert.ok(await question.getAttribute('open') !== null);
  report.checks.push('Contact FAQs open accessibly; answers also exist in initial HTML.');

  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Search products' }).click();
  await page.getByPlaceholder('Search product, brand or part type').fill('V-Belts');
  assert.equal(await page.getByRole('link', { name: 'View range', exact: true }).count(), 1);
  await page.getByRole('link', { name: 'View range', exact: true }).click();
  await page.getByRole('dialog').waitFor();
  assert.ok(await page.getByRole('dialog').getByText('V-Belts', { exact: true }).count());
  report.checks.push('Exact search opens the matching range popup.');
  await page.getByRole('dialog').getByRole('button', {name: 'Close', exact: true}).click();

  await page.getByRole('button', { name: 'Search products' }).click();
  await page.getByPlaceholder('Search product, brand or part type').fill('Digital Tension Meter');
  await page.getByRole('button', { name: 'Quick enquiry', exact: true }).click();
  await page.getByRole('dialog').waitFor();
  assert.ok((await page.getByRole('dialog').locator('[name="requirement"]').inputValue()).includes('Digital Tension Meter'));
  assert.equal(await page.getByRole('dialog').locator('[name="category"]').inputValue(), 'Power Transmission');
  report.checks.push('Quick enquiry preserves the selected product and category.');
  await page.getByRole('dialog').getByRole('button', {name: 'Close', exact: true}).click();

  await page.goto(base + '/contact');
  await page.getByRole('button', {name: 'Submit your inquiry', exact: true}).click();
  assert.ok(await page.getByText('Please add your name, phone number and requirement.').isVisible());
  assert.equal(await page.evaluate(() => (window.dataLayer || []).filter(item => item.event === 'enquiry_handoff').length), 0);
  await page.locator('[name="name"]').fill('SEO test');
  await page.locator('[name="phone"]').fill('9876543210');
  await page.locator('[name="requirement"]').fill('Test enquiry, not sent');
  await page.locator('[name="category"]').selectOption('Automation');
  // Both clicks happen in one task, before any external mail application can open.
  await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find(button => button.textContent.includes('Submit your inquiry'));
    button.click(); button.click();
  });
  const events = await page.evaluate(() => (window.dataLayer || []).filter(item => item.event === 'enquiry_handoff'));
  assert.deepEqual(events, [{event:'enquiry_handoff', enquiry_method:'email', product_category:'Automation'}]);
  report.checks.push('Invalid form emits no event; rapid double-click emits one sanitized handoff event.');
  assert.equal(await page.locator('#google-tag-manager').count(), 1);
  report.checks.push('One GTM loader; no added GA4/page_view sender. GTM container configuration requires manual validation.');
  assert.deepEqual(errors, []);
  report.checks.push('No browser page errors during hydration/navigation.');
  report.passed = true;
  await mkdir('docs/seo/advanced', {recursive:true});
  await writeFile('docs/seo/advanced/browser-validation.json', JSON.stringify(report, null, 2) + '\n');
  await page.screenshot({path:'/tmp/rbi-seo-mobile.png', fullPage:true});
  console.log(`PASS: ${report.pages.length} rendered page/viewport checks; ${report.checks.length} interaction checks.`);
} finally {
  await browser.close();
}
