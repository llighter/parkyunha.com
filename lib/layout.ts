/**
 * 레이아웃 토큰의 TS 사본.
 *
 * CSS 변수는 미디어 쿼리와 <img sizes> 안에서 쓸 수 없어서, 숫자가 필요한
 * JS 쪽(next/image 의 sizes, matchMedia)은 여기 값을 읽는다.
 * 값은 app/styles/tokens.css · app/globals.css 와 같아야 한다
 * → `node scripts/check-layout-tokens.mjs` 로 확인.
 */

export const BREAKPOINT = {
  /** 미디어가 화면을 다 채우지 않기 시작 */
  phoneLg: 415,
  tablet: 735,
  desktop: 1069,
} as const;

/** 레인 최대 폭(px). 실제 폭은 min(레인, 부모 폭) */
export const LANE = {
  phone: { text: 366, media: 414, wide: 414 },
  tablet: { text: (692 * 10) / 12, media: 692, wide: 850 },
  desktop: { text: (980 * 8) / 12, media: 980, wide: 1228 },
} as const;

/** 폰 본문 = 화면의 87.5% (좌우 6.25%) */
export const PHONE_TEXT_RATIO = 0.875;

export type Lane = "text" | "panel" | "media" | "wide" | "full";

const px = (n: number) => `${Math.ceil(n)}px`;

/**
 * next/image 의 sizes 문자열. 레인 폭을 그대로 옮긴다.
 *  laneSizes("media") →
 *  "(max-width: 413px) 100vw, (max-width: 734px) 414px, (max-width: 1068px) 692px, 980px"
 */
export function laneSizes(lane: Lane): string {
  if (lane === "full") return "100vw";

  const parts: string[] = [];
  const belowTablet = `(max-width: ${BREAKPOINT.tablet - 1}px)`;
  const belowDesktop = `(max-width: ${BREAKPOINT.desktop - 1}px)`;

  // 폰
  if (lane === "text") {
    const fluidUntil = Math.floor(LANE.phone.text / PHONE_TEXT_RATIO); // 418
    parts.push(`(max-width: ${fluidUntil}px) ${PHONE_TEXT_RATIO * 100}vw`);
    parts.push(`${belowTablet} ${px(LANE.phone.text)}`);
  } else {
    const max = lane === "panel" ? LANE.phone.text : LANE.phone[lane];
    parts.push(`(max-width: ${max - 1}px) 100vw`);
    parts.push(`${belowTablet} ${px(max)}`);
  }

  // 태블릿 · 데스크톱 — 화면이 레인보다 좁아지는 구간(wide)만 100vw
  const key = lane === "panel" ? "text" : lane;
  const tablet = LANE.tablet[key];
  const desktop = LANE.desktop[key];
  if (tablet >= BREAKPOINT.tablet) {
    parts.push(`(max-width: ${Math.ceil(tablet) - 1}px) 100vw`);
  }
  parts.push(`${belowDesktop} ${px(tablet)}`);
  if (desktop >= BREAKPOINT.desktop) {
    parts.push(`(max-width: ${Math.ceil(desktop) - 1}px) 100vw`);
  }
  parts.push(px(desktop));

  return parts.join(", ");
}

/**
 * 비율 프리셋 (가로:세로). 갤러리 · 그림의 aspect 에 이름으로 쓴다.
 * CSS 쪽은 aspect-ratio 값으로, 높이 상한 계산에는 ratio(가로 ÷ 세로)로 쓴다.
 */
export const ASPECT = {
  "16:9": [16, 9], // 기본 — 뉴스룸 갤러리 액자 980 × 551
  "21:9": [21, 9], // 시네마 · 파노라마
  "3:2": [3, 2], // 사진 (35mm)
  "4:3": [4, 3], // 스크린샷 · 문서
  "1:1": [1, 1], // 정사각
  "4:5": [4, 5], // 세로 사진
  "9:16": [9, 16], // 세로 영상 · 폰 화면
} as const;

export type AspectPreset = keyof typeof ASPECT;
export type Aspect = AspectPreset | `${number}:${number}`;

/** "4:5" → { css: "4 / 5", ratio: 0.8 } */
export function aspectOf(aspect: Aspect): { css: string; ratio: number } {
  const [w, h] =
    aspect in ASPECT
      ? ASPECT[aspect as AspectPreset]
      : aspect.split(":").map(Number);
  if (!(w > 0 && h > 0)) throw new Error(`비율 형식이 아니다: ${aspect}`);
  return { css: `${w} / ${h}`, ratio: w / h };
}
