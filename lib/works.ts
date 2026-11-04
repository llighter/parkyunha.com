import manifest from "./photos.manifest.json";

/** 앨범 사진 한 장 — 마스터는 photos/<앨범 slug>/<file>.jpg */
export interface Photo {
  /** 확장자 없는 파일 이름 */
  file: string;
  alt: string;
  /** 라이트박스에서 사진 아래 설명 — 없으면 줄을 뺀다 */
  caption?: string;
  /** 3:4 로 자를 때 자리(object-position) — 기본 가운데 */
  position?: string;
}

/** 앨범 — /works 카드 · /works/<slug> 쪽 */
export interface Album {
  slug: string;
  title: string;
  /** "2024.05" — 없으면 메타에서 뺀다 */
  date?: string;
  /** 한 줄 — 없으면 줄을 뺀다 */
  description?: string;
  /** 표지 — photos 중 하나의 file */
  cover: string;
  photos: Photo[];
}

/** 영상 — 짧은 클립은 /public mp4, 긴 영상은 YouTube. 썸네일은 photos/videos/<id 또는 file>.jpg */
export type Video =
  | {
      kind: "youtube";
      /** watch?v= 뒤의 값 */
      id: string;
      title: string;
      /** "5:07" */
      duration: string;
    }
  | {
      kind: "clip";
      /** public/videos/<file>.mp4 · 썸네일 photos/videos/<file>.jpg */
      file: string;
      title: string;
      duration: string;
    };

/** 앨범 — 앞에서부터 /works 카드 순서이자 '다른 앨범' 줄의 이전 · 다음 */
export const albums: Album[] = [
  {
    slug: "seoul",
    title: "서울",
    cover: "han-river",
    photos: [
      { file: "han-river", alt: "서울 한강에서 동생과 함께" },
      { file: "seoul", alt: "비행기에서 내려다본 서울" },
    ],
  },
  {
    slug: "osaka",
    title: "오사카",
    cover: "osaka-castle",
    photos: [
      { file: "osaka-castle", alt: "일본 오사카성 앞에서" },
      { file: "hi-five", alt: "글리코 간판과 하이파이브" },
    ],
  },
];

/** 영상 — 비어 있으면 /works 의 Videos 탭 · 구역을 숨긴다 */
export const videos: Video[] = [
  {
    kind: "youtube",
    id: "32qFsiE868o",
    title: "SSH config로 원격서버 편하게 접속하기(AWS EC2)",
    duration: "5:07",
  },
];

/** PhotoImage 에 넘길 값 — src 는 loader 가 받는 '/photos/<묶음>/<이름>' */
export interface PhotoSource {
  src: string;
  width: number;
  height: number;
}

const sizes: Record<string, { width: number; height: number }> = manifest;

/** 'seoul/han-river' → src · 원래 폭 · 높이. 목록에 없으면 빌드가 멈춘다 */
export function photoSource(key: string): PhotoSource {
  const size = sizes[key];
  if (!size) {
    throw new Error(
      `photos/${key}.jpg 가 lib/photos.manifest.json 에 없다 — 사진을 넣고 npm run photos`,
    );
  }
  return { src: `/photos/${key}`, ...size };
}

export function albumPhotoSource(album: Album, file: string): PhotoSource {
  return photoSource(`${album.slug}/${file}`);
}

export function videoThumbSource(video: Video): PhotoSource {
  return photoSource(
    `videos/${video.kind === "youtube" ? video.id : video.file}`,
  );
}

export function videoHref(video: Video): string {
  return video.kind === "youtube"
    ? `https://www.youtube.com/watch?v=${video.id}`
    : `/videos/${video.file}.mp4`;
}

export function getAlbum(slug: string): Album | undefined {
  return albums.find((album) => album.slug === slug);
}

/** 표지가 그 앨범 사진이 아니면 빌드가 멈춘다 */
for (const album of albums) {
  if (!album.photos.some((photo) => photo.file === album.cover)) {
    throw new Error(`${album.slug}: cover '${album.cover}' 가 photos 에 없다`);
  }
}
