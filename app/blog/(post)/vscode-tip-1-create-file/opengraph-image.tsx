import { OG_CONTENT_TYPE, OG_SIZE, postOgImage } from "@/app/blog/og";

// 글별 링크 미리보기 그림 — 모양은 app/blog/og.tsx
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "VSCODE TIP #1 - 단축키로 파일 생성하기";

export default function Image() {
  return postOgImage("vscode-tip-1-create-file");
}
