import type { CSSProperties, ReactNode } from "react";
import { aspectOf, type Aspect, type Lane } from "@/lib/layout";
import s from "./Figure.module.css";

/**
 * 미디어 상자의 레인 클래스.
 * - text: 폰에서는 본문 폭 그림이 너무 작아 미디어 폭(꽉 채움)으로, 태블릿부터 본문 폭 — 기존 inline 동작 그대로
 * - Tailwind 는 소스의 글자 그대로를 찾아 클래스를 만든다 → `lane-${lane}` 처럼 조립하지 않는다
 */
const LANE_CLASS = {
  text: "lane-media tablet:lane-text",
  media: "lane-media",
  wide: "lane-wide",
  full: "lane-full",
} as const;

export interface FigureProps {
  /** 미디어가 설 레인. 설명은 언제나 본문 레인 */
  lane?: Exclude<Lane, "panel">;
  caption?: ReactNode;
  /** 비율을 고정할 때 ("16:9" 영상, "3:2" 대표 이미지 · lib/layout 의 ASPECT) — 이때 자식은 액자를 꽉 채운다 */
  aspect?: Aspect;
  children: ReactNode;
}

/**
 * 그림 · 영상 한 장. 글 전체 폭(lane-full)을 차지하고, 안에서
 * 미디어는 lane 에, 설명은 본문 레인에 세운다.
 */
export default function Figure({
  lane = "media",
  caption,
  aspect,
  children,
}: FigureProps) {
  const style = aspect
    ? ({ "--figure-aspect": aspectOf(aspect).css } as CSSProperties)
    : undefined;

  return (
    <figure className={`not-prose lane-full ${s.figure}`} data-lane={lane}>
      <div
        className={`${LANE_CLASS[lane]} ${s.media}`}
        data-fill={aspect ? "" : undefined}
        style={style}
      >
        {children}
      </div>
      {caption && (
        <figcaption className={`lane-text ${s.caption}`}>{caption}</figcaption>
      )}
    </figure>
  );
}
