export type BlogMetadata = {
  title: string;
  publishedAt: string;
  category: string;
  summary: string;
  image?: string;
  imageDescription?: string;
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
};
