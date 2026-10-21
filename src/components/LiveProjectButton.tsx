import { ArrowUpRight } from "lucide-react";
import { projects } from "../content/copy";
import { navigate } from "../router";

type LiveProjectButtonProps = {
  label?: string;
  /** 跳转地址，默认项目详情占位 */
  href?: string;
};

export default function LiveProjectButton({
  label = projects.cta,
  href = "#/project/01",
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        // 沙箱预览会拦截锚点导航，改用事件驱动路由
        e.preventDefault();
        navigate(href);
      }}
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      {label}
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
    </a>
  );
}
