"use client";

import Image, { type StaticImageData } from "next/image";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { BREAKPOINT, aspectOf, laneSizes, type Aspect } from "@/lib/layout";
import GalleryVideo, { type VideoSource } from "./GalleryVideo";
import { SlideContext } from "./slide";
import {
  keyToIndex,
  useGallery,
  useInView,
  useMediaQuery,
  type GalleryMode,
} from "./useGallery";
import s from "./Gallery.module.css";

type Fit = "contain" | "cover";

interface SlideBase {
  /** 화면 읽기용 설명 — 이미지 alt, 영상 · 사용자 슬라이드의 이름 */
  alt: string;
  caption?: ReactNode;
  /** 이 장만 다르게 맞출 때 (기본은 갤러리의 fit) */
  fit?: Fit;
  /** 내려받을 원본 주소. 이미지 · 영상은 기본 src, false 면 버튼을 숨긴다 */
  download?: string | false;
  /** 내려받을 때 파일 이름 */
  downloadName?: string;
}

export interface ImageSlide extends SlideBase {
  type?: "image";
  src: string | StaticImageData;
}

export interface VideoSlide extends SlideBase {
  type: "video";
  /** mp4 — 같은 도메인(/public)에 둔다 */
  src: string;
  /** 앞에 둘 다른 형식 (예: webm). 브라우저가 앞에서부터 고른다 */
  sources?: VideoSource[];
  poster?: string | StaticImageData;
  /** 기본 true — 보이면 소리 없이 재생. false 면 재생 버튼을 눌러야 시작 */
  autoPlay?: boolean;
  /** 기본 true */
  loop?: boolean;
}

export interface CustomSlide extends SlideBase {
  type: "custom";
  /**
   * 장 안에 그릴 것 (카드 목록 애니메이션 같은 것).
   * 지금 보이는지는 장 요소의 [data-playing] 속성(CSS)이나 useSlide() 훅(JS)으로 읽는다.
   */
  content: ReactNode;
}

export type GalleryItem = ImageSlide | VideoSlide | CustomSlide;

export interface GalleryProps {
  items: GalleryItem[];
  /** 화면 읽기 프로그램이 읽는 이름 */
  label?: string;
  /** 액자 비율 — "16:9"(기본, 뉴스룸) · "21:9" · "3:2" · "4:3" · "1:1" · "4:5" · "9:16" 또는 "가로:세로" */
  aspect?: Aspect;
  /** contain: 액자 안에 전체가 보이게(기본) · cover: 액자를 꽉 채우게 */
  fit?: Fit;
  /**
   * auto: 마우스 + 태블릿 이상은 겹쳐 바꾸기(fade), 그 밖은 밀어 넘기기(slide)
   * slide · fade: 고정
   */
  transition?: "auto" | GalleryMode;
  /** 끝에서 처음으로 이어지기 (기본 켬 — 뉴스룸과 같다) */
  loop?: boolean;
}

/** 점이 이보다 많으면 '3 / 12' 로 표시 */
const MAX_DOTS = 10;
const SIZES = laneSizes("media");
const FADE_QUERY = `(hover: hover) and (pointer: fine) and (min-width: ${BREAKPOINT.tablet}px)`;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const KIND = { image: "이미지", video: "영상", custom: "슬라이드" } as const;

export default function Gallery({
  items,
  label = "이미지 갤러리",
  aspect = "16:9",
  fit = "contain",
  transition = "auto",
  loop = true,
}: GalleryProps) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const count = items.length;
  const prefersFade = useMediaQuery(FADE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const visible = useInView(rootRef, 0.25);
  const mode: GalleryMode =
    transition === "auto" ? (prefersFade ? "fade" : "slide") : transition;

  const [announcement, setAnnouncement] = useState("");
  const { viewportRef, index, go, onScroll, release } = useGallery({
    count,
    loop,
    mode,
    onChange: (i) =>
      setAnnouncement(`${i + 1} / ${count}. ${plainText(items[i])}`),
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (count === 0) return null;

  const many = count > 1;
  const hasDots = many && count <= MAX_DOTS;
  const atStart = !loop && index === 0;
  const atEnd = !loop && index === count - 1;
  const current = items[index];
  const href = downloadOf(current);
  const hasCaption = items.some((item) => item.caption);
  const id = (part: string, i: number) => `${uid}-${part}-${i}`;
  const trackId = `${uid}-track`;
  const frame = aspectOf(aspect);
  const style = {
    "--gallery-aspect": frame.css,
    "--gallery-ratio": frame.ratio,
  } as CSSProperties;

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = keyToIndex(event.key, index, count);
    if (next === null) return;
    event.preventDefault();
    const i = (next + count) % count; // 탭 목록은 끝에서 처음으로 돈다
    go(i);
    tabRefs.current[i]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`not-prose lane-full ${s.gallery}`}
      style={style}
      data-mode={mode}
      data-visible={visible ? "" : undefined}
      role="group"
      aria-roledescription="갤러리"
      aria-label={label}
    >
      <div className={s.stage}>
        <div
          ref={viewportRef}
          id={trackId}
          className={s.viewport}
          onScroll={onScroll}
          onPointerDown={release}
          onWheel={release}
          onTouchStart={release}
        >
          <div className={s.track}>
            {items.map((item, i) => {
              const active = i === index;
              const near = Math.abs(i - index) <= 1;
              const state = {
                active,
                visible,
                reducedMotion,
                playing: active && visible && !reducedMotion,
              };
              return (
                <div
                  key={i}
                  id={id("slide", i)}
                  className={s.slide}
                  role={hasDots ? "tabpanel" : "group"}
                  aria-roledescription="슬라이드"
                  aria-label={`${i + 1} / ${count}`}
                  aria-describedby={item.caption ? id("caption", i) : undefined}
                  inert={!active}
                  data-active={active ? "" : undefined}
                  data-playing={state.playing ? "" : undefined}
                  data-kind={item.type ?? "image"}
                >
                  <SlideContext.Provider value={state}>
                    <SlideView
                      item={item}
                      fit={item.fit ?? fit}
                      near={near}
                      active={active}
                      visible={visible}
                      reducedMotion={reducedMotion}
                    />
                  </SlideContext.Provider>
                </div>
              );
            })}
          </div>
        </div>

        {many && (
          <>
            <button
              type="button"
              className={`${s.paddle} ${s.prev}`}
              aria-label="이전 슬라이드"
              aria-controls={trackId}
              aria-disabled={atStart}
              onClick={() => !atStart && go(index - 1)}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className={`${s.paddle} ${s.next}`}
              aria-label="다음 슬라이드"
              aria-controls={trackId}
              aria-disabled={atEnd}
              onClick={() => !atEnd && go(index + 1)}
            >
              <Chevron direction="right" />
            </button>
          </>
        )}
      </div>

      {(hasCaption || href) && (
        <div className={s.caption}>
          <div className={s.captionStack}>
            {items.map((item, i) => (
              <p
                key={i}
                id={id("caption", i)}
                className={s.captionText}
                aria-hidden={i !== index}
                data-active={i === index ? "" : undefined}
              >
                {item.caption}
              </p>
            ))}
          </div>
          {href && (
            <a
              className={s.download}
              href={href}
              download={current.downloadName ?? ""}
              aria-label={`${index + 1}번째 ${KIND[current.type ?? "image"]} 원본 내려받기`}
              title="원본 내려받기"
            >
              <DownloadIcon />
            </a>
          )}
        </div>
      )}

      {hasDots && (
        <div className={s.dots} role="tablist" aria-label="슬라이드 고르기">
          {items.map((item, i) => (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={id("tab", i)}
              className={s.dot}
              aria-selected={i === index}
              aria-controls={id("slide", i)}
              aria-label={`${i + 1}번째 슬라이드`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={onTabKeyDown}
            />
          ))}
        </div>
      )}
      {many && !hasDots && (
        <p className={s.counter} aria-hidden="true">
          {index + 1} / {count}
        </p>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}

function SlideView({
  item,
  fit,
  near,
  active,
  visible,
  reducedMotion,
}: {
  item: GalleryItem;
  fit: Fit;
  near: boolean;
  active: boolean;
  visible: boolean;
  reducedMotion: boolean;
}) {
  switch (item.type) {
    case "video":
      return (
        <GalleryVideo
          src={item.src}
          sources={item.sources}
          poster={item.poster}
          label={item.alt}
          autoPlay={item.autoPlay ?? true}
          loop={item.loop ?? true}
          fit={fit}
          active={active}
          visible={visible}
          reducedMotion={reducedMotion}
          preload={near}
        />
      );
    case "custom":
      return (
        <div className={s.custom} role="img" aria-label={item.alt}>
          {item.content}
        </div>
      );
    default:
      return (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={SIZES}
          draggable={false}
          className={s.media}
          data-fit={fit}
          loading={near ? "eager" : "lazy"}
        />
      );
  }
}

function downloadOf(item: GalleryItem): string | null {
  if (item.download === false) return null;
  if (item.download) return item.download;
  if (item.type === "custom") return null;
  return typeof item.src === "string" ? item.src : item.src.src;
}

function plainText(item: GalleryItem) {
  return typeof item.caption === "string" ? item.caption : item.alt;
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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 5v13.5M6.5 13 12 18.5l5.5-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
