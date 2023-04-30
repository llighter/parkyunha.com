"use client";

import { MailIcon } from "@/components/icons";

export default function MailButton({ post }) {
  function handleMailButtonClick() {
    const urlParams = new URLSearchParams();
    urlParams.append("subject", post.title);
    urlParams.append("body", window.location.href);

    const mailtoUrl = `mailto:?${urlParams.toString()}`;
    window.open(mailtoUrl, "_self");
  }

  return (
    <button
      data-href={`https://llighter.vercel.app/blog/${post.slug}`}
      data-title={post.title}
      data-description={post.summary}
      data-analytics-title="Share via mail"
      aria-label="메일로 공유하기"
      onClick={handleMailButtonClick}
    >
      <MailIcon />
    </button>
  );
}
