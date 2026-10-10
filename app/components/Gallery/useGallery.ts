"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

export type GalleryMode = "slide" | "fade";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** 미디어 쿼리 구독. 서버 렌더와 첫 하이드레이션은 serverValue 로 그린다 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** 요소가 화면에 threshold 이상 들어와 있는가 — 첫 렌더는 false (서버와 같다) */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.25,
): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

interface Options {
  count: number;
  loop: boolean;
  mode: GalleryMode;
  /** 사용자가 장을 바꿨을 때만 불린다 (첫 렌더에는 안 불림) */
  onChange?: (index: number) => void;
}

/**
 * 갤러리 상태 — "지금 몇 번째 장인가"만 책임진다.
 *
 * - index 가 유일한 진실. 화살표 · 점 · 키보드는 go(i) 로 index 를 바꾼다.
 * - slide 모드(가로 스크롤 + 스냅)에서는 스크롤 위치가 index 를 따라가고,
 *   손가락 · 트랙패드로 넘기면 거꾸로 스크롤이 index 를 바꾼다.
 * - fade 모드에서는 스크롤할 것이 없으므로 index 만 바뀌고 CSS 가 겹쳐 보여 준다.
 *   → 이 훅은 어떤 모드로 그려지는지 몰라도 된다 (보여 주는 방식은 CSS 몫).
 */
export function useGallery({ count, loop, mode, onChange }: Options) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  /** 버튼으로 여러 장을 건너뛰는 중의 목적지 — 도착 전 중간 장은 무시한다 */
  const targetRef = useRef<number | null>(null);
  const releaseTimer = useRef(0);
  const frame = useRef(0);
  const onChangeRef = useRef(onChange);
  useIsomorphicLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  const commit = useCallback((i: number) => {
    if (i === indexRef.current) return;
    indexRef.current = i;
    setIndex(i);
    onChangeRef.current?.(i);
  }, []);

  const go = useCallback(
    (next: number) => {
      if (count < 1) return;
      const i = loop
        ? ((next % count) + count) % count
        : Math.max(0, Math.min(count - 1, next));
      commit(i);

      const viewport = viewportRef.current;
      if (viewport && isScrollable(viewport)) {
        targetRef.current = i;
        window.clearTimeout(releaseTimer.current);
        releaseTimer.current = window.setTimeout(() => {
          targetRef.current = null;
        }, 1200);
        // 부드럽게 움직일지는 CSS scroll-behavior 가 정한다 (움직임 줄이기 설정 존중)
        viewport.scrollTo({ left: i * viewport.clientWidth });
      }
    },
    [count, loop, commit],
  );

  /** 손가락 · 트랙패드로 넘길 때: 스크롤 위치 → index */
  const onScroll = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const viewport = viewportRef.current;
      // fade 로 바뀌는 순간 브라우저가 scrollLeft 를 0 으로 되돌리며 scroll 을 한 번 쏜다 — 무시
      if (!viewport || !isScrollable(viewport)) return;
      const i = Math.round(viewport.scrollLeft / viewport.clientWidth);
      if (targetRef.current !== null) {
        if (i === targetRef.current) targetRef.current = null;
        return;
      }
      commit(Math.max(0, Math.min(count - 1, i)));
    });
  }, [count, commit]);

  /** 사용자가 직접 스크롤을 잡으면 버튼 이동 중 표시를 푼다 */
  const release = useCallback(() => {
    targetRef.current = null;
  }, []);

  // 모드가 바뀌면(창 크기 · 입력 장치) 스크롤 위치를 지금 장에 맞춘다
  useIsomorphicLayoutEffect(() => {
    alignInstantly(viewportRef.current, indexRef.current);
  }, [mode]);

  // 크기가 바뀌어도 지금 장을 지킨다
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      if (targetRef.current === null)
        alignInstantly(viewport, indexRef.current);
    });
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      window.clearTimeout(releaseTimer.current);
    };
  }, []);

  return { viewportRef, index, go, onScroll, release };
}

function isScrollable(el: HTMLElement) {
  return el.scrollWidth > el.clientWidth + 1;
}

function alignInstantly(el: HTMLElement | null, index: number) {
  if (!el || !isScrollable(el)) return;
  const left = index * el.clientWidth;
  if (Math.abs(el.scrollLeft - left) > 1) {
    el.scrollTo({ left, behavior: "instant" });
  }
}

/** 방향키 → 목적지. 해당 없는 키는 null */
export function keyToIndex(key: string, from: number, count: number) {
  switch (key) {
    case "ArrowLeft":
      return from - 1;
    case "ArrowRight":
      return from + 1;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
