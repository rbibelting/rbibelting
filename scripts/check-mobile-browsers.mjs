// Use an existing Playwright installation; no application dependency is required.
// PLAYWRIGHT_MODULE=file:///path/to/playwright/index.mjs bun scripts/check-mobile-browsers.mjs
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { loadSiteData, publicPaths } from "./site-data.mjs";

const { chromium, webkit, devices } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://localhost:8080";
const origin = new URL(base).origin;
const output = process.env.MOBILE_REPORT_DIR || "docs/mobile/ios-android";
const data = await loadSiteData();
const sizes = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 768, height: 1024 },
  { width: 844, height: 390 },
];
await mkdir(output, { recursive: true });

async function checkEngine(name, engine, options) {
  const browser = await engine.launch(options);
  const context = await browser.newContext({
    ...(name === "webkit-ios" ? devices["iPhone 13"] : devices["Pixel 7"]),
    deviceScaleFactor: 2,
  });
  // Keep analytics/enquiry traffic out of external accounts, but exercise real font metrics.
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return url.origin === origin ||
      ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)
      ? route.continue()
      : route.abort();
  });
  await context.addInitScript(() => {
    sessionStorage.setItem("rb-intro", "1");
    sessionStorage.setItem("rb-enquiry-popup-next-at", String(Date.now() + 3600000));
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const report = { engine: name, pages: [], interactions: [], errors, passed: false };
  const goto = (path) => page.goto(base + path, { waitUntil: "networkidle" });
  async function fits(locator) {
    await locator.waitFor();
    // Let the existing opening animation finish before measuring final bounds.
    await page.waitForTimeout(250);
    const rect = await locator.evaluate((element) => {
      const r = element.getBoundingClientRect();
      return {
        left: r.left,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
        width: innerWidth,
        height: innerHeight,
        overflow: element.scrollWidth > element.clientWidth + 1,
      };
    });
    assert.ok(
      rect.left >= -1 &&
        rect.top >= -1 &&
        rect.right <= rect.width + 1 &&
        rect.bottom <= rect.height + 1,
      JSON.stringify(rect),
    );
    assert.equal(rect.overflow, false, JSON.stringify(rect));
    return rect;
  }
  try {
    for (const size of sizes) {
      await page.setViewportSize(size);
      for (const path of publicPaths(data)) {
        const response = await goto(path);
        assert.equal(response.status(), 200, path);
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          h1: document.querySelectorAll("h1").length,
          smallInputs: [...document.querySelectorAll('input:not([type="hidden"]),select,textarea')]
            .filter((element) => parseFloat(getComputedStyle(element).fontSize) < 16)
            .map((element) => element.name),
          headerControls: [...document.querySelectorAll("header button")]
            .filter((element) => element.getBoundingClientRect().width > 0)
            .map((element) => {
              const r = element.getBoundingClientRect();
              return { width: r.width, height: r.height, right: r.right };
            }),
        }));
        assert.equal(state.overflow, false, `${name} ${size.width} ${path}`);
        assert.equal(state.h1, 1, path);
        assert.deepEqual(state.smallInputs, [], `small form text on ${path}`);
        assert.ok(
          state.headerControls.every(
            (r) => r.width >= 44 && r.height >= 44 && r.right <= size.width + 1,
          ),
          path,
        );
        report.pages.push({ ...size, path, status: response.status(), ...state });
      }
      console.log(
        `${name}: ${size.width}×${size.height}, all ${publicPaths(data).length} routes passed`,
      );
      await goto("/");
      await page.getByRole("button", { name: "Open menu", exact: true }).tap();
      const menu = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
      await menu.getByRole("link", { name: "Contact", exact: true }).tap();
      await page.waitForURL("**/contact");
      await menu.waitFor({ state: "detached" });
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Submit your inquiry", exact: true }).tap();
      await page.getByText("Please add your name, phone number and requirement.").waitFor();
      const faq = page
        .locator("details")
        .filter({ has: page.getByText("What is the minimum order quantity?", { exact: true }) });
      await faq.locator("summary").tap();
      assert.notEqual(await faq.getAttribute("open"), null);
      const searchButton = page.getByRole("button", { name: "Search products", exact: true });
      await searchButton.tap();
      const search = page.getByRole("dialog", { name: "Search products", exact: true });
      const searchBounds = await fits(search);
      const close = search.getByRole("button", { name: "Close search", exact: true });
      const closeBounds = await close.boundingBox();
      assert.ok(closeBounds.width >= 44 && closeBounds.height >= 44);
      await page.keyboard.press("Escape");
      await search.waitFor({ state: "detached" });
      assert.equal(await searchButton.evaluate((e) => e === document.activeElement), true);
      await searchButton.tap();
      await search.getByPlaceholder("Search product, brand or part type").fill("V-Belts");
      await search.getByRole("link", { name: "View range", exact: true }).tap();
      const range = page
        .getByRole("dialog")
        .filter({ has: page.getByRole("heading", { name: "V-Belts", exact: true }) });
      const rangeBounds = await fits(range);
      for (const tab of ["Applications", "Brands", "Product types"]) {
        const control = range.getByRole("tab", { name: tab, exact: true });
        if (await control.count()) {
          await control.tap();
          assert.equal(await control.getAttribute("aria-selected"), "true");
        }
      }
      await range.getByRole("button", { name: "Close", exact: true }).tap();
      await searchButton.tap();
      await search
        .getByPlaceholder("Search product, brand or part type")
        .fill("Digital Tension Meter");
      await search.getByRole("button", { name: "Quick enquiry", exact: true }).tap();
      const enquiry = page
        .getByRole("dialog")
        .filter({ has: page.getByRole("heading", { name: "Send your requirement", exact: true }) });
      await fits(enquiry);
      assert.ok(
        (await enquiry.locator('[name="requirement"]').inputValue()).includes(
          "Digital Tension Meter",
        ),
      );
      await enquiry.locator('[name="name"]').fill("Mobile check");
      await enquiry.locator('[name="phone"]').fill("123");
      await enquiry.locator('[name="phone"]').blur();
      await enquiry.locator('[role="alert"]').filter({ hasText: /./ }).waitFor();
      await enquiry.getByRole("button", { name: "Close", exact: true }).tap();
      report.interactions.push({
        ...size,
        menu: true,
        invalidForm: true,
        faq: true,
        searchBounds,
        searchDismissalAndFocus: true,
        rangeBounds,
        rangeTabs: true,
        enquiryPrefill: true,
        phoneValidation: true,
      });
    }
    // A shorter viewport approximates the space available while the keyboard is open;
    // it does not claim to emulate a physical device's keyboard behavior.
    await page.setViewportSize({ width: 390, height: 400 });
    await goto("/");
    await page.getByRole("button", { name: "Search products", exact: true }).tap();
    const search = page.getByRole("dialog", { name: "Search products", exact: true });
    await fits(search);
    await search
      .getByPlaceholder("Search product, brand or part type")
      .fill("Digital Tension Meter");
    await search.getByRole("button", { name: "Quick enquiry", exact: true }).tap();
    const enquiry = page
      .getByRole("dialog")
      .filter({ has: page.getByRole("heading", { name: "Send your requirement", exact: true }) });
    await fits(enquiry);
    await enquiry
      .getByRole("button", { name: "Send on WhatsApp", exact: true })
      .scrollIntoViewIfNeeded();
    assert.ok(
      await enquiry.getByRole("button", { name: "Send on WhatsApp", exact: true }).isVisible(),
    );
    await enquiry.getByRole("button", { name: "Close", exact: true }).scrollIntoViewIfNeeded();
    await enquiry.getByRole("button", { name: "Close", exact: true }).tap();
    await page.setViewportSize({ width: 390, height: 844 });
    await goto("/");
    await page.screenshot({ path: `${output}/${name}-home.png`, animations: "disabled" });
    await goto("/contact");
    await page.screenshot({ path: `${output}/${name}-contact.png`, animations: "disabled" });
    assert.deepEqual(errors, []);
    report.shortViewportDialogs = true;
    report.passed = true;
  } catch (error) {
    report.failure = error.stack || String(error);
    await page.screenshot({ path: `${output}/${name}-failure.png` }).catch(() => {});
    throw error;
  } finally {
    await writeFile(`${output}/${name}.json`, JSON.stringify(report, null, 2) + "\n");
    await browser.close();
  }
  return {
    engine: name,
    pages: report.pages.length,
    interactionSizes: report.interactions.length,
    passed: true,
  };
}

const results = await Promise.allSettled([
  checkEngine("chromium-android", chromium, {
    executablePath:
      process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  }),
  checkEngine("webkit-ios", webkit, { headless: true }),
]);
for (const result of results)
  console.log(result.status === "fulfilled" ? result.value : String(result.reason));
assert.ok(
  results.every((result) => result.status === "fulfilled"),
  "Mobile browser validation failed; see engine reports.",
);
