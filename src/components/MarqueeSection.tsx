import { useEffect, useRef, useState } from "react";
import { MARQUEE_IMAGES } from "../content/images";

const ROW_1 = [...MARQUEE_IMAGES.slice(0, 4), ...MARQUEE_IMAGES.slice(0, 4), ...MARQUEE_IMAGES.slice(0, 4)];
const ROW_2 = [...MARQUEE_IMAGES.slice(4), ...MARQUEE_IMAGES.slice(4), ...MARQUEE_IMAGES.slice(4)];

function MarqueeRow({ images, transform }: { images: string[]; transform: string }) {
  return (
    <div
      className="flex gap-3"
      style={{ transform, willChange: "transform" }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          // 宽度由 16:9 比例从高度推出（移动端 391×220，桌面 480×270），
          // max-w-none 用来抵消 Tailwind preflight 的 img{max-width:100%}，
          // 否则窄屏会被压窄、把 16:9 裁掉。
          className="h-[220px] w-auto max-w-none shrink-0 rounded-2xl object-cover sm:h-[270px]"
          style={{ aspectRatio: "16 / 9" }}
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {/*
          Row 1 travels right on scroll. Without a negative base offset the row's
          left edge would drift away from the viewport, exposing empty space, so the
          tripled track starts one full copy to the left (-33.3333% of its own width).
        */}
        <MarqueeRow
          images={ROW_1}
          transform={`translateX(calc(-33.3333% + ${offset - 200}px))`}
        />
        <MarqueeRow images={ROW_2} transform={`translateX(${-(offset - 200)}px)`} />
      </div>
    </section>
  );
}
