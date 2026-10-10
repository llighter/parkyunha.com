"use client";

import { createContext, useContext } from "react";

/** 갤러리가 장마다 내려 주는 상태 */
export interface SlideState {
  /** 지금 보이는 장인가 */
  active: boolean;
  /** 갤러리가 화면 안에 있는가 */
  visible: boolean;
  /** 움직임 줄이기 설정 */
  reducedMotion: boolean;
  /** active && visible && !reducedMotion — 애니메이션 · 재생을 시작해도 되는 때 */
  playing: boolean;
}

export const SlideContext = createContext<SlideState>({
  active: true,
  visible: true,
  reducedMotion: false,
  playing: true,
});

/**
 * 사용자 슬라이드(type: "custom") 안의 클라이언트 컴포넌트가 '지금 보이는가'를 읽는다.
 * CSS 만으로 충분하면 훅 없이 장 요소의 [data-playing] 속성을 쓰면 된다.
 */
export function useSlide(): SlideState {
  return useContext(SlideContext);
}
