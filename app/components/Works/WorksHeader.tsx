import Link from "next/link";
import type { ReactNode } from "react";
import s from "./Works.module.css";

/**
 * 사진 쪽 머리 — 가운데 큰 보통 굵기 제목(text-showcase 36 · 44 · 52).
 * 위에서부터 ← 돌아갈 곳 · 제목 · mono 메타 · 소개 한 줄 · 글자 탭(children). 없는 줄은 뺀다
 */
export default function WorksHeader({
  title,
  description,
  meta,
  back,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <header className={`lane-text ${s.header}`}>
      {back && (
        <Link href={back.href} className={`text-sm ${s.back}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 4.5 7.5 12 15 19.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {back.label}
        </Link>
      )}
      <h1 className="text-showcase">{title}</h1>
      {meta && (
        <p className={`font-mono text-mono text-fg-muted ${s.meta}`}>{meta}</p>
      )}
      {description && (
        <p className={`text-showcase-lead text-fg-muted ${s.lead}`}>
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
