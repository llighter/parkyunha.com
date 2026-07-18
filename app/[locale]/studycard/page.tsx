import type { Metadata } from "next";
import Image from "next/image";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studycard.meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const featureKeys = [
  { key: "cardTypes", icon: "🃏" },
  { key: "spacedRepetition", icon: "🔄" },
  { key: "stats", icon: "📊" },
  { key: "pencil", icon: "✏️" },
  { key: "widgets", icon: "🔔" },
  { key: "icloud", icon: "☁️" },
] as const;

const platforms = [
  { key: "iPhone", displayName: "iPhone", requirement: "iOS 26+", icon: "📱" },
  { key: "iPad", displayName: "iPad", requirement: "iPadOS 26+", icon: "📲" },
  { key: "Mac", displayName: "Mac", requirement: "macOS 26+", icon: "💻" },
  {
    key: "AppleWatch",
    displayName: "Apple Watch",
    requirement: "watchOS 26+",
    icon: "⌚",
  },
] as const;

const differenceKeys = [
  { key: "noSubscription", detailKey: "noSubscriptionDetail" },
  { key: "noAds", detailKey: "noAdsDetail" },
  { key: "noTracking", detailKey: "noTrackingDetail" },
  { key: "allDevices", detailKey: "allDevicesDetail" },
] as const;

function DownloadButton() {
  const t = useTranslations("studycard.hero");

  return (
    <div className="inline-flex h-14 items-center rounded-xl bg-neutral-900 px-8 text-base font-medium text-white dark:bg-white dark:text-neutral-900">
      {t("download")}
    </div>
  );
}

function HeroSection() {
  const t = useTranslations("studycard.hero");

  return (
    <section className="px-6 pb-16 pt-20 text-center tablet:pb-24 tablet:pt-28">
      <div className="mx-auto max-w-2xl">
        <Image
          src="/images/studycard-logo.png"
          alt="StudyCard logo"
          width={192}
          height={192}
          priority
          className="mx-auto mb-8 h-48 w-48"
        />
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 tablet:text-6xl">
          StudyCard
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 tablet:text-2xl">
          {t("line1")}
          <br />
          {t("line2")}
          <br />
          {t("line3")}
        </p>
        <DownloadButton />
      </div>
    </section>
  );
}

function AppPreviewSection() {
  const t = useTranslations("studycard.preview");

  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-lg text-neutral-600 dark:text-neutral-400">
          {t("description")}
        </p>
        <div className="mx-auto flex aspect-video max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-neutral-400 dark:text-neutral-500">
            {t("placeholder")}
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const t = useTranslations("studycard.features");

  return (
    <section id="features" className="px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-center text-lg text-neutral-600 dark:text-neutral-400">
          {t("subtitle")}
        </p>
        <div className="grid gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
          {featureKeys.map(({ key, icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <div className="mb-3 text-3xl">{icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  const t = useTranslations("studycard.platforms");
  const locale = useLocale();

  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-center text-lg text-neutral-600 dark:text-neutral-400">
          {t("subtitle")}
        </p>
        <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-4">
          {platforms.map(({ key, displayName, requirement, icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl bg-white p-6 dark:bg-neutral-800/50"
            >
              <div className="mb-4 text-5xl">{icon}</div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {displayName}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {t(key)}
              </p>
              <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                {requirement}
              </p>
              {/* 출시 후 App Store 링크로 교체 */}
              <div className="mt-auto pt-4">
                <Image
                  src={`/images/badges/app-store-${locale}.svg`}
                  alt={t("appStore")}
                  width={120}
                  height={40}
                  className="dark:brightness-0 dark:invert"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferencesSection() {
  const t = useTranslations("studycard.differences");

  return (
    <section className="px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          {t("title")}
        </h2>
        <ul className="mt-8 space-y-4 text-left text-lg">
          {differenceKeys.map(({ key, detailKey }) => (
            <li
              key={key}
              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
            >
              <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-400">
                ✓
              </span>
              <span>
                <strong>{t(key)}</strong> — {t(detailKey)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("studycard.cta");

  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
          {t("description")}
        </p>
        <DownloadButton />
      </div>
    </section>
  );
}

export default function StudyCardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AppPreviewSection />
      <FeaturesSection />
      <PlatformSection />
      <DifferencesSection />
      <CtaSection />
    </>
  );
}
