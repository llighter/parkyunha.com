import type { PostType } from "@/lib/types";

export const SITE_URL = "https://www.parkyunha.com";
export const SITE_NAME = "Park Yunha";
export const SITE_DESCRIPTION = "Dreaming to be a Developer and Entrepreneur.";

/** 글 유형 표시 이름 (metadata.type → 이름) */
export const POST_TYPES: Record<PostType, string> = {
  note: "Note",
  "deep-dive": "Deep Dive",
};

/** 시리즈 이름 (metadata.series → 이름) */
export const SERIES: Record<string, string> = {
  "dev-tools": "개발 도구 팁",
};

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@parkyunha90",
  x: "https://x.com/llighter90",
  instagram: "https://www.instagram.com/hadbsgk/",
  github: "https://github.com/llighter",
};
