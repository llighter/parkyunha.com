"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import s from "./Carousel.module.css";

type Props = {
  /** 묶음 이름 — 화면 읽기 프로그램이 읽는다 ('시리즈 개발 도구 팁', '사진') */
  label: string;
  /** 한 장의 이름 — '이전 글', '사진 3 / 6' 처럼 쓴다 */
  itemName: string;
  /** card: 블로그 타일(폰 1 · 태블릿 2 · 데스크톱 3장) / photo: 사진(폰 62.5% · 3 · 4장, 한 장이 3:4 틀 — 자식은 fill 그림) */
  variant?: "card" | "photo";
  /** surface 띠 위에 놓일 때 — 단추 바탕을 한 단계 진하게 */
  surface?: boolean;
  /** 자식 하나가 한 장 */
  children: ReactNode;
};

/**
 * 가로 캐러셀 — 가로 스크롤 + scroll-snap. 다음 카드가 살짝 보이고, 아래에 점과 이전 · 다음 단추.
 * 접근성은 갤러리와 같다(이름표, 지금 장 표시, 바뀔 때 읽어 줌). 끝에서 처음으로 이어지지 않는다.
 * 모양은 Carousel.module.css
 */
export default function Carousel({
  label,
  itemName,
  variant = "card",
  surface = false,
  children,
}: Props) {
  const items = Children.toArray(children);
  const count = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const uid = useId();
  const trackId = `${uid}-track`;
  const slideId = (i: number) => `${uid}-slide-${i}`;

  /** 한 장만큼의 거리 = 카드 폭 + 사이 */
  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!track || !first) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  /**
   * 스크롤 위치 → 지금 장 · 양 끝. 끝에 닿으면 마지막 장(여러 장이 함께 보여 반올림으로는 닿지 않는다).
   * 다 보여서 처음이자 끝이면 첫 장
   */
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.scrollLeft <= 2;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    setAtStart(start);
    setAtEnd(end);
    setIndex(
      start
        ? 0
        : end
          ? count - 1
          : Math.min(count - 1, Math.round(track.scrollLeft / step())),
    );
  }, [count, step]);

  // 폭이 바뀌면 다시 잰다 — ResizeObserver 는 처음 붙일 때도 한 번 부른다
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const go = (i: number) => {
    trackRef.current?.scrollTo({ left: i * step(), behavior: behavior() });
  };

  const move = (direction: -1 | 1) => {
    if ((direction < 0 && atStart) || (direction > 0 && atEnd)) return;
    trackRef.current?.scrollBy({
      left: direction * step(),
      behavior: behavior(),
    });
  };

  // 점 목록: ← → · Home · End 로 장을 옮기고 초점도 따라간다 (끝에서 멈춘다).
  // 다 보여서 넘길 곳이 없으면 그대로 — 고를 수 없는 점으로 초점이 가지 않게
  const onDotsKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (atStart && atEnd) return;
    const focused = dotRefs.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const from = focused === -1 ? index : focused;
    const target = {
      ArrowLeft: from - 1,
      ArrowRight: from + 1,
      Home: 0,
      End: count - 1,
    }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(count - 1, target));
    go(next);
    dotRefs.current[next]?.focus();
  };

  return (
    <section
      className={s.carousel}
      data-variant={variant}
      data-count={count}
      data-surface={surface || undefined}
      aria-roledescription="캐러셀"
      aria-label={label}
    >
      <div
        ref={trackRef}
        id={trackId}
        className={s.track}
        onScroll={sync}
        // 사진처럼 안에 초점 갈 곳이 없으면 트랙 자체에 초점 — ← → 로 넘긴다
        tabIndex={variant === "photo" ? 0 : undefined}
        role={variant === "photo" ? "group" : undefined}
        aria-label={variant === "photo" ? label : undefined}
        data-reveal
      >
        {items.map((item, i) => (
          <div
            key={i}
            id={slideId(i)}
            className={s.item}
            role="tabpanel"
            aria-roledescription="슬라이드"
            aria-label={`${itemName} ${i + 1} / ${count}`}
          >
            {item}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className={`lane-text tablet:lane-media ${s.controls}`}>
          <div
            className={s.dots}
            role="tablist"
            aria-label={`${itemName} 고르기`}
            onKeyDown={onDotsKeyDown}
          >
            {items.map((_, i) => (
              <button
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                type="button"
                className={s.dot}
                role="tab"
                aria-selected={i === index}
                aria-controls={slideId(i)}
                aria-label={`${itemName} ${i + 1} / ${count}`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className={s.paddles}>
            <button
              type="button"
              className={s.paddle}
              aria-label={`이전 ${itemName}`}
              aria-controls={trackId}
              aria-disabled={atStart}
              onClick={() => move(-1)}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className={s.paddle}
              aria-label={`다음 ${itemName}`}
              aria-controls={trackId}
              aria-disabled={atEnd}
              onClick={() => move(1)}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`${itemName} ${index + 1} / ${count}`}
      </p>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={
          direction === "left"
            ? "M14.5 5.5 8 12l6.5 6.5"
            : "M9.5 5.5 16 12l-6.5 6.5"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
