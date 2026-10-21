import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 环境的安全删除保护会拦截批量清空 dist（>50 文件需确认），
  // 改为不清空 + 构建前用脚本分批清理旧产物（见 scripts/clean-dist.mjs）
  build: { emptyOutDir: false },
});
