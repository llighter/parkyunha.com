import type { AnchorHTMLAttributes } from "react";

/**
 * 칩 — 동그란 테두리 링크 (채널 · 바깥 링크). 14px fg-muted, 올리면 surface 바탕에 fg.
 * /works · /about 의 채널 줄이 쓴다. 바깥 주소면 새 탭으로 연다
 */
export default function Chip({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="rounded-full border border-line px-4 py-2 text-sm text-fg-muted no-underline transition-colors hover:bg-surface hover:text-fg"
      {...props}
    >
      {children}
    </a>
  );
}
