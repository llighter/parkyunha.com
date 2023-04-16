import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

export default async function BlogPage() {
  return (
    <section
      className={`mt-0 overflow-hidden bg-neutral-100 pb-10 tablet:pb-16 laptop:pb-20`}
    >
      <div
        className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
      >
        <div className={`@container`}>
          <h2
            className={`mb-8 text-[24px] font-bold @[692px]:text-[28px] @[980px]:text-[32px]`}
          >
            &nbsp;최신 뉴스
          </h2>
        </div>
        <div className={`grid gap-8`}>
          {/*<Tile article={article} />*/}

          {/*<div className={`grid gap-8 tablet:grid-cols-2`}>*/}
          {/*  {mediumArticles.map((article, i) => (*/}
          {/*    <Tile key={i} article={article} />*/}
          {/*  ))}*/}
          {/*</div>*/}

          <div className={`grid gap-8 tablet:grid-cols-2 laptop:grid-cols-3`}>
            {allBlogs.map((article, i) => (
              <Tile key={i} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ article }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className={`@container`}>
        <div
          className={`group flex h-full flex-col overflow-hidden rounded-2xl @[692px]:flex-row`}
        >
          {/* TODO: next/image 적용하기 */}
          {/* shrink-0 is Silver Bullet!! */}
          <div
            className={`shrink-0 overflow-hidden @[692px]:w-[453px] @[980px]:w-[643px]`}
          >
            <img
              src={article.image}
              className={`aspect-[1.77] h-auto w-full max-w-full object-cover transition-transform duration-300 group-hover:scale-105`}
            />
          </div>
          <div className={`flex grow flex-col justify-between bg-white p-6`}>
            <div className={`space-y-[4px] @[474px]:space-y-[8px]`}>
              <p className={`text-[12px] font-bold text-gray-600`}>
                {article.category}
              </p>
              <p
                className={`mt-2 text-[19px] font-semibold @[305px]:leading-6 @[474px]:text-[24px] @[474px]:leading-8 @[692px]:text-[21px] @[980px]:text-[32px] @[980px]:font-bold @[980px]:leading-10`}
              >
                {article.title}
              </p>
            </div>
            <p className={`mt-2 text-[14px] font-medium text-gray-500`}>
              {article.publishedAt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
