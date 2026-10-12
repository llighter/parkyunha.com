import Link from "next/link";
import { Wordmark } from "./brand/Wordmark";
import s from "./brand/brand.module.css";

/** 홈으로 가는 워드마크 (헤더). 대문자 16px — 크기는 brand.module.css 의 --brand-cap */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="PARK YUNHA — 홈"
      className={`${s.logo} ${className ?? ""}`}
    >
      <Wordmark className={s.wordmark} title={null} />
    </Link>
  );
}
