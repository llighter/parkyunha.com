"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mt-0 overflow-hidden pb-10 tablet:pb-16 desktop:pb-20">
      <div className="content-container">
        <h2 className="my-8 text-title">문제가 발생했습니다</h2>
        <p className="prose mb-4">페이지를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-fg px-4 py-2 text-sm text-canvas"
        >
          다시 시도
        </button>
      </div>
    </section>
  );
}
