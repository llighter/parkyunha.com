import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "소프트웨어 개발, 디자인, 그리고 일상에 대한 나의 이야기",
};

export default async function BlogPage() {
  // allBlogs를 publishedAt 기준으로 내림차순 정렬
  allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // FIXME: 최소 글 갯수가 6개 이상이어야 함
  // allBlogs 목록에서 첫번째 건 추출
  const firstArticle = allBlogs[0];
  // allBlogs 목록에서 두번째부터 다섯번째 건 추출
  const mediumArticles = allBlogs.slice(1, 5);
  // allBlogs 목록에서 여섯번째부터 끝까지 추출
  const smallArticles = allBlogs.slice(5);

  return (
    <section
      className={`mt-0 h-full overflow-hidden bg-zinc-100 pb-10 tablet:pb-16 laptop:pb-20`}
    >
      <div
        className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
      >
        <div className={`@container`}>
          <h2
            className={`mb-8 text-[24px] font-bold @[692px]:text-[28px] @[980px]:text-[32px]`}
          >
            &nbsp;최신 글
          </h2>
        </div>
        <div>
          <div className={`grid gap-8`}>
            <Tile article={firstArticle} />

            <div className={`grid gap-8 tablet:grid-cols-2`}>
              {mediumArticles.map((article, i) => (
                <Tile key={i} article={article} />
              ))}
            </div>

            <div className={`grid gap-8 tablet:grid-cols-2 laptop:grid-cols-3`}>
              {smallArticles.map((article, i) => (
                <Tile key={i} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className={`@container`}>
      <div
        className={`group flex h-full flex-col overflow-hidden rounded-2xl @[692px]:flex-row`}
      >
        {/* shrink-0 is Silver Bullet!! */}
        <div
          className={`shrink-0 overflow-hidden @[692px]:w-[453px] @[980px]:w-[643px]`}
        >
          <Image
            src={article.image}
            alt={article.imageDescription}
            width={400}
            height={400}
            className={`aspect-[1.77] h-auto w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
        <div className={`flex grow flex-col justify-between bg-white p-6`}>
          <div className={`space-y-[4px] @[474px]:space-y-[8px]`}>
            <p className={`text-[12px] font-bold text-gray-600`}>
              {article.category}
            </p>
            <p
              className={`mt-2 break-keep text-[19px] font-semibold @[305px]:leading-6 @[474px]:text-[24px] @[474px]:leading-8 @[692px]:text-[21px] @[980px]:text-[32px] @[980px]:font-bold @[980px]:leading-10`}
            >
              {article.title}
            </p>
          </div>
          <p className={`mt-2 text-[14px] font-medium text-gray-500`}>
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
