import { OG_CONTENT_TYPE, OG_SIZE, postOgImage } from "@/app/blog/og";

// 글별 링크 미리보기 그림 — 모양은 app/blog/og.tsx
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Apple, 이산화탄소 제거를 위한 혁신적인 복원 기금 확대";

export default function Image() {
  return postOgImage("apple-news-sample");
}
