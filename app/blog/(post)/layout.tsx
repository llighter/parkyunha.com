import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  // 폴더 이름을 기반으로 MDX 메타데이터 가져오기
  return (
    <div className="">
      <section
        className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}
      >
        <div
          className={`mx-auto max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner prose`}
        >
          {children}
        </div>
      </section>
    </div>
  );
}
