// 사진 크기별 파일 만들기 — npm run build · dev 앞에 저절로 돈다(prebuild · predev).
//
//   photos/<묶음>/<이름>.jpg            마스터(긴 변 2400 · JPEG 85 · 메타데이터 없이) — 저장소에 둔다
//   public/photos/<묶음>/<이름>-<폭>.jpg  크기별 파일 — 여기서 만든다(.gitignore)
//   lib/photos.manifest.json            사진마다 원래 폭 · 높이 — 커밋한다
//
// 폭은 lib/photo-widths.json 하나(사진 쪽 loader 와 같이 쓴다). 원래 폭보다 키우지 않는다.
// 이미 있고 마스터보다 새 파일은 건너뛴다 — 다시 돌려도 결과가 같다.
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "photos");
const OUT = path.join(ROOT, "public/photos");
const MANIFEST = path.join(ROOT, "lib/photos.manifest.json");
const WIDTHS = JSON.parse(
  await readFile(path.join(ROOT, "lib/photo-widths.json"), "utf8"),
);
const QUALITY = 80;

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

/** photos/ 아래의 .jpg — '<묶음>/<이름>' 순으로 */
async function masters() {
  const entries = await readdir(SRC, {
    recursive: true,
    withFileTypes: true,
  }).catch((error) => {
    if (error.code === "ENOENT") return []; // 사진이 아직 없다
    throw error;
  });
  return entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => path.relative(SRC, path.join(e.parentPath, e.name)))
    .sort();
}

const started = performance.now();
const manifest = {};
let made = 0;
let skipped = 0;

for (const file of await masters()) {
  const key = file
    .replace(/\.jpe?g$/i, "")
    .split(path.sep)
    .join("/");
  const src = path.join(SRC, file);
  const { width, height } = await sharp(src).metadata();
  manifest[key] = { width, height };

  await mkdir(path.join(OUT, path.dirname(file)), { recursive: true });
  const srcTime = await mtime(src);
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${key}-${w}.jpg`);
    if ((await mtime(out)) > srcTime) {
      skipped++;
      continue;
    }
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(out);
    made++;
  }
}

const json = `${JSON.stringify(manifest, null, 2)}\n`;
const before = await readFile(MANIFEST, "utf8").catch(() => "");
if (made + skipped > 0 && json !== before) await writeFile(MANIFEST, json);

const ms = Math.round(performance.now() - started);
console.log(
  `photos: 사진 ${Object.keys(manifest).length}장 — 만듦 ${made} · 건너뜀 ${skipped} (${ms}ms)`,
);
