import Image, { type StaticImageData } from "next/image";
import Figure from "./Figure/Figure";
import { laneSizes } from "@/lib/layout";

/** 글 속 이미지 한 장. inline 이면 본문 폭, 아니면 미디어 폭 */
export default function AppleImage({
  src,
  alt,
  caption,
  inline = false,
}: {
  src: string | StaticImageData;
  alt: string;
  caption: string;
  inline?: boolean;
}) {
  const lane = inline ? "text" : "media";
  return (
    <Figure lane={lane} caption={caption}>
      <Image src={src} alt={alt} sizes={laneSizes(lane)} />
    </Figure>
  );
}
