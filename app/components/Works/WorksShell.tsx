import type { ReactNode } from "react";
import s from "./Works.module.css";

/** 사진 쪽 한 쪽의 바깥 — 부품 토큰(--works-*)을 내리고, 바닥 여백은 spacing-section */
export default function WorksShell({ children }: { children: ReactNode }) {
  return <div className={`pb-section ${s.root}`}>{children}</div>;
}

/** 쪽 아래 글자 탭 줄(채널 · 다른 앨범) 자리 — 마지막 구역에서 72 아래 */
export function WorksFoot({ children }: { children: ReactNode }) {
  return <div className={`lane-text ${s.footTabs}`}>{children}</div>;
}

/** 카드 그리드 — 폰 1열(lane-text) · 태블릿 2열(lane-media) · 데스크톱 3열(lane-wide, 영상은 2열) */
export function WorksCards({
  section,
  label,
  children,
}: {
  section: "albums" | "videos";
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      data-section={section}
      className={`lane-text tablet:lane-media desktop:lane-wide ${s.cards}`}
      data-reveal-children
      data-reveal-stagger
    >
      {children}
    </section>
  );
}
