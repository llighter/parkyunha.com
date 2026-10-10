import type { Metadata } from "next";
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
      <div className="content-container">
        <div className="@container">
          <h2 className="my-8 text-[24px] font-bold @[576px]:text-[28px] @[653px]:text-[32px]">
            &nbsp;Works
          </h2>
        </div>
        <div className="prose prose-neutral dark:prose-invert">
          <p>사진, 영상, 그리고 만들어가는 것들을 기록합니다.</p>
        </div>

        {/* 소셜 링크 */}
        <div className="mt-6 flex flex-wrap gap-3">
          {socialAccounts.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="text-sm text-neutral-400 dark:text-neutral-600">
                {item.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
