import Link from "next/link";
import {
  albumPhotoSource,
  videoHref,
  videoThumbSource,
  type Album,
  type Video,
} from "@/lib/works";
import PhotoImage from "./PhotoImage";
import s from "./Works.module.css";

/** '2024.05 · 2장' — 날짜가 없으면 '2장' */
export function albumMeta(album: Album) {
  return [album.date, `${album.photos.length}장`].filter(Boolean).join(" · ");
}

/** 앨범 카드 — 표지 3:4(모서리 0) 아래 제목 · mono 메타. 누르면 /works/<slug> */
export function AlbumCard({
  album,
  preload = false,
}: {
  album: Album;
  preload?: boolean;
}) {
  const cover = album.photos.find((photo) => photo.file === album.cover)!;
  return (
    <Link href={`/works/${album.slug}`} className={s.card}>
      <div className={`${s.picture} ${s.cover}`}>
        <PhotoImage
          {...albumPhotoSource(album, cover.file)}
          alt={cover.alt}
          fill
          sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 334px, 383px"
          preload={preload}
          className="object-cover"
          style={{ objectPosition: cover.position }}
        />
      </div>
      <h2 className={`text-showcase-card ${s.cardTitle}`}>{album.title}</h2>
      <p className={`font-mono text-mono text-fg-muted ${s.cardMeta}`}>
        {albumMeta(album)}
      </p>
    </Link>
  );
}

/** 영상 카드 — 썸네일 16:9 + 재생 표시, 아래 제목 · 'YouTube ↗ · 5:07'. YouTube 는 새 탭 */
export function VideoCard({ video }: { video: Video }) {
  const youtube = video.kind === "youtube";
  const thumb = videoThumbSource(video);
  return (
    <a
      href={videoHref(video)}
      className={s.card}
      {...(youtube ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className={`${s.picture} ${s.thumb}`}>
        <PhotoImage
          src={thumb.src}
          alt=""
          fill
          sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 334px, 594px"
          className="object-cover"
        />
        <span className={s.play} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M9 6.8v10.4L17.2 12z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <h2 className={`text-showcase-card ${s.cardTitle}`}>{video.title}</h2>
      <p className={`font-mono text-mono text-fg-muted ${s.cardMeta}`}>
        {youtube ? "YouTube ↗" : "클립"} · {video.duration}
        {youtube && <span className="sr-only"> (새 탭)</span>}
      </p>
    </a>
  );
}
