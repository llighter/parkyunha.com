"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./Gallery.module.css";

export interface VideoSource {
  src: string;
  /** 예: "video/webm" — 브라우저가 앞에서부터 고른다 */
  type: string;
}

interface Props {
  src: string;
  sources?: VideoSource[];
  poster?: string | StaticImageData;
  label: string;
  autoPlay: boolean;
  loop: boolean;
  fit: "contain" | "cover";
  active: boolean;
  visible: boolean;
  reducedMotion: boolean;
  /** 이웃 장이면 메타데이터를 미리 받는다 */
  preload: boolean;
}

/**
 * 갤러리 안의 영상 한 장.
 * - 보이는 장이고 갤러리가 화면 안에 있을 때만 재생한다 (소리 없이 · 반복이 기본)
 * - 사용자가 누른 재생 · 일시정지는 장을 넘겼다 돌아와도 지킨다
 * - 움직임 줄이기 설정이면 저절로 재생하지 않고 재생 버튼을 보여 준다
 */
export default function GalleryVideo({
  src,
  sources,
  poster,
  label,
  autoPlay,
  loop,
  fit,
  active,
  visible,
  reducedMotion,
  preload,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  /** 사용자가 직접 정한 뜻 — null 이면 기본값(autoPlay 이고 움직임 줄이기가 아닐 때 재생) */
  const [intent, setIntent] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const wants = intent ?? (autoPlay && !reducedMotion);
  const shouldPlay = active && visible && wants;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (shouldPlay) {
      video.muted = true; // iOS 자동 재생 조건 — 속성뿐 아니라 값도
      video.play().catch((error: unknown) => {
        // 자동 재생이 막히면 재생 버튼을 보여 준다 (pause 로 끊긴 AbortError 는 무시)
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          setIntent(false);
        }
      });
    } else if (!video.paused) {
      video.pause();
    }
  }, [shouldPlay]);

  const posterUrl = typeof poster === "string" ? poster : poster?.src;
  const big = !started && !playing;

  return (
    <>
      <video
        ref={ref}
        className={s.media}
        data-fit={fit}
        muted
        playsInline
        loop={loop}
        preload={preload ? "metadata" : "none"}
        poster={posterUrl}
        aria-label={label}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
      >
        {sources?.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className={s.mediaToggle}
        data-size={big ? "big" : undefined}
        aria-label={playing ? "영상 일시정지" : "영상 재생"}
        onClick={() => setIntent(!playing)}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" fill="currentColor" />
    </svg>
  );
}
