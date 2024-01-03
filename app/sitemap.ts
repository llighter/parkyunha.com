import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs.map((post) => ({
    url: `https://www.parkyunha.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/work"].map((route) => ({
    url: `https://www.parkyunha.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
