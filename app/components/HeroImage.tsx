import Image, { type StaticImageData } from "next/image";
import Figure from "./Figure/Figure";
import { laneSizes } from "@/lib/layout";

/** 글 머리 대표 이미지 — 미디어 폭, 3:2 로 잘라 꽉 채운다 */
export default function HeroImage({
  src,
  alt,
  caption,
}: {
  src: string | StaticImageData;
  alt: string;
  caption: string;
}) {
  return (
    <Figure lane="media" aspect="3:2" caption={caption}>
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes={laneSizes("media")}
        className="object-cover"
      />
    </Figure>
  );
}
