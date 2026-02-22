"use client";

import { LinkIcon } from "@/app/components/icons";
import { useState } from "react";

export default function CopyLinkButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    });
  }

  return (
    <button onClick={handleClick} aria-label="링크 복사">
      <LinkIcon />
      {showTooltip && (
        <span
          role="status"
          aria-live="polite"
          className="absolute rounded-md bg-black px-2 py-1 text-xs text-white dark:bg-neutral-200 dark:text-neutral-900"
        >
          클립보드에 복사하기
        </span>
      )}
    </button>
  );
}
