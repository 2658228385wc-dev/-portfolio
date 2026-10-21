import { Fragment, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { TextLine } from "../content/copy";

type CharProps = {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {char}
    </motion.span>
  );
}

type Unit = { chars: string[]; nowrap: boolean };

/**
 * 把一行文本拆成可渲染单元：
 * - 连续的拉丁字母/数字（含 3+、Vibe、Coding）合成一个 nowrap 单元，避免单词被拆到两行
 * - 中日韩字符逐字成单元，中文可以在任意字之间换行
 * - 空格单独成单元
 */
function toUnits(text: string): Unit[] {
  const units: Unit[] = [];
  let run: string[] = [];

  const flush = () => {
    if (run.length) {
      units.push({ chars: run, nowrap: true });
      run = [];
    }
  };

  for (const ch of text) {
    if (/\s/.test(ch)) {
      flush();
      units.push({ chars: [" "], nowrap: false });
    } else if (/[A-Za-z0-9\u00C0-\u024F'’\-–—&/+.]/.test(ch)) {
      run.push(ch);
    } else {
      flush();
      units.push({ chars: [ch], nowrap: false });
    }
  }
  flush();

  return units;
}

type AnimatedTextProps = {
  lines: TextLine[];
  className?: string;
  style?: CSSProperties;
  /** 强调片段的样式，默认加粗并提亮 */
  emphasisClassName?: string;
};

/**
 * Character-by-character scroll-reveal text.
 * 每一条 line 是独立一行（硬换行），emphasis 片段单独着色；
 * 字符按单元分组，英文单词不会被拆行，中文保持逐字可换行。
 */
export default function AnimatedText({
  lines,
  className,
  style,
  emphasisClassName = "font-semibold text-[#D7E2EA]",
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const total = lines.reduce((n, line) => n + line.text.replace(/\s/g, "").length, 0);
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          <span className={line.emphasis ? emphasisClassName : undefined}>
            {toUnits(line.text).map((unit, ui) => {
              if (!unit.nowrap && unit.chars.length === 1 && unit.chars[0] === " ") {
                return <Fragment key={ui}> </Fragment>;
              }
              const chars = unit.chars.map((char) => {
                const range: [number, number] = [charIndex / total, (charIndex + 1) / total];
                charIndex += 1;
                return <Char key={charIndex} char={char} progress={scrollYProgress} range={range} />;
              });
              return unit.nowrap ? (
                <span key={ui} className="inline-block whitespace-nowrap">
                  {chars}
                </span>
              ) : (
                <Fragment key={ui}>{chars}</Fragment>
              );
            })}
          </span>
        </Fragment>
      ))}
    </p>
  );
}
