import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface Project {
  name: string;
  href: string;
  icon: string;
  platforms: string[];
  status: "available" | "coming-soon";
  taglineKey: string;
}

const projects: Project[] = [
  {
    name: "StudyCard",
    href: "/studycard",
    icon: "/images/studycard-logo.png",
    platforms: ["iPhone", "iPad", "Mac", "Apple Watch"],
    status: "coming-soon",
    taglineKey: "studycard",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "project" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("project");
  const st = await getTranslations("studycard");

  return (
    <div className="lane-text py-8 tablet:py-12">
      <h1 className="mb-2 text-2xl font-bold text-fg">{t("title")}</h1>
      <p className="mb-8 text-fg-muted">{t("description")}</p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link
            key={project.name}
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
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-fg group-hover:text-accent">
                  {project.name}
                </h2>
                {project.status === "coming-soon" && (
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-fg-muted">
                    {t("comingSoon")}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-fg-muted">{st("tagline")}</p>
              <div className="mt-2 flex gap-2">
                {project.platforms.map((platform) => (
                  <span key={platform} className="text-xs text-fg-subtle">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
