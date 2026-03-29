import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
    icon: "📚",
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

export default async function ProjectPage() {
  const t = await getTranslations("project");
  const st = await getTranslations("studycard");

  return (
    <div className="content-container py-8 tablet:py-12">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {t("title")}
      </h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        {t("description")}
      </p>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link
            key={project.name}
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
                    {t("comingSoon")}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {st("tagline")}
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
        ))}
      </div>
    </div>
  );
}
