/**
 * Captures the dynamic cursor glow effect on homepage buttons as PNG frames.
 * Frames are assembled into a GIF via ffmpeg (see README workflow).
 *
 * Usage: node scripts/capture-glow.mjs
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3005";
const OUT_DIR = path.resolve(import.meta.dirname, "../.gif-frames");
const FRAMES = 48;

mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--force-device-scale-factor=2", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle0" });

// Locate the three preview buttons inside the "Button" preview card
// (scroll them to viewport center first so mouse events can reach them)
await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find(
    (b) => b.textContent.trim() === "Default"
  );
  // Homepage previews are wrapped in pointer-events-none; unlock for recording
  btn?.closest(".pointer-events-none")?.classList.remove("pointer-events-none");
  btn?.scrollIntoView({ block: "center", behavior: "instant" });
});

// Let scroll/layout settle, then measure fresh viewport coordinates
await new Promise((r) => setTimeout(r, 800));
const box = await page.evaluate(() => {
  const labels = ["Default", "Subscribe", "Accent"];
  const buttons = [...document.querySelectorAll("button")].filter((b) =>
    labels.includes(b.textContent.trim())
  );
  if (buttons.length === 0) return null;
  const rects = buttons.map((b) => b.getBoundingClientRect());
  const left = Math.min(...rects.map((r) => r.left));
  const top = Math.min(...rects.map((r) => r.top));
  const right = Math.max(...rects.map((r) => r.right));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  // Sanity check: the row center must actually hit a button
  const hit = document.elementFromPoint((left + right) / 2, (top + bottom) / 2);
  return {
    left,
    top,
    right,
    bottom,
    scrollY: window.scrollY,
    hitsButton: !!hit?.closest("button"),
  };
});

if (!box) {
  console.error("Preview buttons not found");
  process.exit(1);
}
if (!box.hitsButton) {
  console.error("Buttons are covered or out of viewport — aborting");
  process.exit(1);
}

// Clip region with padding around the button row.
// Mouse events use viewport coords; screenshot clip uses page coords.
const PAD = 28;
const clip = {
  x: Math.max(0, box.left - PAD),
  y: Math.max(0, box.top + box.scrollY - PAD),
  width: box.right - box.left + PAD * 2,
  height: box.bottom - box.top + PAD * 2,
};

// Sweep cursor left -> right -> left across the button row
const midY = (box.top + box.bottom) / 2;
const startX = box.left - 10;
const endX = box.right + 10;

for (let i = 0; i < FRAMES; i++) {
  const t = i / (FRAMES - 1);
  // Triangle wave: 0 -> 1 -> 0 (sweep out and back)
  const tri = t < 0.5 ? t * 2 : (1 - t) * 2;
  // Ease in-out for natural motion
  const eased = tri * tri * (3 - 2 * tri);
  const x = startX + (endX - startX) * eased;
  const y = midY + Math.sin(t * Math.PI * 2) * 4;
  await page.mouse.move(x, y);
  await new Promise((r) => setTimeout(r, 40));
  await page.screenshot({
    path: path.join(OUT_DIR, `frame_${String(i).padStart(3, "0")}.png`),
    clip,
    captureBeyondViewport: false,
  });
  process.stdout.write(`\rframe ${i + 1}/${FRAMES}`);
}

console.log(`\nDone. Frames in ${OUT_DIR}`);
await browser.close();
