/**
 * 分批删除 dist 旧产物：环境的 safe-delete shim 限制单次批量删除 ≤50 个文件，
 * 这里按 40 个一批逐批删除。用法：npm run clean（构建前自动执行）
 */
import fs from "node:fs";
import path from "node:path";
const DIST = path.resolve(process.cwd(), "dist");
function rmBatch(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir).map((f) => path.join(dir, f));
  for (let i = 0; i < entries.length; i += 40) {
    for (const p of entries.slice(i, i + 40)) fs.rmSync(p, { recursive: true, force: true });
  }
  // 目录自身已空，逐层删除
  let cur = dir;
  while (fs.existsSync(cur) && fs.readdirSync(cur).length === 0) {
    fs.rmdirSync(cur);
    cur = path.dirname(cur);
    if (cur === path.dirname(DIST) && cur !== DIST) break;
  }
}
rmBatch(DIST);
console.log("dist cleaned");
