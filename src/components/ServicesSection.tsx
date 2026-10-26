import FadeIn from "./FadeIn";
import { services } from "../content/copy";

const SERVICES = services.items;

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >{services.heading}</h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-center gap-6 border-t py-8 sm:gap-10 sm:py-10 md:py-12"
              style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="w-[1.28em] flex-none text-left font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", fontVariantNumeric: "tabular-nums" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3
                  className="font-system font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-system font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
