// Temp QA: capture live-preview screenshots of docs pages that received the new rim light.
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "https://aura-cn.vercel.app/docs/components/";
const PAGES = [
  "color-picker", "switch-icon", "sidebar", "navbar", "pagination",
  "select", "datepicker", "otp-input", "tag-input", "autocomplete",
  "file-upload", "toggle", "slider",
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

for (const slug of PAGES) {
  await page.goto(BASE + slug, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  // Clip the first preview block (roughly below the H1, right of sidebar)
  await page.screenshot({
    path: `.gif-frames/qa-${slug}.png`,
    clip: { x: 300, y: 120, width: 800, height: 500 },
  });
  console.log("captured", slug);
}
await browser.close();
