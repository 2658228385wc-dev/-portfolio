import { useCallback, useEffect, useRef, useState } from "react";
import "./FolderCarousel.css";
import { projects } from "../content/copy";
import { navigate } from "../router";

const ITEMS = projects.items;
/** 渲染三组首尾相接，滚到边界时静默跳一组，形成无限循环 */
const LOOPS = 3;
const SLIDES = Array.from({ length: LOOPS }, (_, g) =>
  ITEMS.map((item, i) => ({ item, real: i, key: `${g}-${item.number}` }))
).flat();

/**
 * 文件夹式项目轨道。
 * 居中的文件夹自动「打开」：白色内页升起、前面板下移并压扁、整体放大。
 * 打开程度由 --p（0→1）驱动，每帧按「项中心与轨道中心的距离」重算，
 * 所以拖拽过程中是连续跟随的，不是松手后跳变。
 */
export default function FolderCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef(0);
  const settleRef = useRef<number | undefined>(undefined);
  const activeRef = useRef(ITEMS.length);
  const wrappingRef = useRef(false);
  const dragRef = useRef({ active: false, x: 0, left: 0, moved: false });
  const [active, setActive] = useState(ITEMS.length);

  /** 一组（4 项）的滚动宽度 */
  const groupWidth = useCallback(() => {
    const a = itemsRef.current[0];
    const b = itemsRef.current[ITEMS.length];
    if (!a || !b) return 0;
    return b.offsetLeft - a.offsetLeft;
  }, []);

  /** 滚出中间组时静默平移一组，视觉上无缝 */
  const wrapIfNeeded = useCallback(() => {
    const track = trackRef.current;
    if (!track || wrappingRef.current || dragRef.current.active) return;
    const g = groupWidth();
    if (g <= 0) return;
    let delta = 0;
    if (track.scrollLeft < g * 0.5) delta = g;
    else if (track.scrollLeft > g * 1.5) delta = -g;
    if (!delta) return;
    wrappingRef.current = true;
    track.scrollLeft += delta;
    requestAnimationFrame(() => {
      wrappingRef.current = false;
    });
  }, [groupWidth]);

  /* 测量每一项到轨道中心的距离，写入 --p */
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    const unit = itemsRef.current[ITEMS.length]?.offsetWidth ?? 340;
    const span = Math.max(160, unit * 0.9);
    let best = activeRef.current;
    let bestD = Number.POSITIVE_INFINITY;

    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
      const t = Math.max(0, Math.min(1, 1 - d / span));
      el.style.setProperty("--p", (t * t * (3 - 2 * t)).toFixed(3));
    });

    if (best !== activeRef.current) {
      activeRef.current = best;
      setActive(best);
    }
  }, []);

  const schedule = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      paint();
      wrapIfNeeded();
    });
  }, [paint, wrapIfNeeded]);

  const focusTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const el = itemsRef.current[i];
    if (!track || !el) return;
    const tr = track.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const left =
      track.scrollLeft + (er.left - tr.left) - (track.clientWidth - er.width) / 2;
    track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const nearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return activeRef.current;
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    let best = activeRef.current;
    let bestD = Number.POSITIVE_INFINITY;
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }, []);

  /* 初始定位到中间组的第一项 */
  useEffect(() => {
    const kick = () => {
      focusTo(ITEMS.length, false);
      paint();
    };
    const raf = requestAnimationFrame(kick);
    const onResize = () => {
      kick();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [focusTo, paint]);

  /* 滚轮：指针在轨道内时转横向，滚到头之前一直有效；循环轨道没有尽头，所以始终接管 */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  /* 鼠标拖拽（触屏交给原生滚动） */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragRef.current = {
        active: true,
        x: e.clientX,
        left: track.scrollLeft,
        moved: false,
      };
      if (e.pointerType === "mouse") track.classList.add("is-dragging");
    };

    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 6) d.moved = true;
      if (e.pointerType !== "mouse") return;
      track.scrollLeft = d.left - dx;
    };

    const onUp = () => {
      const d = dragRef.current;
      if (!d.active) return;
      d.active = false;
      track.classList.remove("is-dragging");
      if (d.moved) {
        focusTo(nearestIndex());
        window.setTimeout(() => {
          dragRef.current.moved = false;
        }, 0);
      }
    };

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [focusTo, nearestIndex]);

  const onScroll = () => {
    schedule();
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      paint();
      wrapIfNeeded();
    }, 120);
  };

  const moveBy = (step: 1 | -1) => {
    const cur = nearestIndex();
    const next = cur + step;
    if (next >= 0 && next < SLIDES.length) {
      focusTo(next);
      return;
    }
    // 越过首尾时落在中间组的对称位置，循环继续
    const n = ITEMS.length;
    const wrapped = ITEMS.length + ((cur - n + step + n) % n);
    focusTo(wrapped);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    moveBy(e.key === "ArrowRight" ? 1 : -1);
  };

  const handleClick = (i: number) => () => {
    if (dragRef.current.moved) return;
    if (i === activeRef.current) {
      navigate(`#/project/${ITEMS[i % ITEMS.length].number}`);
    } else {
      focusTo(i);
    }
  };

  return (
    <div className="fd-rail">
      <div
        ref={trackRef}
        className="fd-track"
        role="group"
        aria-roledescription="carousel"
        aria-label="项目列表"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
      >
        {SLIDES.map((slide, i) => {
          const isReal = Math.floor(i / ITEMS.length) === 1;
          return (
          <div
            key={slide.key}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="fd-item"
            aria-hidden={isReal ? undefined : true}
          >
            <button
              type="button"
              className="fd"
              aria-label={`${slide.item.number} ${slide.item.name}，${slide.item.category}，${slide.item.period}`}
              aria-current={i === active ? "true" : undefined}
              tabIndex={isReal ? 0 : -1}
              onFocus={() => {
                if (isReal) focusTo(i);
              }}
              onClick={handleClick(i)}
            >
              <span className="fd-back" aria-hidden="true" />
              <span className="fd-paper" aria-hidden="true">
                <span className="fd-chip">{slide.item.category}</span>
                <span className="fd-period">{slide.item.period}</span>
              </span>
              <span className="fd-front" aria-hidden="true">
                <span className="fd-meta">
                  <span className="fd-kicker">Project</span>
                  <span className="fd-name">{slide.item.name}</span>
                </span>
                <span className="fd-num">{slide.item.number}</span>
              </span>
            </button>
          </div>
          );
        })}
      </div>
    </div>
  );
}
