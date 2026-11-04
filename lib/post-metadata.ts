import type { BlogMetadata } from "./types";

/**
 * 글 metadata — 요약(summary)을 검색 · 링크 미리보기 설명(description)으로도 쓴다.
 * 글의 page.mdx 에서 `export const metadata = postMetadata({ … })`
 */
export function postMetadata<T extends BlogMetadata>(metadata: T) {
  return { ...metadata, description: metadata.summary };
}
