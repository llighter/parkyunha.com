import type { PostType } from "@/lib/types";

export const SITE_URL = "https://www.parkyunha.com";
export const SITE_NAME = "Park Yunha";
export const SITE_DESCRIPTION = "Dreaming to be a Developer and Entrepreneur.";

/** 글 유형 표시 이름 (metadata.type → 이름) */
export const POST_TYPES: Record<PostType, string> = {
  note: "Note",
  "deep-dive": "Deep Dive",
};

/** 시리즈 (metadata.series → 이름 · 한 줄 설명) */
export const SERIES: Record<string, { name: string; description: string }> = {
  "dev-tools": {
    name: "개발 도구 팁",
    description: "에디터와 도구를 손에 익히는 짧은 글 모음",
  },
};

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@parkyunha90",
  x: "https://x.com/llighter90",
  instagram: "https://www.instagram.com/hadbsgk/",
  github: "https://github.com/llighter",
};
