import { about, bio, name } from "@/lib/info";

export default function Home() {
  return (
    <section className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}>
      <div
        className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
      >
        <div className={`@container`}>
          <h2
            className={`mb-8 text-[24px] font-bold @[692px]:text-[28px] @[980px]:text-[32px]`}
          >
            &nbsp;박 윤하
          </h2>
        </div>
        <p>{about()}</p>
        <p>{bio()}</p>
      </div>
    </section>
  );
}
