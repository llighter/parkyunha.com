import Figure from "./Figure/Figure";

/** 유튜브 영상 — inline 이면 본문 폭, 아니면 미디어 폭. 16:9 */
export default function YoutubeIframe({
  src,
  title,
  caption,
  inline = false,
}: {
  src: string;
  title: string;
  caption?: string;
  inline?: boolean;
}) {
  return (
    <Figure lane={inline ? "text" : "media"} aspect="16:9" caption={caption}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </Figure>
  );
}
