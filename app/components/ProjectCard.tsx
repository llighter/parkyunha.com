import Image from "next/image";
import NextLink from "next/link";
import type { ComponentType, ReactNode } from "react";
import type { Project } from "@/lib/projects";

type LinkProps = { href: string; className?: string; children: ReactNode };

/**
 * 프로젝트 카드 — /project 목록 · 홈 프로젝트 구역.
 * 문구(tagline · 상태)는 부르는 쪽이 번역해서 넘긴다. Link 는 /project 의 로케일 링크처럼 바꿔 끼울 수 있다
 */
export function ProjectCard({
  project,
  tagline,
  statusLabel,
  headingLevel = 2,
  LinkComponent = NextLink,
}: {
  project: Project;
  tagline: string;
  /** 준비 중일 때 배지 글자 */
  statusLabel: string;
  /** 쪽 안에서의 제목 단계 — /project 는 2, 홈은 구역 제목 아래라 3 */
  headingLevel?: 2 | 3;
  LinkComponent?: ComponentType<LinkProps>;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <LinkComponent
      href={project.href}
      className="group flex gap-5 rounded-2xl border border-line p-6 transition-colors hover:bg-surface"
    >
      <Image
        src={project.icon}
        alt={`${project.name} logo`}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Heading className="text-lg font-semibold text-fg group-hover:text-accent">
            {project.name}
          </Heading>
          {project.status === "coming-soon" && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-fg-muted">
              {statusLabel}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm break-keep text-fg-muted">{tagline}</p>
        {/* 지원 기기는 글자라 fg-muted (fg-subtle 은 3.6:1 로 글자에 쓰지 않는다) */}
        <p className="mt-2 text-xs text-fg-muted">
          {project.platforms.join(" · ")}
        </p>
      </div>
    </LinkComponent>
  );
}
