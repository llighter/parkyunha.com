import { Seal } from "./Seal";
import { Wordmark } from "./Wordmark";
import s from "./brand.module.css";

/**
 * 서명 + 낙관 — 워드마크 오른쪽에 성명인. 밝은 배경 = 주문, 다크 = 백문 (brand.module.css).
 * 이름은 감싸는 링크나 이 요소의 aria-label 이 맡고, 안의 그림은 장식.
 */
export function Signature({ className }: { className?: string }) {
  return (
    <span
      className={`${s.signature} ${className ?? ""}`}
      role="img"
      aria-label="PARK YUNHA 박윤하인"
      data-signature
    >
      <Wordmark className={s.wordmark} title={null} />
      <Seal variant="ju" className={`${s.seal} ${s.sealJu}`} title={null} />
      <Seal variant="baek" className={`${s.seal} ${s.sealBaek}`} title={null} />
    </span>
  );
}
