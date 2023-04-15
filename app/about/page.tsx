import { allBlogs } from "contentlayer/generated";

export default function AboutPage() {
  return (
    <section className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}>
      <div
        className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
      >
        <div className={`@container`}>
          <h2
            className={`mb-8 text-[24px] font-bold @[692px]:text-[28px] @[980px]:text-[32px]`}
          >
            &nbsp;About Me
          </h2>
        </div>
        <div className={`grid gap-8`}>
          <p className={`my-5 text-neutral-800`}>This is my about page.</p>
        </div>
      </div>
    </section>
  );
}
