import { getBlogPosts } from "@/app/db/blog";
import type { Metadata } from "next";
import BlogTile from "@/app/components/BlogTile";

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
      className={`mt-0 h-full overflow-hidden bg-surface pb-10 tablet:pb-16 desktop:pb-20`}
    >
      <div className={`lane-text my-8`}>
        <h2 className="text-title">&nbsp;블로그 글 읽기</h2>
      </div>
      <div className={`lane-text tablet:lane-media`}>
        <div>
          <div className={`grid gap-8`}>
            {firstArticle && <BlogTile article={firstArticle} />}

            {mediumArticles.length > 0 && (
              <div
                className={`grid gap-8 tablet:grid-cols-2`}
                data-reveal-children
                data-reveal-stagger
              >
                {mediumArticles.map((article, i) => (
                  <BlogTile key={i} article={article} />
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
                  <BlogTile key={i} article={article} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
