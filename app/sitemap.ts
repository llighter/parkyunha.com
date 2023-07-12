import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs.map((post) => ({
    url: `https://parkyunha.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/about"].map((route) => ({
    url: `https://parkyunha.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
