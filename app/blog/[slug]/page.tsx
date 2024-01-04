import { getBlogPosts } from 'app/db/blog';
import { notFound } from "next/navigation";
// TODO: components 위치 옮기기
import { CustomMDX } from 'components/mdx';
import Link from "next/link";
import MailButton from "@/components/mailButton";
import CopyLinkButton from "@/components/copyLinkButton";
import Image from "next/image";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  // TODO: ogImage 를 사용하는 방식으로 변경 필요
  let ogImage = image
    ? `https://www.parkyunha.com${image}`
    : `https://www.parkyunha.com/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://www.parkyunha.com/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  // TODO: relatedArticles 사용하는 방식으로 변경 필요
  // const articles = post.articles ? post.articles.map((item) => item.title) : [];
  // const relatedArticles = allBlogs.filter((item) =>
  //   articles.includes(item._id)
  // );

  if (!post) {
    notFound();
  }

  return (
    <section className='mt-0 overflow-hidden'>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://www.parkyunha.com${post.metadata.image}`
              : `https://www.parkyunha.com/og?title=${post.metadata.title}`,
            url: `https://www.parkyunha.com/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Park Yunha',
            },
          }),
        }}
      />
        <article id="article" className={`pt-10`}>
          <div id="article-header">
            <div
              id="category"
              className={`mx-auto mb-[20px] max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <div
                id="category-eyebrow"
                className={`mx-auto w-87.5 text-xs font-bold text-gray-500 tablet:w-[576px] laptop:w-[653px]`}
              >
                {post.metadata.category}
              </div>
              <div
                id="date-eyebrow"
                className={`mx-auto mt-[4px] w-87.5 text-sm font-semibold text-gray-500 tablet:w-[576px] laptop:w-[653px]`}
              >
                {formatDate(post.metadata.publishedAt)}
              </div>
            </div>
            <div
              id="page-title"
              className={`mx-auto max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <h1
                  className={`table:text-[42px] break-keep text-[32px] font-extrabold leading-[1.21875] tablet:leading-[1.2] laptop:text-[48px] laptop:leading-[1.1875]`}
                >
                  {post.metadata.title}
                </h1>
              </div>
            </div>
            <div
              id="page-summary"
              className={`mx-auto mt-4 max-w-[414px] leading-[1.2858] tablet:max-w-screen-tablet_inner tablet:leading-[1.29167] laptop:mt-5 laptop:max-w-screen-laptop_inner laptop:leading-[1.19048]`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <div
                  className={`break-keep text-[21px] font-bold laptop:text-[24px]`}
                >
                  {post.metadata.summary}
                </div>
              </div>
            </div>
            <div
              id="sharesheet"
              className={`mx-auto mt-[20px] max-w-[414px] tablet:max-w-screen-tablet_inner laptop:mt-6 laptop:max-w-screen-laptop_inner`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <ul className={`flex justify-start space-x-4 align-middle`}>
                  <li className={`mt-3`}>
                    <MailButton post={post} />
                  </li>
                  <li className={`mt-3`}>
                    <CopyLinkButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <figure className={`my-8 tablet:my-9 laptop:my-11`}>
            <div
              className={`relative mx-auto aspect-[1.5] max-w-[414px] tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <Image
                src={post.metadata.image}
                alt={post.metadata.imageDescription}
                fill={true}
                priority={true}
                className={`rounded-none object-cover phone:rounded-xl`}
              />
            </div>
            <div
              className={`mx-auto mt-[12px] max-w-[414px] leading-[1.2858] tablet:max-w-screen-tablet_inner tablet:leading-[1.29167] laptop:mt-4 laptop:max-w-screen-laptop_inner laptop:leading-[1.19048]`}
            >
              <div
                className={`mx-auto w-87.5 tablet:w-[576px] laptop:w-[653px]`}
              >
                <div className={`break-keep text-xs font-bold text-gray-500`}>
                  {post.metadata.imageDescription}
                </div>
              </div>
            </div>
          </figure>

          <div
            className={`mx-auto mb-11 mt-8 w-87.5 max-w-[362px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
          >
            <article className="prose prose-quoteless prose-neutral mx-auto">
              <CustomMDX source={post.content} />
            </article>
          </div>

          {/* TODO: 조건을 처리하는 더 좋은 방법이 있는지 확인 필요 */}
          {/* TODO: relatedArticles 사용하는 방식으로 변경 필요 */}
          {/* {relatedArticles.length > 0 && (
            <div
              className={`mx-auto mb-11 mt-8 w-87.5 max-w-[362px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
            >
              <div
                className={`mx-auto w-full tablet:w-[576px] laptop:w-[653px]`}
              >
                <h2
                  className={`mb-4 mt-11 text-[21px] font-bold laptop:text-[24px]`}
                >
                  관련 글
                </h2>
                {relatedArticles.map((article, i) => (
                  <Result article={article} key={i} />
                ))}
              </div>
            </div>
          )} */}
        </article>
        <aside className={`mt-20 flex justify-center bg-gray-50`}>
          <Link href={`/blog`}>
            <div
              className={`mx-auto my-[44px] flex w-87.5 flex-col items-center tablet:my-[48px] tablet:w-[576px] laptop:my-[52px] laptop:w-[653px]`}
            >
              <figure
                className={`h-[30px] w-[150px] bg-[url('/images/logo.svg')] bg-cover`}
              >
                <figcaption className={`hidden`}>logo</figcaption>
              </figure>
              <p
                className={`mt-3 text-[17px] font-extrabold text-gray-500 laptop:text-[19px]`}
              >
                최신 글 및 업데이트
              </p>
              <p
                className={`mt-[14px] rounded-3xl bg-gray-200 px-4 py-2 text-center text-[14px] font-bold laptop:mt-[18px]`}
              >
                더보기
              </p>
            </div>
          </Link>
        </aside>
    </section>
  );
}

function Result({ article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`flex justify-start border-t border-t-gray-300 py-6 last:pb-0 laptop:py-8`}
    >
      {/*나중에 사진 크기별 이미지를 생성해서 로드하려면 picture 를 사용하는 것을 고려*/}
      <div className={`shrink-0 pr-4 tablet:pr-6`}>
        <img
          src={article.image}
          className={`aspect-square w-[93px] rounded-xl object-cover tablet:aspect-1.77 tablet:w-[171px]`}
        />
      </div>
      <div className={`flex flex-col`}>
        <p className={`mb-1 text-[12px] font-bold text-gray-600`}>
          {article.category}
        </p>
        <h3
          className={`break-keep text-[17px] font-bold leading-[23px] tracking-normal laptop:text-[19px] laptop:leading-[25px] laptop:tracking-[.012em]`}
        >
          {article.title}
        </h3>
        <p className={`mt-2 text-[14px] font-bold text-gray-500`}>
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
