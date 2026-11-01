"use client";

import { useTheme } from "next-themes";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import s from "./themeToggle.module.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** 시스템 — 반원. heroicons 에 없어 같은 굵기(1.5)로 칠해 그렸다: 오른쪽 반은 칠하고 왼쪽은 테두리만 */
function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 3.75a8.25 8.25 0 000 16.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const OPTIONS = [
  { key: "light", label: "라이트", Icon: SunIcon },
  { key: "dark", label: "다크", Icon: MoonIcon },
  { key: "system", label: "시스템", Icon: SystemIcon },
] as const;

// 서버/하이드레이션 중에는 false, 클라이언트 마운트 후 true
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  // 모르는 값이면 시스템
  const found = OPTIONS.findIndex((o) => o.key === theme);
  const currentIndex = found === -1 ? OPTIONS.length - 1 : found;
  const current = OPTIONS[currentIndex];

  // 바깥을 누르면 닫고, Esc 는 닫고 단추로 초점을 돌려준다
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // 열리면 지금 값 항목에 초점
  useEffect(() => {
    if (open) itemRefs.current[currentIndex]?.focus();
  }, [open, currentIndex]);

  // 하이드레이션 전에는 테마를 모른다 — 같은 크기의 빈 단추로 자리만 잡는다
  if (!mounted) {
    return (
      <div className={s.root}>
        <button type="button" className={s.button} aria-label="화면 테마">
          <span className="block h-5 w-5" />
        </button>
      </div>
    );
  }

  const pick = (key: (typeof OPTIONS)[number]["key"]) => {
    setTheme(key);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // 메뉴 안: ↑ ↓ · Home · End 로 항목 사이를 옮기고, Tab 은 메뉴를 닫는다
  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter(
      (el): el is HTMLButtonElement => el !== null,
    );
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (n: number) =>
      items[(n + items.length) % items.length]?.focus();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusAt(i + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAt(items.length - 1);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const CurrentIcon = current.Icon;

  return (
    <div className={s.root} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={s.button}
        aria-label={`화면 테마 — 지금 ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <CurrentIcon />
      </button>
      {open && (
        <div
          id={menuId}
          className={s.menu}
          role="menu"
          aria-label="화면 테마"
          onKeyDown={onMenuKeyDown}
        >
          {OPTIONS.map(({ key, label, Icon }, i) => (
            <button
              key={key}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              className={s.item}
              role="menuitemradio"
              aria-checked={key === current.key}
              tabIndex={-1}
              onClick={() => pick(key)}
            >
              <Icon />
              <span>{label}</span>
              <span className={s.check}>
                <CheckIcon />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
