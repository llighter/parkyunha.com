import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  // 폴더 이름을 기반으로 MDX 메타데이터 가져오기
  return (
    <div className="">
      <section
        className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}
      >
        <div className="prose dark:prose-invert mx-auto max-w-full">{children}</div>
      </section>
    </div>
  );
}
