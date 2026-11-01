import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeriesPosts } from "@/app/db/blog";
import BlogTile from "@/app/components/BlogTile";
import PageHeader from "@/app/components/PageHeader";
import { SERIES } from "@/lib/constants";

type Params = { params: Promise<{ key: string }> };

// 시리즈는 lib/constants.ts 의 SERIES 에 있는 것만 — 빌드 때 쪽을 만들고, 모르는 키는 404
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERIES).map((key) => ({ key }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { key } = await params;
  const series = SERIES[key];
  if (!series) return {};
  return {
    title: `시리즈 · ${series.name}`,
    description: series.description,
  };
}

/** 시리즈 쪽 — 같은 series 의 글을 최근 순으로. 모양은 /blog 목록과 같은 surface 바탕 · 블로그 타일 */
export default async function SeriesPage({ params }: Params) {
  const { key } = await params;
  const series = SERIES[key];
  if (!series) notFound();
  const posts = await getSeriesPosts(key);

  return (
    <section className="h-full overflow-hidden bg-surface pb-section">
      <PageHeader
        title={`시리즈 · ${series.name}`}
        description={series.description}
      />
      <div className="lane-text tablet:lane-media">
        <div
          className="grid gap-8 tablet:grid-cols-2 desktop:grid-cols-3"
          data-reveal-children
          data-reveal-stagger
        >
          {posts.map((post) => (
            <BlogTile
              key={post.slug}
              article={post}
              sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 334px, 311px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
