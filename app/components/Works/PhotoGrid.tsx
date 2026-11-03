"use client";

import { useRef, useState } from "react";
import type { PhotoSource } from "@/lib/works";
import Lightbox from "./Lightbox";
import PhotoImage from "./PhotoImage";
import s from "./Works.module.css";

/** 그리드 한 칸 — 서버가 앨범 데이터에서 만들어 넘긴다 */
export interface GridPhoto extends PhotoSource {
  alt: string;
  caption?: string;
  position?: string;
}

/** 첫 화면에 보이는 칸 — 태블릿부터 한 줄(2장)까지 미리 불러온다 */
const PRELOAD = 2;

/**
 * 앨범 사진 그리드 — 폰은 화면 끝까지 1열(lane-media), 태블릿부터 2열(데스크톱 lane-wide).
 * 3:4 로 자르고(cover) 모서리 0. 칸을 누르면 라이트박스, 닫으면 누른 칸으로 초점이 돌아온다
 */
export default function PhotoGrid({
  label,
  photos,
}: {
  /** 앨범 이름 — 라이트박스 이름 '서울 — 사진 크게 보기' */
  label: string;
  photos: GridPhoto[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <>
      <div
        className={`lane-media desktop:lane-wide ${s.grid}`}
        data-reveal-children
      >
        {photos.map(({ src, width, height, alt, position }, i) => (
          <button
            key={src}
            ref={(cell) => {
              cells.current[i] = cell;
            }}
            type="button"
            className={s.cell}
            aria-label={`크게 보기 — ${alt}`}
            onClick={() => setOpen(i)}
          >
            <PhotoImage
              src={src}
              width={width}
              height={height}
              alt=""
              sizes="(max-width: 734px) 100vw, (max-width: 1068px) 338px, 602px"
              preload={i < PRELOAD}
              className="size-full object-cover"
              style={{ objectPosition: position }}
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox
          photos={photos}
          start={open}
          label={label}
          onClose={() => {
            setOpen(null);
            cells.current[open]?.focus({ preventScroll: true });
          }}
        />
      )}
    </>
  );
}
