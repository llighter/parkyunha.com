import { allBlogs } from "contentlayer/generated";

export default function AboutPage() {
  return (
    <section className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}>
      <div
        className={`mx-auto w-87.5 max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]`}
      >
        <div className={`@container`}>
          <h2
            className={`my-8 text-[24px] font-bold @[576px]:text-[28px] @[653px]:text-[32px]`}
          >
            &nbsp;나의 작업
          </h2>
        </div>
        <div className={`grid gap-8`}>
          <p className={`my-5 text-neutral-800`}>This is my work page.</p>
        </div>
      </div>
    </section>
  );
}
