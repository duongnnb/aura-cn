// Temp: verify AuraThemeSwitcher swatches on production homepage.
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://aura-cn.vercel.app/", { waitUntil: "networkidle0", timeout: 60000 });

const getAura = () =>
  page.evaluate(() => {
    const hero = document.querySelector("h1 span");
    return getComputedStyle(hero).getPropertyValue("--aura").trim();
  });

console.log("initial --aura:", await getAura());

for (const key of ["purple", "green", "orange", "rose", "blue"]) {
  const sel = `button[aria-label="${key} theme"]`;
  const btn = await page.$(sel);
  if (!btn) {
    console.log(key, ": BUTTON NOT FOUND");
    continue;
  }
  await btn.click();
  await new Promise((r) => setTimeout(r, 300));
  const aura = await getAura();
  // Verify the selected swatch got the active border class
  const active = await page.$eval(sel, (el) => el.className.includes("border-foreground"));
  console.log(key, "-> --aura:", aura, "| active ring:", active);
}

// Visual proof: screenshot hero with rose theme applied
await page.click('button[aria-label="rose theme"]');
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: ".gif-frames/theme-rose.png", clip: { x: 0, y: 0, width: 1440, height: 700 } });
await page.click('button[aria-label="blue theme"]');
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: ".gif-frames/theme-blue.png", clip: { x: 0, y: 0, width: 1440, height: 700 } });
console.log("screenshots saved");

await browser.close();
