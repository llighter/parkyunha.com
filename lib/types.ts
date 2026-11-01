/** 글 유형 — 표시 이름은 lib/constants.ts 의 POST_TYPES */
export type PostType = "note" | "deep-dive";

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  category: string;
  /** 글 유형 (필수) */
  type: PostType;
  /** 시리즈 키 — 같은 값의 글을 한 줄로 모은다. 이름은 lib/constants.ts 의 SERIES */
  series?: string;
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
