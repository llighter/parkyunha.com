import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyCard - 플래시카드 학습",
  description:
    "간격 반복 알고리즘으로 효율적인 암기를 도와주는 플래시카드 앱. iPhone, iPad, Mac, Apple Watch 지원.",
  openGraph: {
    title: "StudyCard - 플래시카드 학습",
    description:
      "간격 반복 알고리즘으로 효율적인 암기를 도와주는 플래시카드 앱.",
    type: "website",
  },
};

const features = [
  {
    icon: "🃏",
    title: "3가지 카드 타입",
    description:
      "텍스트, 빈칸 채우기, 캔버스 카드로 다양한 방식의 학습을 지원합니다.",
  },
  {
    icon: "🔄",
    title: "간격 반복 학습",
    description:
      "SM-2 알고리즘 기반 레벨 시스템으로 과학적으로 최적화된 복습 주기를 제공합니다.",
  },
  {
    icon: "📊",
    title: "학습 통계",
    description:
      "연속 학습일, 정확도, 추세 분석을 한눈에 확인할 수 있는 대시보드를 제공합니다.",
  },
  {
    icon: "✏️",
    title: "Apple Pencil 지원",
    description:
      "iPad에서 Apple Pencil로 손글씨와 그림 카드를 만들 수 있습니다.",
  },
  {
    icon: "🔔",
    title: "위젯 & 알림",
    description:
      "홈 화면과 잠금 화면 위젯으로 학습 현황을 바로 확인하고, 리마인더로 꾸준한 학습을 유지하세요.",
  },
  {
    icon: "☁️",
    title: "iCloud 동기화",
    description:
      "모든 Apple 기기에서 자동으로 동기화됩니다. 별도 계정 없이 iCloud만으로 충분합니다.",
  },
];

const platforms = [
  { name: "iPhone", description: "한 손으로 빠르게 학습" },
  { name: "iPad", description: "Apple Pencil로 캔버스 카드 제작" },
  { name: "Mac", description: "넓은 화면에서 카드 관리" },
  { name: "Apple Watch", description: "손목 위에서 간편하게 복습" },
];

function HeroSection() {
  return (
    <section className="px-6 pb-16 pt-20 text-center tablet:pb-24 tablet:pt-28">
      <div className="mx-auto max-w-2xl">
        {/* 앱 아이콘 플레이스홀더 */}
        <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-400 to-blue-600 text-6xl shadow-lg">
          📚
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 tablet:text-6xl">
          StudyCard
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 tablet:text-2xl">
          매일 10분, 꾸준한 반복이 실력이 됩니다.
          <br />
          과학적 간격 반복으로 효율적인 암기를 도와주는
          <br />
          플래시카드 앱.
        </p>
        {/* 앱스토어 링크 플레이스홀더 */}
        <div className="inline-flex h-14 items-center rounded-xl bg-neutral-900 px-8 text-base font-medium text-white dark:bg-white dark:text-neutral-900">
          App Store에서 다운로드 (준비 중)
        </div>
      </div>
    </section>
  );
}

function AppPreviewSection() {
  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          간단하지만 강력하게
        </h2>
        <p className="mb-12 text-lg text-neutral-600 dark:text-neutral-400">
          복잡한 설정 없이 바로 시작하세요. 카드를 만들고, 학습하고, 성장을
          확인하세요.
        </p>
        {/* 앱 스크린샷 플레이스홀더 */}
        <div className="mx-auto flex aspect-video max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-neutral-400 dark:text-neutral-500">
            앱 스크린샷이 들어갈 자리
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          주요 기능
        </h2>
        <p className="mb-12 text-center text-lg text-neutral-600 dark:text-neutral-400">
          Apple 기기에서 가장 자연스러운 플래시카드 경험
        </p>
        <div className="grid gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-200 p-6 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          어디서든 학습하세요
        </h2>
        <p className="mb-12 text-center text-lg text-neutral-600 dark:text-neutral-400">
          iPhone, iPad, Mac, Apple Watch. 모든 Apple 기기에서 자연스럽게.
        </p>
        <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="text-center">
              {/* 기기 이미지 플레이스홀더 */}
              <div className="mx-auto mb-4 flex h-40 w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                <p className="text-sm text-neutral-400 dark:text-neutral-500">
                  {platform.name}
                </p>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {platform.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {platform.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferencesSection() {
  return (
    <section className="px-6 py-16 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          왜 StudyCard인가요?
        </h2>
        <ul className="mt-8 space-y-4 text-left text-lg">
          <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
            <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-400">
              ✓
            </span>
            <span>
              <strong>구독 없음</strong> — 한 번 다운로드, 영원히 사용
            </span>
          </li>
          <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
            <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-400">
              ✓
            </span>
            <span>
              <strong>광고 없음</strong> — 학습에만 집중
            </span>
          </li>
          <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
            <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-400">
              ✓
            </span>
            <span>
              <strong>개인정보 수집 없음</strong> — 모든 데이터는 기기와
              iCloud에만 저장
            </span>
          </li>
          <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
            <span className="mt-0.5 shrink-0 text-green-600 dark:text-green-400">
              ✓
            </span>
            <span>
              <strong>100% Apple 네이티브</strong> — 서드파티 의존성 없는 순수
              SwiftUI 앱
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-neutral-100 px-6 py-16 dark:bg-neutral-900 tablet:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
          지금 시작하세요
        </h2>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
          첫 번째 카드가 당신의 학습을 바꿉니다.
        </p>
        {/* 앱스토어 링크 플레이스홀더 */}
        <div className="inline-flex h-14 items-center rounded-xl bg-neutral-900 px-8 text-base font-medium text-white dark:bg-white dark:text-neutral-900">
          App Store에서 다운로드 (준비 중)
        </div>
      </div>
    </section>
  );
}

export default function StudyCardPage() {
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
