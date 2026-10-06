// Generates every Voxclunibus print file, preview and logo from designs.json.
//
// Run: node brand/tools/render.js
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
//
// Output:
//   brand/print/<slug>-dark.png   bone print for black shirts   (3600x4800, transparent)
//   brand/print/<slug>-light.png  ink print for natural shirts  (3600x4800, transparent)
//   brand/previews/<slug>-<variant>.png  simple shirt mockups for the lookbook
//   brand/logo/*                  wordmark, icon and asterisk mark

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const designs = JSON.parse(fs.readFileSync(path.join(__dirname, 'designs.json'), 'utf8'));

const COLORS = {
  ink: '#141414',
  bone: '#EDE8DF',
  signal: '#FF4F1F',
  shirtBlack: '#1B1B1B',
  shirtNatural: '#E8E0CC',
};

// Printful DTG front print area for Bella+Canvas 3001 is 12x16 in; 300 dpi.
const PRINT_W = 3600;
const PRINT_H = 4800;
const BLOCK_W = 3000;
const MAX_FONT = 950;

const font = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, 'fonts', file)).toString('base64')}`;

const FONT_CSS = `
  @font-face { font-family: 'Anton'; src: url(${font('anton-400.woff2')}) format('woff2'); }
  @font-face { font-family: 'Plex Mono'; src: url(${font('plex-mono-400.woff2')}) format('woff2'); }
`;

const ASTERISK_SVG = (color) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round">
  <line x1="50" y1="8" x2="50" y2="92"/>
  <line x1="50" y1="8" x2="50" y2="92" transform="rotate(60 50 50)"/>
  <line x1="50" y1="8" x2="50" y2="92" transform="rotate(120 50 50)"/>
</svg>`.trim();

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function printHtml(design, textColor) {
  const lines = design.lines.map((line, i) => {
    const mark = i === design.lines.length - 1 ? `<span class="mark">${ASTERISK_SVG(COLORS.signal)}</span>` : '';
    return `<div class="line"><span class="measure">${esc(line)}${mark}</span></div>`;
  }).join('');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${FONT_CSS}
    html, body { margin: 0; background: transparent; }
    .canvas { width: ${PRINT_W}px; height: ${PRINT_H}px; position: relative; }
    .block { position: absolute; left: ${(PRINT_W - BLOCK_W) / 2}px; top: 260px; width: ${BLOCK_W}px; color: ${textColor}; }
    .main { font-family: 'Anton'; line-height: 0.98; letter-spacing: 0.005em; }
    .line { white-space: nowrap; }
    .measure { display: inline-block; }
    .mark { display: inline-block; width: 0.34em; height: 0.34em; margin-left: 0.06em; vertical-align: top; position: relative; top: 0.1em; }
    .mark svg { width: 100%; height: 100%; display: block; }
    .rule { height: 14px; background: ${textColor}; margin-top: 150px; }
    .foot { font-family: 'Plex Mono'; font-size: 150px; line-height: 1.3; margin-top: 110px; display: flex; gap: 0.45em; }
    .foot .mark { width: 0.7em; height: 0.7em; margin: 0.18em 0 0; flex: none; top: 0; }
  </style></head><body><div class="canvas"><div class="block">
    <div class="main" id="main">${lines}</div>
    <div class="rule"></div>
    <div class="foot"><span class="mark">${ASTERISK_SVG(COLORS.signal)}</span><span>${esc(design.footnote)}</span></div>
  </div></div></body></html>`;
}

// Every line shares one font size: the largest that lets the longest line fill the block.
async function fitMainText(page) {
  await page.evaluate(({ blockW, maxFont }) => {
    const main = document.getElementById('main');
    main.style.fontSize = '100px';
    const widest = Math.max(...[...main.querySelectorAll('.measure')].map((el) => el.getBoundingClientRect().width));
    main.style.fontSize = `${Math.min(maxFont, Math.floor((100 * blockW) / widest))}px`;
  }, { blockW: BLOCK_W, maxFont: MAX_FONT });
}

const TEE_PATH = 'M330 60 Q500 140 670 60 L940 180 L860 380 L770 340 L770 900 L230 900 L230 340 L140 380 L60 180 Z';

function previewHtml(printPng, shirtColor) {
  const data = `data:image/png;base64,${printPng.toString('base64')}`;
  return `<!doctype html><html><head><style>
    html, body { margin: 0; background: transparent; }
  </style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="960" viewBox="0 0 1000 960">
    <path d="${TEE_PATH}" fill="${shirtColor}"/>
    <path d="M330 60 Q500 140 670 60" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="10"/>
    <image href="${data}" x="320" y="170" width="360" height="480"/>
  </svg></body></html>`;
}

function wordmarkHtml(textColor) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${FONT_CSS}
    html, body { margin: 0; background: transparent; }
    .wm { display: inline-flex; align-items: flex-start; font-family: 'Anton'; font-size: 400px; line-height: 1; color: ${textColor}; padding: 40px 50px; letter-spacing: 0.01em; }
    .mark { width: 0.32em; height: 0.32em; margin-left: 0.05em; margin-top: 0.08em; }
    .mark svg { width: 100%; height: 100%; display: block; }
  </style></head><body><div class="wm" id="wm">VOXCLUNIBUS<span class="mark">${ASTERISK_SVG(COLORS.signal)}</span></div></body></html>`;
}

function iconHtml() {
  return `<!doctype html><html><head><style>
    html, body { margin: 0; }
    .icon { width: 1024px; height: 1024px; background: ${COLORS.ink}; display: grid; place-items: center; }
    .icon svg { width: 560px; height: 560px; }
  </style></head><body><div class="icon">${ASTERISK_SVG(COLORS.signal)}</div></body></html>`;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const design of designs) {
    for (const [variant, textColor, shirtColor] of [
      ['dark', COLORS.bone, COLORS.shirtBlack],
      ['light', COLORS.ink, COLORS.shirtNatural],
    ]) {
      await page.setViewportSize({ width: PRINT_W, height: PRINT_H });
      await page.setContent(printHtml(design, textColor));
      await page.evaluate(() => document.fonts.ready);
      await fitMainText(page);
      const png = await page.screenshot({ omitBackground: true });
      fs.writeFileSync(path.join(ROOT, 'print', `${design.slug}-${variant}.png`), png);

      await page.setViewportSize({ width: 1000, height: 960 });
      await page.setContent(previewHtml(png, shirtColor));
      await page.screenshot({ path: path.join(ROOT, 'previews', `${design.slug}-${variant}.png`), omitBackground: true });
      console.log(`rendered ${design.slug} (${variant})`);
    }
  }

  for (const [name, color] of [['wordmark-bone', COLORS.bone], ['wordmark-ink', COLORS.ink]]) {
    await page.setViewportSize({ width: 3000, height: 600 });
    await page.setContent(wordmarkHtml(color));
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#wm').screenshot({ path: path.join(ROOT, 'logo', `${name}.png`), omitBackground: true });
  }

  await page.setViewportSize({ width: 1024, height: 1024 });
  await page.setContent(iconHtml());
  await page.screenshot({ path: path.join(ROOT, 'logo', 'icon-1024.png') });
  fs.writeFileSync(path.join(ROOT, 'logo', 'asterisk.svg'), ASTERISK_SVG(COLORS.signal) + '\n');

  await browser.close();
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
