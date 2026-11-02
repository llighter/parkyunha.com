import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import * as content from "./content.mdx";
import Chip from "@/app/components/Chip";
import LinkList, { type LinkListItem } from "@/app/components/LinkList";
import PageHeader from "@/app/components/PageHeader";
import { ProjectCard } from "@/app/components/ProjectCard";
import { SOCIAL_LINKS } from "@/lib/constants";
import { projects } from "@/lib/projects";

// 글은 content.mdx 한 파일에 — 본문(default)과 한 줄 소개(intro). @types/mdx 가 이름 붙은 내보내기를 몰라 형을 알려 준다
const AboutContent = content.default;
const { intro } = content as unknown as { intro: string };

export const metadata: Metadata = {
  title: "About",
  description: intro,
};

const CHANNELS = [
  { name: "YouTube", href: SOCIAL_LINKS.youtube },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
  { name: "X", href: SOCIAL_LINKS.x },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

/**
 * 소개 쪽 — PageHeader 아래 글 한 편(블로그 글과 같은 본문 규칙: 문단 사이 한 줄, h2 = heading).
 * 글 사이의 카드 · 링크 줄 · 칩은 prose 밖(not-prose)에서 제 모양으로
 */
export default async function AboutPage() {
  // 로케일 경로 밖(한국어)이라 로케일을 정해 문구를 가져온다
  const t = await getTranslations({ locale: "ko", namespace: "project" });
  const st = await getTranslations({ locale: "ko", namespace: "studycard" });
  const studycard = projects.find((project) => project.name === "StudyCard");

  return (
    <div className="pb-section">
      <PageHeader title="About" description={intro} />
      <article className="lanes article prose max-w-none">
        <AboutContent
          components={{
            StudyCard: () =>
              studycard ? (
                <div className="not-prose mt-6">
                  <ProjectCard
                    project={studycard}
                    tagline={st("tagline")}
                    statusLabel={t("comingSoon")}
                    headingLevel={3}
                  />
                </div>
              ) : null,
            SiteLinks: ({ items }: { items: LinkListItem[] }) => (
              <div className="not-prose mt-6">
                <LinkList items={items} />
              </div>
            ),
            Channels: () => (
              <div className="not-prose mt-4 flex flex-wrap gap-3">
                {CHANNELS.map(({ name, href }) => (
                  <Chip key={name} href={href}>
                    {name}
                  </Chip>
                ))}
              </div>
            ),
          }}
        />
      </article>
    </div>
  );
}
