import { OG_CONTENT_TYPE, OG_SIZE, postOgImage } from "@/app/blog/og";

// 글별 링크 미리보기 그림 — 모양은 app/blog/og.tsx
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Hello, World! 조금 더 긴 제목이면 어떨까? 과연 길이가 길어지면 어떻게 될까 궁금하다";

export default function Image() {
  return postOgImage("hello-world");
}
