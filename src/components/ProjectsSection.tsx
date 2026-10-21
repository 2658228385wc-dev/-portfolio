import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { PROJECT_COVERS } from "../content/images";
import { projects } from "../content/copy";

type Project = {
  number: string;
  category: string;
  name: string;
  col1: [string, string];
  col2: string;
};

const PROJECT_META = projects.items;

const PROJECTS: Project[] = PROJECT_COVERS.map((cover, i) => ({
  number: PROJECT_META[i].number,
  category: PROJECT_META[i].category,
  name: PROJECT_META[i].name,
  col1: cover.col1,
  col2: cover.col2,
}));

function Card({ project }: { project: Project }) {
  return (
    <ScrollStackItem itemClassName="project-stack-card">
      <div className="rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <span
            className="hero-heading font-black leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
          >
            {project.number}
          </span>
          <div className="min-w-[180px] flex-1">
            <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
              {project.category}
            </span>
            <h3
              className="hero-heading font-black uppercase leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
            >
              {project.name}
            </h3>
          </div>
          <LiveProjectButton href={`#/project/${project.number}`} />
        </div>

        {/* Bottom row: image grid */}
        <div className="mt-6 grid grid-cols-[2fr_3fr] gap-3 sm:mt-8 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div
              className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.col1[0]}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.col1[1]}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
            <img
              src={project.col2}
              alt={`${project.name} main preview`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </ScrollStackItem>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          {projects.heading}
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        <ScrollStack
          useWindowScroll
          stackPosition="12%"
          itemDistance={160}
          itemStackDistance={28}
          itemScale={0.04}
          baseScale={0.85}
          dimAmount={0.3}
          holdDistance={260}
          smoothScroll={false}
        >
          {PROJECTS.map((project) => (
            <Card key={project.number} project={project} />
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
