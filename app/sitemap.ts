import { getBlogPosts } from "@/app/db/blog";
import { SERIES, SITE_URL } from "@/lib/constants";
import { locales } from "@/i18n/routing";

const i18nRoutes = ["/project", "/studycard", "/studycard/privacy"];

export default async function sitemap() {
  const allBlogs = await getBlogPosts();
  const blogs = allBlogs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }));

  const seriesRoutes = Object.keys(SERIES).map((key) => `/blog/series/${key}`);

  const staticRoutes = ["", "/blog", "/works", ...seriesRoutes].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  const i18nEntries = i18nRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${locale === "ko" ? "" : `/${locale}`}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })),
  );

  return [...staticRoutes, ...i18nEntries, ...blogs];
}
