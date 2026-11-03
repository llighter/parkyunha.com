"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import TextTabs from "./TextTabs";
import s from "./Works.module.css";

type View = "all" | "albums" | "videos";

const ViewContext = createContext<
  [View, Dispatch<SetStateAction<View>>] | null
>(null);

/**
 * /works 보기 거르기 — 카드는 서버가 다 그리고, 여기서는 data-view 만 바꾼다(숨기기는 CSS).
 * 구역에는 data-section="albums" · "videos". 주소에는 남기지 않는다
 */
export function WorksView({ children }: { children: ReactNode }) {
  const state = useState<View>("all");
  return (
    <ViewContext value={state}>
      <div className={s.view} data-view={state[0]}>
        {children}
      </div>
    </ViewContext>
  );
}

const TABS: [View, string][] = [
  ["all", "All"],
  ["albums", "Albums"],
  ["videos", "Videos"],
];

/** 'All | Albums | Videos' — WorksView 안에서 */
export function WorksTabs() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("WorksTabs 는 WorksView 안에 둔다");
  const [view, setView] = context;
  return (
    <TextTabs label="보기" className={s.headerTabs}>
      {TABS.map(([value, name]) => (
        <button
          key={value}
          type="button"
          aria-pressed={view === value}
          onClick={() => setView(value)}
        >
          {name}
        </button>
      ))}
    </TextTabs>
  );
}
