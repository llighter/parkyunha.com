export type BlogMetadata = {
  title: string;
  publishedAt: string;
  category: string;
  summary: string;
  image?: string;
  imageDescription?: string;
  /** 고친 날 — JSON-LD dateModified · sitemap lastModified. 없으면 publishedAt */
  updatedAt?: string;
  /** true 면 목록 · sitemap 에서 뺀다 (테스트 · 초안). 주소로는 열린다 */
  hidden?: boolean;
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
};
