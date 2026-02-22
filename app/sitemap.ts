import { getBlogPosts } from "@/app/db/blog";

export default async function sitemap() {
  const allBlogs = await getBlogPosts();
  let blogs = allBlogs.map((post) => ({
    url: `https://www.parkyunha.com/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog", "/work"].map((route) => ({
    url: `https://www.parkyunha.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
