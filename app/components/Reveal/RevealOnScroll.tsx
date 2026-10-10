"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TARGETS = "[data-reveal], [data-reveal-children] > *";
/** 한 번에 들어온 카드가 많아도 마지막 카드가 너무 늦지 않게 — 최대 5칸까지만 늦춘다 */
const MAX_STEPS = 5;

/**
 * 스크롤 등장 — 페이지에 하나만 둔다 (app/layout.tsx). 모양은 app/styles/motion.css.
 *
 * - 화면 아래에 있는 대상만 숨겼다가(pending), 화면에 들어오면 올린다(shown). 한 번만.
 * - 다 올라오면 done — motion.css 규칙이 빠져 요소 본래의 스타일(호버 이동 · 투명도 유틸리티 등)로 돌아간다.
 * - 첫 화면 · 이미 지나온 위쪽 블록은 그대로 둔다. 한 번에 건너뛴 블록은 움직임 없이 바로 보인다.
 * - 같은 순간 함께 들어온 카드(data-reveal-stagger)는 --reveal-stagger 만큼씩 늦게 — 들어오는 묶음(보통 한 줄)마다 차례로 뜬다.
 * - 움직임 줄이기 설정이면 아무것도 하지 않는다.
 * - 페이지를 옮길 때마다(pathname) 새 대상을 다시 찾는다.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = getComputedStyle(document.documentElement);
    const stagger = toMs(root.getPropertyValue("--reveal-stagger"));
    const duration = toMs(root.getPropertyValue("--reveal-duration"));

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        if (entering.length === 0) return;

        // 건너뛴 블록(앵커 · End 키로 한 번에 지나친 위쪽)은 움직임 없이 바로 보이게
        // — 다시 올라갈 때 위에서 내려오는 블록이 아래에서 솟는 어색함이 없다
        document
          .querySelectorAll<HTMLElement>('[data-reveal-state="pending"]')
          .forEach((el) => {
            if (el.getBoundingClientRect().bottom > 0) return;
            el.dataset.revealState = "done";
            observer.unobserve(el);
          });
        // 같은 부모 안에서 이번에 함께 들어온 순서 — 다음에 들어오는 줄은 다시 0 부터
        const order = new Map<Element, number>();
        const batch: HTMLElement[] = [];
        let longest = 0;
        for (const entry of entering) {
          const el = entry.target as HTMLElement;
          const parent = el.parentElement;
          if (parent?.hasAttribute("data-reveal-stagger")) {
            const i = order.get(parent) ?? 0;
            order.set(parent, i + 1);
            const delay = Math.min(i, MAX_STEPS) * stagger;
            longest = Math.max(longest, delay);
            el.style.setProperty("--reveal-delay", `${delay}ms`);
          }
          el.dataset.revealState = "shown";
          observer.unobserve(el);
          batch.push(el);
        }
        // 다 올라온 뒤 손을 뗀다 (transitionend 는 전환이 없으면 오지 않으므로 시간으로)
        window.setTimeout(
          () => {
            for (const el of batch) {
              if (el.dataset.revealState !== "shown") continue;
              el.dataset.revealState = "done";
              el.style.removeProperty("--reveal-delay");
            }
          },
          duration + longest + 50,
        );
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const fold = window.innerHeight * 0.92;
    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      // 목록 안의 목록: 목록 자신은 그대로 두고 항목이 뜬다 (두 번 겹쳐 움직이지 않게)
      if (el.hasAttribute("data-reveal-children")) return;
      const state = el.dataset.revealState;
      if (state === "shown" || state === "done") return;
      if (!state) {
        if (el.getBoundingClientRect().top < fold) return; // 첫 화면 — 그대로
        el.dataset.revealState = "pending";
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** CSS 시간 → ms. 빌드가 900ms 를 .9s 로 줄여 쓰기도 하므로 단위를 본다 */
function toMs(value: string) {
  const n = parseFloat(value);
  if (!Number.isFinite(n)) return 0;
  return /ms\s*$/.test(value) ? n : n * 1000;
}
