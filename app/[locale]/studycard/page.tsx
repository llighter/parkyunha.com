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

// 스크린샷 원본: studycard-wiki docs/public/screens (라이트/다크 쌍)
const previewScreens = [
  { key: "sidebar", file: "sidebar-iphone", width: 1206, height: 2622 },
  {
    key: "deckContent",
    file: "deck-content-iphone",
    width: 1206,
    height: 2622,
  },
  { key: "cardDetail", file: "card-detail-iphone", width: 1206, height: 2622 },
  { key: "statistics", file: "statistics-iphone", width: 1206, height: 2622 },
  { key: "canvasEdit", file: "canvas-edit-ipad", width: 2064, height: 2752 },
] as const;

function DownloadButton() {
  const t = useTranslations("studycard.hero");

  return (
    <div className="inline-flex h-14 items-center rounded-xl bg-fg px-8 text-base font-medium text-canvas">
      {t("download")}
    </div>
  );
}

function HeroSection() {
  const t = useTranslations("studycard.hero");

  return (
    <section className="px-6 pt-20 pb-16 text-center tablet:pt-28 tablet:pb-24">
      <div className="mx-auto max-w-2xl">
        <Image
          src="/images/studycard-logo.png"
          alt="StudyCard logo"
          width={192}
          height={192}
          priority
          className="mx-auto mb-8 h-48 w-48"
        />
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-fg tablet:text-6xl">
          StudyCard
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-fg-muted tablet:text-2xl">
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
    <section className="bg-surface px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-fg tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-lg text-fg-muted">{t("description")}</p>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {previewScreens.map(({ key, file, width, height }) => (
            <figure
              key={key}
              className="shrink-0 snap-center first:ml-auto last:mr-auto"
            >
              <Image
                src={`/images/studycard/screens/${file}.png`}
                alt={t(`screens.${key}`)}
                width={width}
                height={height}
                sizes="400px"
                className="h-96 w-auto rounded-2xl border border-line bg-card shadow-sm dark:hidden"
              />
              <Image
                src={`/images/studycard/screens/${file}-dark.png`}
                alt={t(`screens.${key}`)}
                width={width}
                height={height}
                sizes="400px"
                className="hidden h-96 w-auto rounded-2xl border border-line bg-canvas shadow-sm dark:block"
              />
              <figcaption className="mt-3 text-sm text-fg-muted">
                {t(`screens.${key}`)}
              </figcaption>
            </figure>
          ))}
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
        <h2 className="mb-4 text-center text-3xl font-bold text-fg tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-center text-lg text-fg-muted">
          {t("subtitle")}
        </p>
        <div className="grid gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
          {featureKeys.map(({ key, icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-line p-6 transition-colors hover:bg-surface"
            >
              <div className="mb-3 text-3xl">{icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-fg">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-fg-muted">
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
    <section className="bg-surface px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-fg tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-12 text-center text-lg text-fg-muted">
          {t("subtitle")}
        </p>
        <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
          {platforms.map(({ key, displayName, requirement, icon }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-2xl bg-card p-6"
            >
              <div className="mb-4 text-5xl">{icon}</div>
              <h3 className="text-lg font-semibold text-fg">{displayName}</h3>
              <p className="mt-1 text-sm text-fg-muted">{t(key)}</p>
              <p className="mt-1 text-xs text-fg-subtle">{requirement}</p>
              {/* 출시 후 App Store 링크로 교체 */}
              <div className="mt-auto pt-4">
                <Image
                  src={`/images/badges/app-store-${locale}.svg`}
                  alt={t("appStore")}
                  width={120}
                  height={40}
                  // 검정 배지 그림을 다크에서 흰색으로 — 색 토큰이 아니라 그림 반전이라 dark: 가 남는다
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
        <h2 className="mb-4 text-3xl font-bold text-fg tablet:text-4xl">
          {t("title")}
        </h2>
        <ul className="mt-8 space-y-4 text-left text-lg">
          {differenceKeys.map(({ key, detailKey }) => (
            <li key={key} className="flex items-start gap-3 text-fg">
              <span className="mt-0.5 shrink-0 text-positive">✓</span>
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
    <section className="bg-surface px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-fg tablet:text-4xl">
          {t("title")}
        </h2>
        <p className="mb-8 text-lg text-fg-muted">{t("description")}</p>
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
