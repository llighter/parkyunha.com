import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  // lanes: 자식 블록은 기본으로 본문 레인, 그림 · 갤러리는 스스로 레인을 고른다
  // article: prose 를 토큰(글자 크기 · 색)에 연결 — 다크는 토큰이 바꾼다
  // 스크롤 등장은 그림 · 갤러리만 (Figure · Gallery 가 data-reveal 을 스스로 붙인다) — 글자는 움직이지 않는다
  return (
    <section className="pb-section">
      <div className="lanes article prose max-w-none">{children}</div>
    </section>
  );
}
