import CopyLinkButton from "@/app/components/copyLinkButton";
import MailButton from "@/app/components/mailButton";
import { formatDate } from "@/lib/utils";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { BlogMetadata } from "@/lib/types";

export default function PostHeader({
  metadata,
  slug,
}: {
  metadata: BlogMetadata;
  slug: string;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            // 대표 이미지가 없으면 사이트 OG 이미지 (app/opengraph-image.png) — 제목이 들어간 글별 OG 는 나중 일
            image: metadata.image
              ? `${SITE_URL}${metadata.image}`
              : `${SITE_URL}/opengraph-image.png`,
            url: `${SITE_URL}/blog/${slug}`,
            author: {
              "@type": "Person",
              name: SITE_NAME,
            },
          }),
        }}
      />
      {/* 부모(.lanes)가 본문 레인 폭을 준다 — 여기서는 폭을 쓰지 않는다 */}
      <article id="article" className="not-prose pt-10">
        <header id="article-header">
          <p id="category-eyebrow" className="text-eyebrow text-fg-muted">
            {metadata.category}
          </p>
          <p id="date-eyebrow" className="mt-1 text-meta text-fg-muted">
            <time dateTime={metadata.publishedAt}>
              {formatDate(metadata.publishedAt)}
            </time>
          </p>
          <h1 id="page-title" className="mt-5 text-display break-keep">
            {metadata.title}
          </h1>
          <p
            id="page-summary"
            className="mt-4 text-lead break-keep desktop:mt-5"
          >
            {metadata.summary}
          </p>
          <ul
            id="sharesheet"
            className="mt-8 flex items-center gap-4 desktop:mt-9"
          >
            <li>
              <MailButton
                post={{
                  title: metadata.title,
                  slug,
                  summary: metadata.summary,
                }}
              />
            </li>
            <li>
              <CopyLinkButton />
            </li>
          </ul>
        </header>
      </article>
    </>
  );
}
