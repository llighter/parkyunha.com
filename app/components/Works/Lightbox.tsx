"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { GridPhoto } from "./PhotoGrid";
import PhotoImage from "./PhotoImage";
import s from "./Lightbox.module.css";

const ICON = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * 라이트박스 — native <dialog>(showModal): 바깥은 inert 라 초점이 안에서만 돈다.
 * 열 때 history 에 한 칸을 쌓는다(주소는 그대로) — 폰의 뒤로 가기 · 쓸어 넘기기가 라이트박스만 닫는다.
 * 닫기 단추 · Esc · 뒤로 가기는 모두 finish() 하나로 모인다. 단추 · Esc 로 닫으면 쌓은 칸을 되돌린다.
 */
export default function Lightbox({
  photos,
  start,
  label,
  onClose,
}: {
  photos: GridPhoto[];
  start: number;
  label: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const onCloseRef = useRef(onClose);
  const closeRef = useRef(() => {});
  const [index, setIndex] = useState(start);
  const total = photos.length;

  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    const track = trackRef.current!;
    if (!dialog.open) dialog.showModal();
    track.scrollLeft = start * track.clientWidth; // 누른 사진으로 바로

    // 개발 모드에서 효과가 두 번 돌아도 한 칸만
    if (!pushed.current) {
      history.pushState({ lightbox: true }, "");
      pushed.current = true;
    }

    // 어느 길로 닫혀도 여기 한 번 — 단추 · Esc 면 쌓은 칸을 되돌린다.
    // dialog 의 close 이벤트에만 기대지 않는다: Chrome 은 Esc 로 한 번 닫은 뒤 close() 에 이벤트를 다시 보내지 않기도 한다
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (dialog.open) dialog.close();
      if (pushed.current && history.state?.lightbox) {
        pushed.current = false;
        history.back();
      }
      onCloseRef.current();
    };
    // 뒤로 가기 → 쌓은 칸은 이미 빠졌다
    const onPopState = () => {
      pushed.current = false;
      finish();
    };
    // Esc
    const onCancel = (event: Event) => {
      event.preventDefault();
      finish();
    };
    closeRef.current = finish;
    window.addEventListener("popstate", onPopState);
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", finish);
    return () => {
      window.removeEventListener("popstate", onPopState);
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", finish);
    };
  }, [start]);

  function go(next: number) {
    const track = trackRef.current;
    if (!track || next < 0 || next >= total) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (next !== index) setIndex(Math.min(total - 1, Math.max(0, next)));
  }

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <dialog
      ref={dialogRef}
      className={s.dialog}
      aria-label={`${label} — 사진 크게 보기`}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className={`${s.button} ${s.close}`}
        aria-label="닫기"
        autoFocus
        onClick={() => closeRef.current()}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" {...ICON} />
        </svg>
      </button>

      <div ref={trackRef} className={s.track} onScroll={onScroll}>
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={s.slide}
            role="group"
            aria-roledescription="사진"
            aria-label={`${i + 1} / ${total}`}
          >
            <PhotoImage
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              // 화면 높이에 걸리는 세로 사진은 그만큼 좁게 — 폭 ÷ 높이 × 100vh 를 넘지 않는다
              sizes={`min(100vw, ${((photo.width / photo.height) * 100).toFixed(2)}vh)`}
              loading={Math.abs(i - start) <= 1 ? "eager" : "lazy"}
              className={s.image}
            />
            {photo.caption && (
              <figcaption className={`text-caption text-fg-muted ${s.caption}`}>
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <button
        type="button"
        className={`${s.button} ${s.paddle} ${s.prev}`}
        aria-label="이전 사진"
        aria-disabled={atStart}
        onClick={() => go(index - 1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 4.5 7.5 12 15 19.5" {...ICON} />
        </svg>
      </button>
      <button
        type="button"
        className={`${s.button} ${s.paddle} ${s.next}`}
        aria-label="다음 사진"
        aria-disabled={atEnd}
        onClick={() => go(index + 1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 4.5 16.5 12 9 19.5" {...ICON} />
        </svg>
      </button>

      <p
        className={`font-mono text-mono text-fg-muted ${s.counter}`}
        aria-live="polite"
      >
        {index + 1} / {total}
      </p>
    </dialog>
  );
}
