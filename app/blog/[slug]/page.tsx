import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";

export default function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {/*<script type={`application/ld+json`}>*/}
      {/*  {JSON.stringify(post.structuredData)}*/}
      {/*</script>*/}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      />
      <section
        className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}
      >
        w{" "}
        <div id="article">
          <div id="article-header">
            <div
              id="category"
              className={`mx-auto mb-[20px] max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <div
                id="category-eyebrow"
                className={`mx-auto w-87.5 text-xs font-bold text-gray-500 tablet:w-[576px] laptop:w-[653px]`}
              >
                {post.category}
              </div>
              <div
                id="date-eyebrow"
                className={`mx-auto mt-[4px] w-87.5 text-sm font-semibold text-gray-500 tablet:w-[576px] laptop:w-[653px]`}
              >
                {post.publishedAt}
              </div>
            </div>
            <div
              id="page-title"
              className={`mx-auto max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <h1
                  className={`table:text-[42px] break-keep text-[32px] font-extrabold leading-[1.21875] tablet:leading-[1.2] laptop:text-[48px] laptop:leading-[1.1875]`}
                >
                  {post.title}
                </h1>
              </div>
            </div>
            <div
              id="page-summary"
              className={`mx-auto mt-4 max-w-[414px] leading-[1.2858] tablet:max-w-screen-tablet_inner tablet:leading-[1.29167] laptop:mt-5 laptop:max-w-screen-laptop_inner laptop:leading-[1.19048]`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <div
                  className={`break-keep text-[21px] font-bold laptop:text-[24px]`}
                >
                  {post.summary}
                </div>
              </div>
            </div>
            <div
              id="sharesheet"
              className={`mx-auto mt-[20px] max-w-[414px] tablet:max-w-screen-tablet_inner laptop:mt-6 laptop:max-w-screen-laptop_inner`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                공유하기 아이콘
              </div>
            </div>
          </div>
          <div
            className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
          >
            <div className={`mx-auto w-full tablet:w-[576px] laptop:w-[653px]`}>
              <Mdx code={post.body.code} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
