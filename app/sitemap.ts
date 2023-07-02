import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs.map((post) => ({
    url: `https://llighter.vercel.app/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/about"].map((route) => ({
    url: `https://llighter.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
