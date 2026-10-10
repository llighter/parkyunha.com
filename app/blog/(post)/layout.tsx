import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  // lanes: 자식 블록은 기본으로 본문 레인, 그림 · 갤러리는 스스로 레인을 고른다
  // article: prose 를 토큰(글자 크기 · 색)에 연결 — 다크는 토큰이 바꾼다
  // data-reveal-children: 화면에 들어오는 블록을 뉴스룸처럼 슥 올린다 (motion.css)
  return (
    <section className="pb-section">
      <div className="lanes article prose max-w-none" data-reveal-children>
        {children}
      </div>
    </section>
  );
}
