import Image from "next/image";
import Link from "next/link";
import { POST_TYPES } from "@/lib/constants";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const DEFAULT_SIZES =
  "(max-width: 734px) 87.5vw, (max-width: 1068px) 50vw, 33vw";

/**
 * 블로그 타일 — 화면 폭이 아니라 자기 폭(컨테이너 쿼리 @tile-* · @media-*)에 따라 모양이 바뀐다.
 * /blog 목록 · 홈 최신 · 홈 시리즈 캐러셀이 함께 쓴다. sizes 는 놓이는 자리의 그림 폭
 */
export default function BlogTile({
  article,
  sizes = DEFAULT_SIZES,
}: {
  article: BlogPost;
  sizes?: string;
}) {
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
            sizes={sizes}
            className={`aspect-video h-auto w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
        <div className={`flex grow flex-col justify-between bg-card p-6`}>
          <div className={`space-y-[4px] @tile-md:space-y-[8px]`}>
            <p className={`text-eyebrow text-fg-muted`}>
              {POST_TYPES[article.metadata.type]}
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
