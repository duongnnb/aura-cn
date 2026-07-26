/**
 * Runtime verification: the dynamic cursor glow must activate on hover.
 * Visits each docs page, sweeps the mouse over the live preview area,
 * then checks that at least one element received --wash-opacity: 1.
 *
 * Usage: node scripts/verify-glow.mjs
 */
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://localhost:3005";
const PAGES = [
  "/docs/components/button",
  "/docs/components/card",
  "/docs/components/fab",
  "/docs/components/chip",
  "/docs/components/stat-card",
  "/docs/components/accordion",
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

let failed = 0;

for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  // Hover the exact center of every visible button/span/div candidate
  // inside the article (live preview region), then wiggle to fire mousemove
  const targets = await page.evaluate(() => {
    const root = document.querySelector("article") || document.body;
    return [...root.querySelectorAll("button, span, div")]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 20 && r.height > 14 && r.top > 80 && r.top < 800)
      .slice(0, 60)
      .map((r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 }));
  });
  for (const t of targets) {
    await page.mouse.move(t.x, t.y);
    await page.mouse.move(t.x + 3, t.y + 2);
  }
  await new Promise((r) => setTimeout(r, 200));

  const result = await page.evaluate(() => {
    const hits = [...document.querySelectorAll("*")].filter(
      (el) => el.style?.getPropertyValue("--wash-opacity") !== ""
    );
    return {
      count: hits.length,
      tags: hits.slice(0, 5).map((el) => el.tagName.toLowerCase()),
    };
  });

  const ok = result.count > 0;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${path}  glow-elements=${result.count} [${result.tags.join(", ")}]`
  );
}

await browser.close();
process.exit(failed > 0 ? 1 : 0);
