"use client";

import { MailIcon } from "@/app/components/icons";
import { SITE_URL } from "@/lib/constants";

interface Post {
  title: string;
  slug: string;
  summary: string;
}

export default function MailButton({ post }: { post: Post }) {
  function handleMailButtonClick() {
    const urlParams = new URLSearchParams();
    urlParams.append("subject", post.title);
    urlParams.append("body", window.location.href);

    const mailtoUrl = `mailto:?${urlParams.toString()}`;
    window.open(mailtoUrl, "_self");
  }

  return (
    <button
      data-href={`${SITE_URL}/blog/${post.slug}`}
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
