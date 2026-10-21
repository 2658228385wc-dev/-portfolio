import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import { ABOUT_DECOR } from "../content/images";
import { about } from "../content/copy";


export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Decorative 3D images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img
          src={ABOUT_DECOR.moon}
          alt=""
          className="w-full"
        />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img
          src={ABOUT_DECOR.object}
          alt=""
          className="w-full"
        />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img
          src={ABOUT_DECOR.lego}
          alt=""
          className="w-full"
        />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img
          src={ABOUT_DECOR.group}
          alt=""
          className="w-full"
        />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            {about.heading}
          </h2>
        </FadeIn>

        <div
          id="contact"
          className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24"
        >
          <AnimatedText
            lines={about.lines}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#858585]"
            emphasisClassName="font-semibold text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
