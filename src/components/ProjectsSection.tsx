import FadeIn from "./FadeIn";
import FolderCarousel from "./FolderCarousel";
import { projects } from "../content/copy";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:pt-28"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading px-5 text-center font-black uppercase leading-none tracking-tight sm:px-8 md:px-10"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          {projects.heading}
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={30}>
        <div className="mt-6 sm:mt-8">
          <FolderCarousel />
        </div>

        <p className="mt-2 px-5 text-center font-system text-[0.7rem] uppercase tracking-[0.2em] text-[#D7E2EA] opacity-35 sm:mt-4">
          拖拽 / ← → 切换
        </p>
      </FadeIn>
    </section>
  );
}
