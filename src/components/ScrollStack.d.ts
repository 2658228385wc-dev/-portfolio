import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface ScrollStackItemProps {
  children?: ReactNode;
  /** 附加到卡片根节点的类名，用于尺寸 / 颜色 / 内容定制 */
  itemClassName?: string;
  style?: CSSProperties;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  /** 卡片堆叠前的间距（px），越大滚动手感越松 */
  itemDistance?: number;
  /** 堆叠后每张卡露出 / 下移的距离（px） */
  itemStackDistance?: number;
  /** 堆叠钉住位置，数字为 px，字符串可用百分比 */
  stackPosition?: number | string;
  /** 每被压一层缩小多少 */
  itemScale?: number;
  /** 被压最深处的最小缩放 */
  baseScale?: number;
  /** 每被压一层变暗多少（0–1） */
  dimAmount?: number;
  /** 每被压一层模糊多少（px） */
  blurAmount?: number;
  /** 被压卡片向后倾斜角度 */
  tiltAmount?: number;
  /** 被压卡片左右交替偏转角度 */
  rotationAmount?: number;
  /** 堆叠完成后钉住的额外滚动距离（px） */
  holdDistance?: number;
  /** 滚轮惯性平滑（使用 window 滚动时会平滑整页） */
  smoothScroll?: boolean;
  /** 滚动停止时吸附到最近一张卡 */
  snap?: boolean;
  /** 跟随整页滚动而非容器内部滚动 */
  useWindowScroll?: boolean;
  /** 最后一张卡落位时回调 */
  onStackComplete?: () => void;
}

export declare const ScrollStackItem: (props: ScrollStackItemProps) => ReactElement;

declare const ScrollStack: (props: ScrollStackProps) => ReactElement;

export default ScrollStack;
