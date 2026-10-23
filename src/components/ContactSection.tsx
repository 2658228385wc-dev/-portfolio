import { ArrowUpRight, Phone, Mail, QrCode } from "lucide-react";
import FadeIn from "./FadeIn";
import { CONTACT_QR } from "../content/images";
import { contact } from "../content/copy";

const ROWS = [
  {
    icon: Phone,
    label: "Phone / 手机",
    value: contact.phoneDisplay,
    href: `tel:${contact.phone}`,
  },
  {
    icon: Mail,
    label: "Email / 邮箱",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: QrCode,
    label: "WeChat / 微信",
    value: contact.wechatNote,
    href: null,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="rounded-t-[40px] bg-white px-5 pb-10 pt-20 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={30}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#0C0C0C] opacity-50">
            Contact / 联系方式
          </p>
        </FadeIn>

        <FadeIn delay={0.08} y={40}>
          <h2
            className="mt-4 font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
            style={{ fontSize: "clamp(2.75rem, 11vw, 150px)" }}
          >
            {contact.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.16} y={30}>
          <p
            className="mt-6 max-w-[560px] font-light leading-relaxed text-[#0C0C0C] opacity-60"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)" }}
          >
            {contact.intro}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          {/* 左：联系方式列表 */}
          <FadeIn delay={0.22} y={30}>
            <div className="border-t" style={{ borderColor: "rgba(12,12,12,0.15)" }}>
              {ROWS.map((row) => {
                const Icon = row.icon;
                const inner = (
                  <>
                    <span className="flex items-center gap-3 text-[#0C0C0C] opacity-45">
                      <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:text-xs">
                        {row.label}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span
                        className="font-medium tracking-tight text-[#0C0C0C] transition-opacity duration-200"
                        style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.75rem)" }}
                      >
                        {row.value}
                      </span>
                      {row.href && (
                        <ArrowUpRight className="h-4 w-4 text-[#0C0C0C] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-50 md:h-5 md:w-5" />
                      )}
                    </span>
                  </>
                );

                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    className="group flex flex-wrap items-center justify-between gap-3 border-b py-6 transition-colors duration-200 hover:border-black/40 md:py-8"
                    style={{ borderColor: "rgba(12,12,12,0.15)" }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-3 border-b py-6 md:py-8"
                    style={{ borderColor: "rgba(12,12,12,0.15)" }}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* 右：微信二维码 */}
          <FadeIn delay={0.3} y={30}>
            <div className="rounded-[36px] border-2 p-3 sm:rounded-[44px] sm:p-4" style={{ borderColor: "rgba(12,12,12,0.2)" }}>
              <div className="overflow-hidden rounded-[26px] bg-white p-3 sm:rounded-[34px] sm:p-4">
                {CONTACT_QR ? (
                  <img
                    src={CONTACT_QR}
                    alt={contact.qrAlt}
                    className="h-[180px] w-[180px] object-contain sm:h-[200px] sm:w-[200px]"
                  />
                ) : (
                  <div className="flex h-[180px] w-[180px] items-center justify-center rounded-[16px] border border-dashed border-[#0C0C0C]/25 sm:h-[200px] sm:w-[200px]">
                    <span className="text-center text-xs leading-relaxed text-[#0C0C0C]/40">
                      微信二维码
                      <br />
                      待接入
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#0C0C0C] opacity-55">
                {contact.qrHint}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* 页脚 */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-[0.7rem] uppercase tracking-[0.2em] text-[#0C0C0C] opacity-50 sm:mt-24" style={{ borderColor: "rgba(12,12,12,0.15)" }}>
          <span>{contact.footer}</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}
