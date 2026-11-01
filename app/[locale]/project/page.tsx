import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "@/app/components/ProjectCard";
import { projects } from "@/lib/projects";

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
          <ProjectCard
            key={project.name}
            project={project}
            tagline={st("tagline")}
            statusLabel={t("comingSoon")}
            LinkComponent={Link}
          />
        ))}
      </div>
    </div>
  );
}
