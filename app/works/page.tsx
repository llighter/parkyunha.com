import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Works",
  description: "사진, 영상, 작업물 쇼케이스",
};

const socialAccounts = [
  { name: "YouTube", href: SOCIAL_LINKS.youtube },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
  { name: "X", href: SOCIAL_LINKS.x },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

const placeholderItems = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
}));

export default function WorksPage() {
  return (
    <section className="mt-0 overflow-hidden pb-10 tablet:pb-16 desktop:pb-20">
      <PageHeader
        title="Works"
        description="사진, 영상, 그리고 만들어가는 것들을 기록합니다."
      />
      <div className="lane-text">
        {/* 소셜 링크 */}
        <div className="flex flex-wrap gap-3">
          {socialAccounts.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {name}
            </a>
          ))}
        </div>

        {/* 작업물 그리드 */}
        <div
          className="mt-10 grid grid-cols-2 gap-4 desktop:grid-cols-3"
          data-reveal-children
          data-reveal-stagger
        >
          {placeholderItems.map((item) => (
            <div
              key={item.id}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-line bg-surface"
            >
              <p className="text-sm text-fg-muted">{item.id}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
