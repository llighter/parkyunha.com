# llighter.io 프로젝트 진행사항

## 변경 이력 (Changelog)

### 2026-02-22: Next.js 16 업그레이드 및 프로젝트 점검

- **Next.js** 15.3.5 -> 16.1.6
- **React** 19.1.0 -> 19.2.4
- **ESLint** 8 -> 9 (flat config 마이그레이션)
- `next.config.mjs` -> `next.config.ts` 전환 (TypeScript 설정)
- `experimental.mdxRs` 제거
- `tsconfig.json` 현대화: `strict: true`, `moduleResolution: "bundler"`, `target: "ES2017"`
- Turbopack 기본 사용 (`--turbo` 플래그 제거)
- `next lint` -> `eslint .` (Next.js 16에서 `next lint` 제거됨)
- 미사용 의존성 제거: `@react-icons/all-files`, `@types/animejs`
- 타입 추가: `AppleGallery`, `AppleImage`, `HeroImage`, `YoutubeIframe`
- `sidebar.tsx` 이벤트 리스너 cleanup 추가
- `sitemap.ts` import 경로 수정 (`@/` alias 사용)
- `not-found.tsx`, `error.tsx` 추가

---

## 버그 (Bug)

- [ ] **[footer.tsx:63] 주석 처리된 코드 잔여물**
  - `// </div>` 가 JSX 밖에 남아 있음
- [ ] **[footer.tsx:6] 로고 이미지 alt 속성 누락**
  - `<img src="/images/logo.svg" />` 에 alt 없음
- [ ] **[footer.tsx:59] 저작권 연도 하드코딩**
  - `Copyright © 2024`가 고정되어 있음 -> 동적으로 변경 필요
- [ ] **[CustomImage.tsx:14] 폐기된 Image API 사용**
  - `layout="responsive"` 는 Next.js 13부터 deprecated
  - `fill` + `sizes` 또는 `width`/`height` 방식으로 변경 필요
- [ ] **[blog/page.tsx:37] 블로그 글 6개 미만 시 레이아웃 깨짐**
  - `FIXME: 최소 글 갯수가 6개 이상이어야 함` 주석 있음
  - 글이 적을 때도 정상 렌더링 되도록 방어 코드 필요
- [ ] **[postHeader.tsx:80] 오타**
  - `table:text-[42px]` -> `tablet:text-[42px]`

---

## 코드 개선 (Refactor)

- [ ] **미사용 코드 정리**
  - `CustomImage.tsx`: 프로젝트 어디에서도 import 하지 않음 -> 제거 또는 수정
  - `api/hello/route.ts`: 테스트용 API -> 제거
  - `page.tsx:3-5`: 주석 처리된 import문 정리
- [ ] **React.FC 패턴 -> 함수 선언 패턴으로 통일**
  - `postHeader.tsx`: `const PostHeader: React.FC<Props>` -> `function PostHeader(props: Props)`
  - `CustomImage.tsx`: 동일
- [ ] **[postHeader.tsx:22] metadata와 post 객체 통합**
  - `TODO: 하나로 합치기` 주석 있음
  - metadata를 그대로 사용하도록 구조 단순화
- [ ] **[AppleImage.tsx, HeroImage.tsx] prose 스타일 오버라이드 문제**
  - `FIXME: my-0 은 상위에 prose가 적용되어 있는 것을 무시하기 위해 추가`
  - MDX 컴포넌트 구조에서 prose 적용 범위 재설계
- [ ] **AppleGallery.tsx 터치 상태 관리**
  - `touchStartX`, `touchEndX`가 컴포넌트 안에서 `let`으로 선언됨 -> `useRef` 사용
- [ ] **AppleGallery.tsx 매직넘버 상수화**
  - 모바일 브레이크포인트 `734`, 스와이프 임계값 `50` -> 상수 추출
- [ ] **Metadata 타입 중앙 집중화**
  - `blog.ts`, `postHeader.tsx`, `blog/page.tsx` 에서 각각 Metadata 타입 정의 -> 공유 타입으로 통합
- [ ] **하드코딩된 URL 상수화**
  - `https://www.parkyunha.com`이 `layout.tsx`, `postHeader.tsx`, `sitemap.ts` 등에 분산 -> 상수 파일로 추출
- [ ] **lib/utils.tsx -> lib/utils.ts**
  - JSX를 사용하지 않으므로 `.ts` 확장자가 적절

---

## 성능 (Performance)

- [ ] **[page.tsx] 홈페이지 이미지 priority 과다 설정**
  - 6개 이미지 모두 `priority` 지정됨 -> 첫 1~2개만 지정
  - 나머지는 lazy loading 활용
- [ ] **[blog/page.tsx] 블로그 타일 이미지 sizes 누락**
  - `<Image width={400} height={400} />` 에 `sizes` prop 없음
  - 반응형 sizes 추가 필요
- [ ] **anime.js 사용 범위 검토**
  - 간단한 애니메이션은 CSS transition/animation으로 대체 가능
  - 번들 사이즈 절약 여부 검토

---

## 접근성 (Accessibility)

- [ ] **[copyLinkButton.tsx] 버튼에 aria-label 누락**
  - `<button onClick={handleClick}>` 에 `aria-label="링크 복사"` 추가
- [ ] **[copyLinkButton.tsx:19] 툴팁 접근성**
  - `ToolTip()` 을 함수 호출이 아닌 컴포넌트로 사용: `{showTooltip && <ToolTip />}`
  - `role="status"`, `aria-live="polite"` 추가
- [ ] **[AppleGallery.tsx] 갤러리 키보드 내비게이션**
  - 점 네비게이션이 클릭만 지원 -> 키보드(화살표, Enter) 지원 추가
  - `role="tablist"`, `role="tab"`, `tabIndex` 추가

---

## 기능 추가 (Feature)

- [ ] **다크 모드**
  - `page.tsx:15`에 TODO 주석 있음
  - `globals.css:65-81`에 다크모드 CSS 변수가 주석 처리됨
  - Tailwind `dark:` 클래스 + `next-themes` 또는 수동 구현
- [ ] **블로그 읽기 시간 표시**
  - MDX 콘텐츠 기반 예상 읽기 시간 계산
- [ ] **블로그 검색/필터**
  - 카테고리별 필터링
- [ ] **코드 블록 복사 버튼**
  - `mdx-components.tsx`의 `pre`/`code` 컴포넌트에 복사 기능 추가
- [ ] **Open Graph 이미지**
  - `layout.tsx` metadata에 OG 이미지 미설정
  - 동적 OG 이미지 생성 (`opengraph-image.tsx`) 고려
- [ ] **SEO: dateModified 분리**
  - `postHeader.tsx:40`: `datePublished`와 `dateModified`가 동일
  - 수정일을 별도 관리할 수 있도록 metadata 확장
- [ ] **블로그 목차 (Table of Contents)**
  - MDX 헤딩 기반 자동 TOC 생성
- [ ] **loading.tsx 추가**
  - 페이지 전환 시 로딩 상태 UI

---

## 기술 스택

| 항목 | 버전 |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.4 |
| TypeScript | 5.8.3 |
| Tailwind CSS | 4.1.11 |
| ESLint | 9.x (flat config) |
| Node.js | 24.1.0 |
| anime.js | 4.0.2 |
| MDX | 3.1.0 |
