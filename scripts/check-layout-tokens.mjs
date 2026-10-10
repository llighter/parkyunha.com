#!/usr/bin/env node
// 레이아웃 숫자가 CSS(tokens.css · globals.css)와 TS(lib/layout.ts)에서 같은지 확인한다.
// 실행: node scripts/check-layout-tokens.mjs   (다르면 종료 코드 1)
import fs from "node:fs";

const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const globals = read("app/globals.css");
const tokens = read("app/styles/tokens.css");
const ts = read("lib/layout.ts");

const num = (src, re, what) => {
  const m = src.match(re);
  if (!m) throw new Error(`찾지 못함: ${what}`);
  return Function(`return (${m[1].replace(/px/g, "")})`)();
};

// @variant 블록만 잘라낸다 (중첩 한 단계)
const block = (name) => {
  const start = tokens.indexOf(`@variant ${name} {`);
  if (start < 0) throw new Error(`@variant ${name} 없음`);
  let depth = 0;
  for (let i = tokens.indexOf("{", start); i < tokens.length; i++) {
    if (tokens[i] === "{") depth++;
    if (tokens[i] === "}" && --depth === 0) return tokens.slice(start, i);
  }
};
const lane = (src, key, media) => {
  const raw = src.match(new RegExp(`--lane-${key}:\\s*([^;]+);`))[1];
  return Function("media", `return ${raw.replace(/var\(--lane-media\)/g, "media").replace(/px/g, "").replace(/calc/g, "")}`)(media);
};
const phoneRoot = tokens.slice(tokens.indexOf("/* 레인 — 폰"), tokens.indexOf("@variant phone-lg"));

const css = {
  phoneLg: num(globals, /--breakpoint-phone-lg:\s*([\d.]+px)/, "phone-lg"),
  tablet: num(globals, /--breakpoint-tablet:\s*([\d.]+px)/, "tablet"),
  desktop: num(globals, /--breakpoint-desktop:\s*([\d.]+px)/, "desktop"),
  lanes: {},
};
const phoneMedia = lane(phoneRoot, "media");
css.lanes.phone = { text: lane(phoneRoot, "text"), media: phoneMedia, wide: phoneMedia };
for (const bp of ["tablet", "desktop"]) {
  const b = block(bp);
  const media = lane(b, "media");
  css.lanes[bp] = { text: lane(b, "text", media), media, wide: lane(b, "wide") };
}

const tsv = {
  phoneLg: num(ts, /phoneLg:\s*([\d.]+)/, "phoneLg"),
  tablet: num(ts, /\btablet:\s*([\d.]+),/, "tablet"),
  desktop: num(ts, /\bdesktop:\s*([\d.]+),/, "desktop"),
  lanes: {},
};
for (const bp of ["phone", "tablet", "desktop"]) {
  const m = ts.match(new RegExp(`${bp}:\\s*\\{\\s*text:\\s*([^,]+),\\s*media:\\s*([\\d.]+),\\s*wide:\\s*([\\d.]+)`));
  tsv.lanes[bp] = { text: Function(`return ${m[1]}`)(), media: +m[2], wide: +m[3] };
}

const diffs = [];
for (const k of ["phoneLg", "tablet", "desktop"]) if (css[k] !== tsv[k]) diffs.push(`${k}: CSS ${css[k]} ≠ TS ${tsv[k]}`);
for (const bp of ["phone", "tablet", "desktop"])
  for (const k of ["text", "media", "wide"])
    if (Math.abs(css.lanes[bp][k] - tsv.lanes[bp][k]) > 0.01) diffs.push(`${bp}.${k}: CSS ${css.lanes[bp][k]} ≠ TS ${tsv.lanes[bp][k]}`);

if (diffs.length) {
  console.error("레이아웃 토큰이 어긋났습니다:\n  " + diffs.join("\n  "));
  process.exit(1);
}
console.log("레이아웃 토큰 일치 ✓", JSON.stringify(css.lanes));
