/**
 * 把 dist/ 打成**一个自包含 HTML**：CSS、JS、所有图片、字体全部内联。
 * 产物可以直接双击用浏览器打开（file:// 也能跑），也可以发给别人。
 *
 * 用法：npm run build:standalone
 * 依赖：先跑 npm run build（或本脚本会自己触发一次构建）
 * 输出：../王诚-作品集.html（与 jack-3d-creator 同级）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const CACHE = path.join(__dirname, ".font-cache");
const OUT = path.resolve(ROOT, "..", "王诚-作品集.html");

const MIME = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

/* ── 1. 确保有构建产物 ───────────────────────────────────── */
if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.log("dist 不存在，先构建…");
  execFileSync("npx", ["vite", "build", "--base", "./"], { cwd: ROOT, stdio: "inherit" });
}

/* ── 2. 字体：下载 Kanit latin 子集并转成 data URI（带缓存） ── */
async function inlineFonts() {
  const cacheFile = path.join(CACHE, "kanit-latin-inline.css");
  if (fs.existsSync(cacheFile)) {
    console.log("字体：命中缓存");
    return fs.readFileSync(cacheFile, "utf8");
  }
  try {
    fs.mkdirSync(CACHE, { recursive: true });
    const cssRes = await fetch(FONT_CSS_URL, { headers: { "User-Agent": UA } });
    const css = await cssRes.text();
    // Google 按 /* subset */ 分块，只保留 latin（中文走系统字体，不需要子集）
    const parts = css.split(/\/\*\s*([a-z-]+)\s*\*\//i);
    const blocks = [];
    for (let i = 1; i < parts.length; i += 2) {
      if (parts[i].trim() === "latin") blocks.push(parts[i + 1].trim());
    }
    let out = blocks.join("\n");
    for (const [, url] of out.matchAll(/url\((https:[^)]+)\)/g)) {
      const buf = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
      out = out.split(url).join(`data:font/woff2;base64,${buf.toString("base64")}`);
    }
    fs.writeFileSync(cacheFile, out);
    console.log(`字体：内联 ${blocks.length} 个字重`);
    return out;
  } catch (e) {
    console.warn("字体内联失败，回退到系统字体：", e.message);
    return "";
  }
}

/* ── 3. 资源 → data URI ─────────────────────────────────── */
const assetsDir = path.join(DIST, "assets");
const dataUri = {};
for (const f of fs.readdirSync(assetsDir)) {
  const ext = path.extname(f).toLowerCase();
  if (!MIME[ext]) continue;
  dataUri[f] = `data:${MIME[ext]};base64,` + fs.readFileSync(path.join(assetsDir, f)).toString("base64");
}

let html = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const jsFile = html.match(/src="\.?\/?assets\/([^"]+\.js)"/)?.[1];
const cssFile = html.match(/href="\.?\/?assets\/([^"]+\.css)"/)?.[1];
if (!jsFile || !cssFile) throw new Error("dist/index.html 里没找到 js/css 入口，构建可能不完整");

let js = fs.readFileSync(path.join(assetsDir, jsFile), "utf8");
const css = fs.readFileSync(path.join(assetsDir, cssFile), "utf8");

// Vite 可能把资源写成两种形式，都要内联：
//   a) new URL("xxx.webp", import.meta.url).href
//   b) 字符串字面量 "/assets/xxx.webp"（import.meta.glob ?url 的产物）
let inlined = 0;
function inlineRef(file) {
  if (!dataUri[file]) return null;
  inlined += 1;
  return dataUri[file];
}
js = js.replace(/new URL\("([^"]+)",\s*import\.meta\.url\)\.href/g, (m, file) => inlineRef(file) ?? m);
js = js.replace(/"(\/?assets\/[^"]+\.(?:webp|png|jpe?g|gif|avif|svg))"/g, (m, p) => {
  const uri = inlineRef(p.replace(/^\/?assets\//, ""));
  return uri ? JSON.stringify(uri) : m;
});
// CSS 里的相对引用（保险起见一并处理）
const cssInlined = css.replace(/url\((['"]?)\.?\/?assets\/([^'")]+)\1\)/g, (m, q, file) => {
  const uri = dataUri[file];
  if (!uri) return m;
  inlined += 1;
  return `url(${q}${uri}${q})`;
});

const fontCss = await inlineFonts();

/* ── 4. 拼装（全部用函数式 replace，避免 $& 等被当成替换模式） ── */
html = html
  .replace(/<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>/g, () => "")
  .replace(/<script type="module"[^>]*src="[^"]*"><\/script>/, () => "")
  .replace(/<link rel="stylesheet"[^>]*href="[^"]*">/, () => "")
  .replace("</head>", () => `<style>\n${fontCss}\n${cssInlined}\n</style>\n</head>`)
  .replace("<div id=\"root\"></div>", () => `<div id="root"></div>\n    <script type="module">\n${js}\n</script>`);

fs.writeFileSync(OUT, html);

// 语法自检：内联脚本必须能过 node --check
const inlineJs = html.match(/<script type="module">\n([\s\S]*?)\n<\/script>/)?.[1] ?? "";
const tmp = path.join(CACHE, ".syntax-check.mjs");
fs.mkdirSync(CACHE, { recursive: true });
fs.writeFileSync(tmp, inlineJs);
try {
  execFileSync(process.execPath, ["--check", tmp], { stdio: "pipe" });
  console.log("语法自检：通过");
} catch (e) {
  console.error("语法自检失败：\n" + e.stderr?.toString());
  process.exitCode = 1;
}

console.log(`内联图片 ${inlined}/${Object.keys(dataUri).length} 个`);
console.log(`输出 ${OUT}（${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB）`);
