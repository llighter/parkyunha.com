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
            image: metadata.image
              ? `${SITE_URL}${metadata.image}`
              : `${SITE_URL}/og?title=${metadata.title}`,
            url: `${SITE_URL}/blog/${slug}`,
            author: {
              "@type": "Person",
              name: SITE_NAME,
            },
          }),
        }}
      />
      <article id="article" className={`pt-10`}>
        <div id="article-header">
          <div
            id="category"
            className={`mx-auto mb-[20px] max-w-[414px] tablet:max-w-(--lane-media) desktop:max-w-(--lane-media)`}
          >
            <div
              id="category-eyebrow"
              className={`mx-auto w-87.5 text-xs font-bold text-gray-500 dark:text-neutral-400 tablet:w-[576px] desktop:w-[653px]`}
            >
              {metadata.category}
            </div>
            <div
              id="date-eyebrow"
              className={`mx-auto mt-[4px] w-87.5 text-sm font-semibold text-gray-500 dark:text-neutral-400 tablet:w-[576px] desktop:w-[653px]`}
            >
              {formatDate(metadata.publishedAt)}
            </div>
          </div>
          <div
            id="page-title"
            className={`mx-auto max-w-[414px] tablet:max-w-(--lane-media) desktop:max-w-(--lane-media)`}
          >
            <div
              className={`not-prose mx-auto w-87.5 tablet:w-[576px] desktop:w-[653px]`}
            >
              <h1
                className={`tablet:text-[42px] break-keep text-[32px] font-extrabold leading-[1.21875] tablet:leading-[1.2] desktop:text-[48px] desktop:leading-[1.1875]`}
              >
                {metadata.title}
              </h1>
            </div>
          </div>
          <div
            id="page-summary"
            className={`mx-auto mt-4 max-w-[414px] leading-[1.2858] tablet:max-w-(--lane-media) tablet:leading-[1.29167] desktop:mt-5 desktop:max-w-(--lane-media) desktop:leading-[1.19048]`}
          >
            <div className={`mx-auto w-87.5 tablet:w-[576px] desktop:w-[653px]`}>
              <div
                className={`break-keep text-[21px] font-bold desktop:text-[24px]`}
              >
                {metadata.summary}
              </div>
            </div>
          </div>
          <div
            id="sharesheet"
            className={`mx-auto mt-[20px] max-w-[414px] tablet:max-w-(--lane-media) desktop:mt-6 desktop:max-w-(--lane-media)`}
          >
            <div className={`mx-auto w-87.5 tablet:w-[576px] desktop:w-[653px]`}>
              <ul
                className={`not-prose flex justify-start space-x-4 align-middle`}
              >
                <li className={`mt-3`}>
                  <MailButton
                    post={{
                      title: metadata.title,
                      slug,
                      summary: metadata.summary,
                    }}
                  />
                </li>
                <li className={`mt-3`}>
                  <CopyLinkButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
