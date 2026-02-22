"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20">
      <div className="content-container">
        <h2 className="my-8 text-[24px] font-bold">문제가 발생했습니다</h2>
        <p className="prose prose-neutral dark:prose-invert mb-4">
          페이지를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          다시 시도
        </button>
      </div>
    </section>
  );
}
