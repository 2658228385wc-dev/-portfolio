/**
 * 全站图片的唯一出口。换图不需要改这个文件，也不需要改组件。
 *
 * ── 怎么换 ──────────────────────────────────────────────────
 * 1. 准备图片，按下面的名字命名（扩展名随意：png / jpg / jpeg / webp / avif / gif）
 * 2. 丢进 src/assets/local/
 * 3. 生效。本地文件优先级高于 image-manifest.json 里的远程原图，
 *    构建时就解析好，不存在运行时 404。
 *
 * 名字对照：
 *   hero-portrait                   首屏人像
 *   about-moon / about-object       关于区左上 / 左下装饰
 *   about-lego / about-group        关于区右上 / 右下装饰
 *   marquee-01 … marquee-21         横向滚动图（顺序即展示顺序，前 11 张走第一行）
 *   project-01-a / -b / -c          项目 1 左列上 / 左列下 / 右列
 *   project-02-…  project-03-…      同理
 *
 * 想先把现有远程图拉到本地再逐张覆盖，跑：npm run images:pull
 */

import manifest from "./image-manifest.json";

const LOCAL_MODULES = import.meta.glob(
  "../assets/local/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

/** 文件名（不含扩展名）→ 打包后的 URL */
const LOCAL: Record<string, string> = Object.fromEntries(
  Object.entries(LOCAL_MODULES).map(([filePath, url]) => [
    filePath.split("/").pop()!.replace(/\.[^.]+$/, ""),
    url,
  ])
);

const REMOTE = manifest as Record<string, string>;

/** 本地有就用本地，否则用远程原图 */
function pick(name: string): string {
  return LOCAL[name] ?? REMOTE[name];
}

/* ─────────────────────────── Hero ─────────────────────────── */
export const HERO_PORTRAIT = pick("hero-portrait");

/* ─────────────────────────── About ────────────────────────── */
export const ABOUT_DECOR = {
  moon: pick("about-moon"),
  object: pick("about-object"),
  lego: pick("about-lego"),
  group: pick("about-group"),
};

/* ────────────────────────── Marquee ───────────────────────── */
/** 8 张，顺序即展示顺序：前 4 张走第一行，后 4 张走第二行 */
const MARQUEE_COUNT = 8;
export const MARQUEE_IMAGES = Array.from({ length: MARQUEE_COUNT }, (_, i) =>
  pick(`marquee-${String(i + 1).padStart(2, "0")}`)
);

/* ────────────────────────── Projects ──────────────────────── */
type Cover = { col1: [string, string]; col2: string };

export const PROJECT_COVERS: Cover[] = ["01", "02", "03", "04"].map((n) => ({
  col1: [pick(`project-${n}-a`), pick(`project-${n}-b`)],
  col2: pick(`project-${n}-c`),
}));

/**
 * 项目详情页图库：默认 a/b/c 三张封面，本地图多放一张就多显示一张
 * （命名 project-0N-d / -e / -f，放 src/assets/local/ 即生效）
 */
export function projectGallery(n: string): string[] {
  return ["a", "b", "c", "d", "e", "f"]
    .map((l) => pick(`project-${n}-${l}`))
    .filter(Boolean);
}

/**
 * 详情页分章过程图：命名 case-0N-process-XX（XX=01…99，对应旧版作品集
 * 的 farmland-process-NN 编号）。本地缺哪张就跳过哪张，不会 404。
 */
export function caseProcessImage(n: string, xx: number): string | undefined {
  const key = `case-${n}-process-${String(xx).padStart(2, "0")}`;
  return LOCAL[key];
}
