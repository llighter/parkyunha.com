"use client";

import Image, { type ImageProps } from "next/image";
import photoLoader from "@/lib/photo-loader";

/**
 * 사진 쪽 그림 — next/image 에 사진 loader 를 붙인다.
 * loader 는 함수라 서버 부품에서 Image 에 바로 넘길 수 없어 이 감싸개를 쓴다. src 는 '/photos/<묶음>/<이름>'
 */
export default function PhotoImage({
  alt,
  ...props
}: Omit<ImageProps, "loader">) {
  return <Image alt={alt} loader={photoLoader} {...props} />;
}
