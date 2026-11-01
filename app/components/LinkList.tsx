import Link from "next/link";
import s from "./LinkList.module.css";

export type LinkListItem = {
  href: string;
  title: string;
  description?: string;
};

/**
 * 링크 줄 — 다른 쪽으로 가는 길을 줄로 (이름 · 설명 · › ). 모양은 LinkList.module.css.
 * 글 본문(prose) 안에 둘 때는 감싸는 쪽이 not-prose 를 붙인다
 */
export default function LinkList({ items }: { items: LinkListItem[] }) {
  return (
    <ul className={s.list}>
      {items.map(({ href, title, description }) => (
        <li key={href}>
          <Link href={href} className={s.link}>
            <span className={s.text}>
              <span className={s.title}>{title}</span>
              {description && (
                <span className={s.description}>{description}</span>
              )}
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
