import type { Metadata } from "next";
import TextTabs from "@/app/components/Works/TextTabs";
import { AlbumCard, VideoCard } from "@/app/components/Works/WorkCards";
import WorksHeader from "@/app/components/Works/WorksHeader";
import WorksShell, {
  WorksCards,
  WorksFoot,
} from "@/app/components/Works/WorksShell";
import { WorksTabs, WorksView } from "@/app/components/Works/WorksView";
import { SOCIAL_LINKS } from "@/lib/constants";
import { albums, videos } from "@/lib/works";

const DESCRIPTION = "사진, 영상, 그리고 만들어가는 것들을 기록합니다.";

export const metadata: Metadata = {
  title: "Works",
  description: DESCRIPTION,
};

const CHANNELS = [
  { name: "YouTube", href: SOCIAL_LINKS.youtube },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
  { name: "X", href: SOCIAL_LINKS.x },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

/** 첫 화면에 보이는 표지 — 데스크톱 한 줄(3장)까지 미리 불러온다 */
const PRELOAD_COVERS = 3;

/**
 * /works 허브 — 가운데 머리 · 글자 탭(All | Albums | Videos) · 앨범 카드 · 영상 카드 · 채널 줄.
 * 영상이 없으면 탭과 영상 구역을 뺀다(남는 보기가 하나뿐이라)
 */
export default function WorksPage() {
  const hasVideos = videos.length > 0;
  return (
    <WorksShell>
      <WorksView>
        <WorksHeader title="Works" description={DESCRIPTION}>
          {hasVideos && <WorksTabs />}
        </WorksHeader>

        <WorksCards section="albums" label="앨범">
          {albums.map((album, i) => (
            <AlbumCard
              key={album.slug}
              album={album}
              preload={i < PRELOAD_COVERS}
            />
          ))}
        </WorksCards>

        {hasVideos && (
          <WorksCards section="videos" label="영상">
            {videos.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </WorksCards>
        )}
      </WorksView>

      <WorksFoot>
        <TextTabs label="채널" nav>
          {CHANNELS.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          ))}
        </TextTabs>
      </WorksFoot>
    </WorksShell>
  );
}
