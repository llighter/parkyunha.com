import type { ImageLoaderProps } from "next/image";
import PHOTO_WIDTHS from "./photo-widths.json";

/**
 * 사진 쪽 loader — scripts/build-photos.mjs 가 미리 만든 크기별 파일을 고르기만 한다(Vercel 이미지 최적화 없음).
 * src 는 '/photos/<묶음>/<이름>', 요청 폭 이상인 가장 작은 판을 돌려준다(없으면 가장 큰 판).
 */
export default function photoLoader({ src, width }: ImageLoaderProps) {
  const w = PHOTO_WIDTHS.find((size) => size >= width) ?? PHOTO_WIDTHS.at(-1);
  return `${src}-${w}.jpg`;
}
