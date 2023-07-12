import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const Article = defineNestedType(() => ({
  name: "Article",
  fields: {
    title: { type: "string", required: true },
  },
}));
export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    publishedAt: {
      type: "string",
      description: "The date of the post",
      required: true,
    },
    category: {
      type: "string",
      require: true,
    },
    summary: {
      type: "string",
      require: true,
    },
    image: {
      type: "string",
    },
    imageDescription: {
      type: "string",
    },
    articles: {
      type: "list",
      of: Article,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    structuredData: {
      type: "object",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        description: doc.summary,
        image: `https://parkyunha.com${doc.image}`,
        url: `https://parkyunha.com/blog/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: "Park Yunha",
        },
      }),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word-highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
