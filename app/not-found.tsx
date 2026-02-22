import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mt-0 overflow-hidden pb-10 tablet:pb-16 laptop:pb-20">
      <div className="content-container">
        <h2 className="my-8 text-[24px] font-bold">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="prose prose-neutral">
          요청하신 페이지가 존재하지 않습니다.{" "}
          <Link href="/">홈으로 돌아가기</Link>
        </p>
      </div>
    </section>
  );
}
