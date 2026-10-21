import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { caseProcessImage, projectGallery } from "../content/images";
import { projectDetails, projects } from "../content/copy";
import { navigate } from "../router";

type Props = {
  projectId: string;
  onBack: () => void;
};

export default function ProjectDetailPage({ projectId, onBack }: Props) {
  const index = projectDetails.findIndex((d) => d.number === projectId);
  const detail = projectDetails[index];
  const meta = projects.items[index];
  const gallery = projectGallery(projectId);
  const [activePart, setActivePart] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [projectId]);

  // 滚动到当前 part 时高亮左侧目录（同旧站 IntersectionObserver 方案）
  useEffect(() => {
    const parts = document.querySelectorAll("[data-case-part]");
    if (!parts.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActivePart(Number((e.target as HTMLElement).dataset.casePart));
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    parts.forEach((p) => obs.observe(p));
    return () => obs.disconnect();
  }, [projectId, detail?.parts.length]);

  if (!detail || !meta) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0C0C0C] text-[#D7E2EA]">
        <p className="text-lg opacity-70">没有找到这个项目</p>
        <button
          onClick={onBack}
          className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10"
        >
          返回首页
        </button>
      </div>
    );
  }

  const next = projectDetails[(index + 1) % projectDetails.length];
  const nextMeta = projects.items[(index + 1) % projectDetails.length];
  const [hero, ...rest] = gallery;

  /** 过程图编号 → 本地 URL（缺图自动跳过） */
  const processImgs = (nums: number[] | undefined) =>
    (nums ?? []).map((n) => caseProcessImage(projectId, n)).filter(Boolean) as string[];

  const scrollToPart = (i: number) => {
    document
      .querySelector(`[data-case-part="${i}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      {/* 顶栏 */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0C0C0C]/85 px-5 py-4 backdrop-blur-md sm:px-8 md:px-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#D7E2EA] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
          Case {meta.number}
        </span>
      </header>

      {/* Hero：label + 标题 + 副标题 */}
      <section className="px-5 pt-14 sm:px-8 sm:pt-20 md:px-12 md:pt-28">
        <FadeIn y={40}>
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
            Case {meta.number}
            {detail.meta[1]?.value && detail.meta[1].value !== "——"
              ? ` / ${detail.meta[1].value}`
              : ""}
          </p>
          <h1
            className="hero-heading mt-3 font-black uppercase leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
          >
            {meta.name}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#D7E2EA] opacity-80 sm:mt-7 sm:text-lg">
            {detail.tagline}
          </p>
        </FadeIn>
      </section>

      {/* Hero 大图 */}
      {hero && (
        <FadeIn delay={0.15} y={50} className="mt-10 px-5 sm:mt-14 sm:px-8 md:px-12">
          <div className="overflow-hidden rounded-[32px] border-2 border-[#D7E2EA]/20 sm:rounded-[50px]">
            <img src={hero} alt={`${meta.name} cover`} className="w-full object-cover" />
          </div>
        </FadeIn>
      )}

      {/* Meta 四格：客户 / 时间 / 角色 / 平台 */}
      <section className="px-5 sm:px-8 md:px-12">
        <FadeIn y={30} className="mt-10 sm:mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:rounded-[32px] md:grid-cols-4">
            {detail.meta.map((m) => (
              <div key={m.label} className="bg-[#0C0C0C] p-5 sm:p-7">
                <div className="text-[11px] uppercase tracking-widest text-[#D7E2EA] opacity-50 sm:text-xs">
                  {m.label}
                </div>
                <div className="mt-2 text-sm font-medium text-white/90 sm:text-base">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Body：左侧 sticky 目录 + 右侧 Part 分章 */}
      <main className="mx-auto mt-16 max-w-6xl px-5 sm:mt-24 sm:px-8 md:px-12">
        <div className="md:grid md:grid-cols-[240px_1fr] md:gap-14">
          {/* 目录 */}
          <aside className="mb-10 md:mb-0">
            <div className="md:sticky md:top-28">
              <div className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-50">
                目录 / Process
              </div>
              <ul className="mt-4 space-y-1 border-l border-white/10">
                {detail.parts.map((p, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollToPart(i)}
                      className={`-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                        activePart === i
                          ? "border-white text-white"
                          : "border-transparent text-[#D7E2EA]/50 hover:text-[#D7E2EA]"
                      }`}
                    >
                      <span className="mr-2 text-xs opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-50">
                  关键结果
                </div>
                <ul className="mt-3 space-y-2">
                  {detail.results.map((r, i) => (
                    <li key={i} className="text-sm text-white/80">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* 分章内容 */}
          <div>
            {detail.parts.map((p, i) => (
              <section
                key={i}
                data-case-part={i}
                className="border-t border-white/10 py-10 first:border-t-0 first:pt-0 sm:py-14"
              >
                <FadeIn y={30}>
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-50 sm:text-sm">
                    Part {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="hero-heading mt-2 font-black uppercase leading-tight tracking-tight sm:mt-3"
                    style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
                  >
                    {p.title}
                  </h2>
                  {p.intro && (
                    <p className="mt-5 max-w-2xl text-sm leading-loose text-[#D7E2EA] opacity-90 sm:text-base">
                      {p.intro}
                    </p>
                  )}
                  {/* 小节：标题 + 过程图 */}
                  {p.sections?.map((s, si) => {
                    const imgs = processImgs(s.images);
                    if (!imgs.length) return null;
                    return (
                      <div key={si} className="mt-10">
                        <h3 className="border-l-2 border-white/30 pl-3 text-sm font-semibold text-white/90 sm:text-base">
                          {s.title}
                        </h3>
                        <div className="mt-4 space-y-4 sm:space-y-5">
                          {imgs.map((src, gi) => (
                            <FadeIn key={gi} y={30}>
                              <div className="overflow-hidden rounded-[20px] border border-[#D7E2EA]/15 sm:rounded-[28px]">
                                <img
                                  src={src}
                                  alt={`${p.title} · ${s.title} ${gi + 1}`}
                                  loading="lazy"
                                  className="w-full object-cover"
                                />
                              </div>
                            </FadeIn>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {/* 不分小节的直属图（如项目总结） */}
                  {(() => {
                    const imgs = processImgs(p.images);
                    if (!imgs.length) return null;
                    return (
                      <div className="mt-8 space-y-4 sm:space-y-5">
                        {imgs.map((src, gi) => (
                          <FadeIn key={gi} y={30}>
                            <div className="overflow-hidden rounded-[20px] border border-[#D7E2EA]/15 sm:rounded-[28px]">
                              <img
                                src={src}
                                alt={`${p.title} ${gi + 1}`}
                                loading="lazy"
                                className="w-full object-cover"
                              />
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    );
                  })()}
                </FadeIn>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* 过程图库（project-0N-b/c 及后续 d…） */}
      {rest.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl space-y-4 px-5 sm:mt-20 sm:space-y-6 sm:px-8 md:px-12">
          {rest.map((src, i) => (
            <FadeIn key={i} y={40}>
              <div className="overflow-hidden rounded-[28px] border-2 border-[#D7E2EA]/15 sm:rounded-[40px]">
                <img
                  src={src}
                  alt={`${meta.name} preview ${i + 2}`}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
            </FadeIn>
          ))}
        </section>
      )}

      {/* 底部导航：全部作品 + Next case */}
      <section className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8 md:px-12">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <button
            onClick={onBack}
            className="group rounded-[28px] border-2 border-[#D7E2EA]/20 p-6 text-left transition-colors hover:border-[#D7E2EA]/50 sm:rounded-[40px] sm:p-8"
          >
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
              Back to
            </span>
            <div className="mt-2 flex items-center justify-between gap-3">
              <h3 className="hero-heading text-xl font-black uppercase leading-tight sm:text-2xl">
                全部作品
              </h3>
              <ArrowLeft className="h-5 w-5 shrink-0 opacity-60 transition-transform group-hover:-translate-x-1" />
            </div>
          </button>
          <a
            href={`#/project/${next.number}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`#/project/${next.number}`);
            }}
            className="group rounded-[28px] border-2 border-[#D7E2EA]/20 p-6 transition-colors hover:border-[#D7E2EA]/50 sm:rounded-[40px] sm:p-8"
          >
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60">
              Next case
            </span>
            <div className="mt-2 flex items-center justify-between gap-3">
              <h3 className="hero-heading text-xl font-black uppercase leading-tight sm:text-2xl">
                {nextMeta.name}
              </h3>
              <ArrowUpRight className="h-5 w-5 shrink-0 opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>
        </div>

        <div className="h-16 sm:h-24" />
      </section>
    </div>
  );
}
