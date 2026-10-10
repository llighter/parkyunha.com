import Gallery, { type GalleryItem } from "./Gallery/Gallery";

/** 예전 이름 그대로 쓰는 글(MDX)을 위한 얇은 포장. 새 글은 Gallery 를 바로 쓴다 */
export default function AppleGallery({
  images,
  label,
}: {
  images: GalleryItem[];
  label?: string;
}) {
  return <Gallery items={images} label={label} />;
}
