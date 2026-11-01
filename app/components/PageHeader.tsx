import type { ReactNode } from "react";

/**
 * 쪽 머리 — 쪽마다 하나. 본문 레인에 h1 제목(text-title: 24 · 28 · 32px)과, 있으면 소개 한 줄.
 * /blog · /works · /project · 시리즈 쪽이 함께 쓴다. 들여쓰기(&nbsp;)로 선을 맞추지 않는다 — 레인이 선을 맞춘다
 */
export default function PageHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header className="lane-text my-8">
      <h1 className="text-title break-keep">{title}</h1>
      {description && (
        <p className="mt-2 text-body break-keep text-fg-muted">{description}</p>
      )}
    </header>
  );
}
