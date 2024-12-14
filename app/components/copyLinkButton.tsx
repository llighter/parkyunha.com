"use client";

import { LinkIcon } from "@/app/components/icons";
import { useState } from "react";

export default function CopyLinkButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(window.location.href).then((r) => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    });
  }

  return (
    <button onClick={handleClick}>
      <LinkIcon />
      {showTooltip && ToolTip()}
    </button>
  );
}

function ToolTip() {
  return (
    <span
      className={`absolute rounded-md bg-black px-2 py-1 text-xs text-white`}
    >
      클립보드에 복사하기
    </span>
  );
}
