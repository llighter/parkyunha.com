import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침 - StudyCard",
  description: "StudyCard 앱의 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 tablet:py-24">
      <h1 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100 tablet:text-4xl">
        개인정보 처리방침
      </h1>
      <p className="mb-12 text-sm text-neutral-500 dark:text-neutral-400">
        최종 업데이트: 2026-02-14
      </p>

      <div className="space-y-10 text-neutral-700 dark:text-neutral-300 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:dark:text-neutral-100 [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
        <section>
          <h2>수집하는 정보</h2>
          <p>본 앱은 사용자가 직접 입력한 학습 카드 데이터만 저장합니다.</p>
          <ul className="mt-3 space-y-1">
            <li>덱 및 카드 내용</li>
            <li>학습 통계 (정답률, 학습 시간)</li>
            <li>앱 설정 (하루 목표, 알림 시간)</li>
          </ul>
        </section>

        <section>
          <h2>데이터 저장</h2>
          <ul className="space-y-1">
            <li>모든 데이터는 사용자의 기기와 iCloud에만 저장됩니다.</li>
            <li>별도의 서버로 데이터를 전송하지 않습니다.</li>
            <li>iCloud 동기화는 Apple의 CloudKit을 사용합니다.</li>
          </ul>
        </section>

        <section>
          <h2>제3자 공유</h2>
          <p>수집된 정보를 제3자와 공유하지 않습니다.</p>
        </section>

        <section>
          <h2>사용자 추적</h2>
          <p>
            본 앱은 사용자를 추적하지 않습니다. 광고 네트워크나 분석 서비스를
            사용하지 않습니다.
          </p>
        </section>

        <section>
          <h2>데이터 삭제</h2>
          <p>
            설정 &gt; 전체 데이터 삭제 기능으로 모든 데이터를 삭제할 수
            있습니다.
          </p>
        </section>

        <section>
          <h2>문의</h2>
          <p>
            앱 관련 문의사항은{" "}
            <a
              href="https://github.com/llighter/StudyCard11"
              className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 저장소
            </a>
            를 통해 연락해주세요.
          </p>
        </section>
      </div>
    </article>
  );
}
