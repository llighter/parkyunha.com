"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-5.25v1.5H17a.75.75 0 010 1.5H7a.75.75 0 010-1.5h2.75V18H5.25a3 3 0 01-3-3V5.25zm1.5 0A1.5 1.5 0 015.25 3.75h13.5a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5H5.25A1.5 1.5 0 013.75 15V5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const themeConfig = {
  system: { icon: MonitorIcon, label: "시스템", next: "light" as const },
  light: { icon: SunIcon, label: "라이트", next: "dark" as const },
  dark: { icon: MoonIcon, label: "다크", next: "system" as const },
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-1 rounded-md px-2 py-2 text-stone-400 dark:text-neutral-500"
        aria-label="테마 전환"
      >
        <span className="inline-block h-4 w-4" />
        <span className="text-[11px]">&nbsp;</span>
      </button>
    );
  }

  const current = themeConfig[theme as keyof typeof themeConfig] ?? themeConfig.system;
  const Icon = current.icon;

  return (
    <button
      onClick={() => setTheme(current.next)}
      className="flex items-center gap-1 rounded-md px-2 py-2 text-stone-400 transition-colors duration-200 hover:bg-stone-50 hover:text-stone-700 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
      aria-label={`현재 테마: ${current.label}. 클릭하여 변경`}
      title={current.label}
    >
      <Icon className="h-4 w-4" />
      <span className="text-[11px] font-medium">{current.label}</span>
    </button>
  );
}
