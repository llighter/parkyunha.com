import { getBlogPosts } from "@/app/db/blog";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "소프트웨어 개발, 디자인, 그리고 일상에 대한 나의 이야기",
};

export default async function BlogPage() {
  // 비동기로 블로그 데이터를 가져옴
  const allBlogs = await getBlogPosts();

  // allBlogs를 publishedAt 기준으로 내림차순 정렬
  allBlogs.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const firstArticle = allBlogs[0];
  const mediumArticles = allBlogs.slice(1, 5);
  const smallArticles = allBlogs.slice(5);

  return (
    <section
      className={`mt-0 h-full overflow-hidden bg-zinc-100 pb-10 tablet:pb-16 desktop:pb-20 dark:bg-neutral-900`}
    >
      <div className={`lane-text my-8`}>
        <h2 className="text-title">&nbsp;블로그 글 읽기</h2>
      </div>
      <div className={`lane-text tablet:lane-media`}>
        <div>
          <div className={`grid gap-8`}>
            {firstArticle && <Tile article={firstArticle} />}

            {mediumArticles.length > 0 && (
              <div
                className={`grid gap-8 tablet:grid-cols-2`}
                data-reveal-children
                data-reveal-stagger
              >
                {mediumArticles.map((article, i) => (
                  <Tile key={i} article={article} />
                ))}
              </div>
            )}

            {smallArticles.length > 0 && (
              <div
                className={`grid gap-8 tablet:grid-cols-2 desktop:grid-cols-3`}
                data-reveal-children
                data-reveal-stagger
              >
                {smallArticles.map((article, i) => (
                  <Tile key={i} article={article} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ article }: { article: BlogPost }) {
  return (
    <div className={`@container relative isolate`}>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-2xl @media-tablet:flex-row`}
      >
        {/* shrink-0 is Silver Bullet!! */}
        <div
          className={`shrink-0 overflow-hidden @media-tablet:w-[453px] @media-desktop:w-[643px]`}
        >
          <Image
            src={article.metadata.image || "/default-image.jpg"}
            alt={article.metadata.imageDescription || "Default description"}
            width={400}
            height={400}
            sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 50vw, 33vw"
            className={`aspect-video h-auto w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
        <div className={`flex grow flex-col justify-between bg-card p-6`}>
          <div className={`space-y-[4px] @tile-md:space-y-[8px]`}>
            <p className={`text-eyebrow text-fg-muted`}>
              {article.metadata.category}
            </p>
            <p
              className={`mt-2 text-[19px] font-semibold break-keep @tile-sm:leading-6 @tile-md:text-[24px] @tile-md:leading-8 @media-tablet:text-[21px] @media-desktop:text-[32px] @media-desktop:leading-10 @media-desktop:font-bold`}
            >
              <Link href={`/blog/${article.slug}`}>
                <span
                  className="absolute inset-0 z-10"
                  aria-hidden="true"
                ></span>
                {article.metadata.title}
              </Link>
            </p>
          </div>
          <p className={`mt-2 text-meta text-fg-muted`}>
            {formatDate(article.metadata.publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
