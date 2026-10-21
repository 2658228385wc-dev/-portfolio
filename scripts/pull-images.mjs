/**
 * 把 image-manifest.json 里的所有远程图拉到 src/assets/local/，按约定命名。
 *
 *   npm run images:pull            # 只下载缺失的
 *   npm run images:pull -- --force # 全部重新下载（覆盖本地）
 *
 * 拉完之后直接覆盖同名文件即可换图，代码零改动。
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "src/assets/local");
const force = process.argv.includes("--force");

const EXT_BY_TYPE = {
  "image/gif": "gif",
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

const manifest = JSON.parse(
  await readFile(path.join(root, "src/content/image-manifest.json"), "utf8")
);

await mkdir(outDir, { recursive: true });

/** 已存在的同名文件（任意扩展名） */
const existing = new Map(
  (await readdir(outDir)).map((f) => [f.replace(/\.[^.]+$/, ""), f])
);

const entries = Object.entries(manifest);
const queue = [...entries];
let done = 0;
let skipped = 0;
const failed = [];

async function pull([name, url]) {
  if (existing.has(name) && !force) {
    skipped += 1;
    return;
  }

  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) throw new Error(`suspiciously small (${buf.length}B)`);

  const type = (res.headers.get("content-type") ?? "").split(";")[0].trim();
  const urlExt = path.extname(new URL(url).pathname).slice(1).toLowerCase();
  const ext = EXT_BY_TYPE[type] ?? ["png", "jpg", "jpeg", "webp", "gif", "avif"].find((e) => e === urlExt) ?? "png";

  const file = `${name}.${ext}`;
  await writeFile(path.join(outDir, file), buf);
  existing.set(name, file);
  done += 1;
  console.log(`  ✓ ${file}  ${(buf.length / 1024 / 1024).toFixed(1)}MB`);
}

// 并发 4，避免把源站打得太狠
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    if (!item) break;
    try {
      await pull(item);
    } catch (err) {
      failed.push(`${item[0]}: ${err.message}`);
    }
  }
}

console.log(`拉取 ${entries.length} 张图 → src/assets/local/`);
await Promise.all([worker(), worker(), worker(), worker()]);

console.log(`\n完成：新增 ${done}，跳过已有 ${skipped}，失败 ${failed.length}`);
if (failed.length) {
  console.log("失败清单：");
  failed.forEach((f) => console.log("  × " + f));
  process.exitCode = 1;
}
