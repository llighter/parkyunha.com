import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project",
  description: "개인 프로젝트 목록",
};

interface Project {
  name: string;
  tagline: string;
  href: string;
  icon: string;
  platforms: string[];
  status: "available" | "coming-soon";
}

const projects: Project[] = [
  {
    name: "StudyCard",
    tagline: "간격 반복으로 효율적인 암기를 도와주는 플래시카드 앱",
    href: "/studycard",
    icon: "📚",
    platforms: ["iPhone", "iPad", "Mac", "Apple Watch"],
    status: "coming-soon",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group flex gap-5 rounded-2xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-3xl shadow-sm">
        {project.icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            {project.name}
          </h2>
          {project.status === "coming-soon" && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              준비 중
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {project.tagline}
        </p>
        <div className="mt-2 flex gap-2">
          {project.platforms.map((platform) => (
            <span
              key={platform}
              className="text-xs text-neutral-400 dark:text-neutral-500"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function ProjectPage() {
  return (
    <div className="content-container py-8 tablet:py-12">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Project
      </h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        직접 만들고 운영하는 프로젝트들
      </p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
