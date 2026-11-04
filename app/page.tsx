import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getBlogPosts, getSeriesPosts } from "@/app/db/blog";
import BlogTile from "@/app/components/BlogTile";
import Carousel from "@/app/components/Carousel/Carousel";
import { ProjectCard } from "@/app/components/ProjectCard";
import PhotoImage from "@/app/components/Works/PhotoImage";
import { SERIES, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { projects } from "@/lib/projects";
import { photoSource } from "@/lib/works";

/** 홈 시리즈 줄에 싣는 시리즈 */
const HOME_SERIES = "dev-tools";

/** 홈 사진 6장 — 사진 파이프라인(photos/<묶음>/<이름>.jpg), 앨범과 같은 사진은 그 마스터를 함께 쓴다 */
const PHOTOS = [
  { key: "seoul/han-river", alt: "서울 한강에서 동생과 함께" },
  { key: "osaka/osaka-castle", alt: "일본 오사카성 앞에서" },
  { key: "osaka/hi-five", alt: "글리코 간판과 하이파이브" },
  { key: "home/eclipse", alt: "Eclipse 와 Java 를 캐릭터로 그린 그림" },
  { key: "seoul/seoul", alt: "비행기에서 내려다본 서울" },
  {
    key: "home/me-at-home",
    alt: "어두운 방, 책상 앞에서 휴대폰 화면을 들여다보는 모습 (흑백)",
  },
];

const SOCIALS = [
  { name: "YouTube", href: SOCIAL_LINKS.youtube },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
  { name: "X", href: SOCIAL_LINKS.x },
  { name: "GitHub", href: SOCIAL_LINKS.github },
];

/** 구역 끝 알약 링크 — 바탕은 놓이는 면과 반대로(surface 위 canvas, canvas 위 surface) */
const PILL =
  "rounded-full px-[22px] py-3 text-sm font-semibold text-fg transition-colors hover:bg-line";

function Badge(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-sm border border-line bg-surface p-1 text-sm leading-4 text-fg no-underline"
    />
  );
}

export default async function Home() {
  // 최신은 시리즈 줄에 나오는 글을 빼고 최근 3편 — 첫 편은 큰 타일
  const latest = (await getBlogPosts())
    .filter((post) => !post.metadata.series)
    .slice(0, 3);
  const [lead, ...rest] = latest;
  const series = SERIES[HOME_SERIES];
  const seriesPosts = await getSeriesPosts(HOME_SERIES);

  // 홈은 로케일 경로 밖(한국어)이라 로케일을 정해 문구를 가져온다
  const t = await getTranslations({ locale: "ko", namespace: "project" });
  const st = await getTranslations({ locale: "ko", namespace: "studycard" });

  return (
    <>
      {/* 소개 */}
      <section className="lane-text pt-2 pb-section tablet:pt-6 desktop:pt-10">
        <h1 className="my-8 text-title break-keep">
          안녕하세요, 박윤하입니다.
        </h1>
        <div className="prose">
          <p>
            {`안녕하세요. `}
            <span className="not-prose">
              <Badge href={SITE_URL}>parkyunha.com</Badge>
            </span>
            {` 블로그를 운영하고 있는 `}
            <b>박윤하</b>
            {`입니다. 금융권에서 비대면 채널 개발과 운영을 담당하고 있으며, 개인적으로 `}
            <Link href="/project">앱을 만들고</Link>
            {` 있습니다.`}
          </p>
          <p>
            {`스스로 만들어낸 결과를 다듬어서 여러 사람과 공유하는 것을 좋아합니다. 글이나 영상 혹은 나만의 프로덕트를 꾸준히 만들어 가는것이 목표입니다.`}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          {SOCIALS.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {name}
            </a>
          ))}
        </div>
      </section>

      {/* 글 — 최신 · 시리즈는 한 surface 띠 위에 */}
      <div className="bg-surface pb-section">
        <section aria-labelledby="home-latest">
          <div className="lane-text py-8">
            <h2 id="home-latest" className="text-title">
              최신
            </h2>
          </div>
          <div className="lane-text flex flex-col gap-8 tablet:lane-media">
            {lead && (
              <BlogTile
                article={lead}
                sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 453px, 643px"
              />
            )}
            {rest.length > 0 && (
              <div
                className="grid gap-8 tablet:grid-cols-2"
                data-reveal-children
                data-reveal-stagger
              >
                {rest.map((post) => (
                  <BlogTile
                    key={post.slug}
                    article={post}
                    sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 334px, 474px"
                  />
                ))}
              </div>
            )}
            <Link
              href="/blog"
              className="self-center text-body font-medium text-fg underline decoration-1 underline-offset-[0.2em]"
            >
              모든 글 보기
            </Link>
          </div>
        </section>

        {series && seriesPosts.length > 0 && (
          <section aria-labelledby="home-series" className="mt-8">
            <div className="lane-text pt-8 pb-6">
              <h2 id="home-series" className="text-title break-keep">
                시리즈 · {series.name}
              </h2>
              <p className="mt-2 text-body break-keep text-fg-muted">
                {series.description}
              </p>
            </div>
            <Carousel label={`시리즈 ${series.name}`} itemName="글" surface>
              {seriesPosts.map((post) => (
                <BlogTile
                  key={post.slug}
                  article={post}
                  sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 334px, 311px"
                />
              ))}
            </Carousel>
            <div className="mt-6 flex justify-center">
              <Link
                href={`/blog/series/${HOME_SERIES}`}
                className={`${PILL} bg-canvas`}
              >
                시리즈 모두 보기
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* 사진 */}
      <section aria-labelledby="home-photos" className="pb-section">
        <div className="lane-text pt-8 pb-6">
          <h2 id="home-photos" className="text-title">
            사진
          </h2>
        </div>
        <Carousel label="사진" itemName="사진" variant="photo">
          {PHOTOS.map(({ key, alt }) => (
            <PhotoImage
              key={key}
              src={photoSource(key).src}
              alt={alt}
              fill
              sizes="(max-width: 734px) 62.5vw, (max-width: 1068px) 215px, 227px"
              className="object-cover"
            />
          ))}
        </Carousel>
        <div className="mt-6 flex justify-center">
          <Link href="/works" className={`${PILL} bg-surface`}>
            works 에서 더 보기
          </Link>
        </div>
      </section>

      {/* 프로젝트 — 날짜순 피드가 아닌 고정 자리 */}
      <section aria-labelledby="home-project" className="pb-section">
        <div className="lane-text py-8">
          <h2 id="home-project" className="text-title">
            프로젝트
          </h2>
        </div>
        <div className="lane-text flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              tagline={st("tagline")}
              statusLabel={t("comingSoon")}
              headingLevel={3}
            />
          ))}
        </div>
      </section>
    </>
  );
}
