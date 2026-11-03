import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGrid from "@/app/components/Works/PhotoGrid";
import TextTabs from "@/app/components/Works/TextTabs";
import { albumMeta } from "@/app/components/Works/WorkCards";
import WorksHeader from "@/app/components/Works/WorksHeader";
import WorksShell, { WorksFoot } from "@/app/components/Works/WorksShell";
import { albumPhotoSource, albums, getAlbum } from "@/lib/works";

type Params = { params: Promise<{ album: string }> };

// 앨범은 lib/works.ts 에 있는 것만 — 빌드 때 쪽을 만들고, 모르는 앨범은 404
export const dynamicParams = false;

export function generateStaticParams() {
  return albums.map((album) => ({ album: album.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const album = getAlbum((await params).album);
  if (!album) return {};
  return {
    title: album.title,
    description:
      album.description ?? `${album.title} — 사진 ${album.photos.length}장`,
  };
}

/** 앨범 쪽 — ← Works · 가운데 제목 · mono 메타 · 설명, 사진 그리드, 아래 '다른 앨범' 줄 */
export default async function AlbumPage({ params }: Params) {
  const album = getAlbum((await params).album);
  if (!album) notFound();

  const index = albums.indexOf(album);
  const prev = albums[index - 1];
  const next = albums[index + 1];

  return (
    <WorksShell>
      <WorksHeader
        back={{ href: "/works", label: "Works" }}
        title={album.title}
        meta={albumMeta(album)}
        description={album.description}
      />
      <PhotoGrid
        photos={album.photos.map(({ file, alt, caption, position }) => ({
          ...albumPhotoSource(album, file),
          alt,
          caption,
          position,
        }))}
      />
      <WorksFoot album>
        <TextTabs label="다른 앨범" nav>
          {prev && <Link href={`/works/${prev.slug}`}>← {prev.title}</Link>}
          <Link href="/works">Works</Link>
          {next && <Link href={`/works/${next.slug}`}>{next.title} →</Link>}
        </TextTabs>
      </WorksFoot>
    </WorksShell>
  );
}
