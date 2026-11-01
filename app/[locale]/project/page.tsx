import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/app/components/PageHeader";
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
    <div className="pb-section">
      <PageHeader title={t("title")} description={t("description")} />
      <div className="lane-text flex flex-col gap-4">
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
