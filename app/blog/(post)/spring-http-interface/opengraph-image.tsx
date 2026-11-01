import { OG_CONTENT_TYPE, OG_SIZE, postOgImage } from "@/app/blog/og";

// 글별 링크 미리보기 그림 — 모양은 app/blog/og.tsx
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Spring으로 HTTP 클라이언트 만들기";

export default function Image() {
  return postOgImage("spring-http-interface");
}
