import type { Metadata } from "next";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title") + " - StudyCard",
    description: t("title"),
  };
}

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("privacy");

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 tablet:py-24">
      <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-12 text-sm text-neutral-500 dark:text-neutral-400">
        {t("lastUpdated")}
      </p>

      <div className="space-y-10 text-neutral-700 dark:text-neutral-300 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:dark:text-neutral-100 [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
        <section>
          <h2>{t("collection.title")}</h2>
          <p>{t("collection.description")}</p>
          <ul className="mt-3 space-y-1">
            <li>{t("collection.item1")}</li>
            <li>{t("collection.item2")}</li>
            <li>{t("collection.item3")}</li>
          </ul>
        </section>

        <section>
          <h2>{t("storage.title")}</h2>
          <ul className="space-y-1">
            <li>{t("storage.item1")}</li>
            <li>{t("storage.item2")}</li>
            <li>{t("storage.item3")}</li>
          </ul>
        </section>

        <section>
          <h2>{t("sharing.title")}</h2>
          <p>{t("sharing.description")}</p>
        </section>

        <section>
          <h2>{t("tracking.title")}</h2>
          <p>{t("tracking.description")}</p>
        </section>

        <section>
          <h2>{t("deletion.title")}</h2>
          <p>{t("deletion.description")}</p>
        </section>

        <section>
          <h2>{t("contact.title")}</h2>
          <p>
            {t.rich("contact.description", {
              link: (chunks) => (
                <a
                  href="https://github.com/llighter/StudyCard11"
                  className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </section>
      </div>
    </article>
  );
}
