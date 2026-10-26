/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: [
          "Kanit",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Noto Sans SC",
          "sans-serif",
        ],
        /**
         * 正文层：不带 Kanit。中文与拉丁/数字全部由同一套系统字体渲染，
         * 避免正文里 Kanit 的数字与英文字母和中文混排时字重、x-height 不协调。
         */
        system: [
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Noto Sans SC",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
