import type { ReactNode } from "react";
import s from "./Works.module.css";

/**
 * 글자 탭 — 가운데 줄에 글자 단추 · 링크, 사이 가는 세로선(CSS). 지금 것은 aria-pressed · aria-current 로 진하게.
 * 거르기 단추면 group, 다른 쪽으로 가는 링크면 nav
 */
export default function TextTabs({
  label,
  nav = false,
  className = "",
  children,
}: {
  label: string;
  nav?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = `text-sm ${s.tabs} ${className}`;
  return nav ? (
    <nav aria-label={label} className={classes}>
      {children}
    </nav>
  ) : (
    <div role="group" aria-label={label} className={classes}>
      {children}
    </div>
  );
}
