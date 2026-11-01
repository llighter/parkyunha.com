import { OG_CONTENT_TYPE, OG_SIZE, postOgImage } from "@/app/blog/og";

// 글별 링크 미리보기 그림 — 모양은 app/blog/og.tsx
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Webstorm에서 prettier 사용하기";

export default function Image() {
  return postOgImage("prettier");
}
