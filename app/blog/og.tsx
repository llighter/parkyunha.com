import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getPost } from "@/app/db/blog";
import { Seal } from "@/app/components/brand/Seal";
import { Wordmark } from "@/app/components/brand/Wordmark";
import { POST_TYPES } from "@/lib/constants";

/**
 * 글별 링크 미리보기 그림 (1200 × 630) — 흰 바탕에 유형 · 제목, 아래에 서명(워드마크 + 먹색 주문 낙관).
 * 글 폴더마다 opengraph-image.tsx 가 이 함수를 부른다. 빌드 때 한 번 그린다(정적).
 * 글꼴은 Pretendard Bold OTF (app/font, OFL) — 그림 생성기(satori)는 woff2 를 읽지 못한다.
 * 색은 밝은 테마 토큰 값: canvas #ffffff · fg #1d1d1f · fg-muted #6e6e73 · seal #1d1d1f
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// 서명 비율 — 대문자 32px: 워드마크 높이 = cap × 1.09, 도장 = cap × 2, 사이 = cap × 1
const CAP = 32;
const WORDMARK_HEIGHT = CAP * 1.09;
const WORDMARK_WIDTH = (WORDMARK_HEIGHT * 8096.7) / 1091.8;

export async function postOgImage(slug: string) {
  const [post, font] = await Promise.all([
    getPost(slug),
    readFile(join(process.cwd(), "app/font/Pretendard-Bold.otf")),
  ]);
  if (!post) throw new Error(`OG: 글을 찾지 못했다 — ${slug}`);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px 96px",
          background: "#ffffff",
          color: "#1d1d1f",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 28, color: "#6e6e73" }}>
            {POST_TYPES[post.metadata.type]}
          </div>
          {/* satori 는 word-break: keep-all 을 지키지 않아(‘어떨까’ 와 ‘?’ 사이에서 끊는다) 낱말마다 묶어 낱말 사이에서만 줄을 바꾼다 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 16,
              fontSize: 60,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            {post.metadata.title.split(" ").map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: CAP }}>
          <Wordmark
            title={null}
            fill="#1d1d1f"
            width={WORDMARK_WIDTH}
            height={WORDMARK_HEIGHT}
          />
          <Seal
            variant="ju"
            color="#1d1d1f"
            title={null}
            width={CAP * 2}
            height={CAP * 2}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Pretendard", data: font, weight: 700, style: "normal" }],
    },
  );
}
