import { getBlogPosts } from "@/app/db/blog";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap() {
  const allBlogs = await getBlogPosts();
  const blogs = allBlogs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog", "/work"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
