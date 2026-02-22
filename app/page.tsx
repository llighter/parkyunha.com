import Image from "next/image";
import Link from "next/link";

interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function Badge(props: BadgeProps) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded-sm border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline"
      // TODO: 다크모드 지원(dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100)
    />
  );
}

export default function Home() {
  return (
    <section className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}>
      <div
        className="content-container"
      >
        <div className={`@container`}>
          <h2
            className={`my-8 text-[24px] font-bold @[576px]:text-[28px] @[653px]:text-[32px]`}
          >
            &nbsp;안녕하세요, <b>박윤하</b>입니다.
          </h2>
        </div>
        <div className="prose prose-neutral">
          <p>
            {`안녕하세요. `}
            <span className="not-prose">
              <Badge href="https://www.parkyunha.com">parkyunha.com</Badge>
            </span>
            {` 블로그를 운영하고 있는 `}
            <b>박윤하</b>
            {`입니다. 금융권에서 비대면 업무인 모바일 앱과 홈페이지 등
          채널계를 개발하는 `}
            <Link href="/work">업무</Link>
            {`를 합니다.`}
          </p>
        </div>
        <div className="my-8 columns-2 gap-4 laptop:columns-3">
          <div className="relative mb-4 h-40">
            <Image
              alt="Me and my younger brother at the Han River in Seoul, South Korea"
              src="/images/home/han-river.jpeg"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative mb-4 h-80 laptop:mb-0">
            <Image
              alt="Me at Osaka Castle in Osaka, Japan"
              src="/images/home/osaka-castle.jpeg"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover laptop:object-center"
            />
          </div>
          <div className="relative h-40 laptop:mb-4 laptop:h-80">
            <Image
              alt="high five with the Glico sign"
              src="/images/home/hi-five.jpeg"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              className="rounded-lg object-cover object-top laptop:object-center"
            />
          </div>
          <div className="relative mb-4 h-40 laptop:mb-0">
            <Image
              alt="A picture I drew characterizing Eclipse and Java"
              src="/images/home/eclipse.jpeg"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative mb-4 h-40">
            <Image
              alt="Seoul seen from above an airplane"
              src="/images/home/seoul.jpeg"
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative h-80">
            <Image
              alt="City view from Hotel Monterey Grasmere Osaka"
              src="/images/home/me-at-home.jpg"
              fill
              sizes="(min-width: 768px) 213px, 33vw"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="prose prose-neutral">
          <p>
            {`최근에는 Next.js를 사용해서 블로그를 만들고 있고 자바를 주로
          개발합니다. 저는 스스로 만들어낸 결과를 다듬어서 여러 사람과 공유하는
          것을 좋아합니다. 글이나 영상 혹은 나만의 프로덕트를 꾸준히 만들어
          가는것이 목표입니다.`}
          </p>
        </div>
      </div>
    </section>
  );
}
