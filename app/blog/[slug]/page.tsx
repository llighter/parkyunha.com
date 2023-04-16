import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";

export default function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {/*<script type={`application/ld+json`}>*/}
      {/*  {JSON.stringify(post.structuredData)}*/}
      {/*</script>*/}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      />
      <section
        className={`mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20`}
      >
        <div
          className={`mx-auto mt-8 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
        >
          <h1 className={`max-w-[650px] font-serif text-3xl font-bold`}>
            {post.title}
          </h1>
          <div className={`mb-8 mt-4 font-mono text-sm`}>
            {post.publishedAt}
            <div className={`mx-2 h-[0.2em] bg-neutral-100`} />
          </div>
          <Mdx code={post.body.code} />
        </div>
      </section>
    </section>
  );
}
