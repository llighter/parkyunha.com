# llighter.io 프로젝트 진행사항

## 변경 이력 (Changelog)

### 2026-07-02: 코드베이스 점검 및 정비

- **ESLint 복구**: FlatCompat이 eslint-config-next 16과 충돌해 `npm run lint` 크래시 → 네이티브 flat config(`eslint-config-next/core-web-vitals`)로 재작성
- **`[locale]` 페이지 정적 생성(SSG) 전환**: 레이아웃/페이지에 `setRequestLocale` 추가 (기존엔 매 요청 동적 렌더링)
- AppleGallery.tsx: 훅 호출 전 early return 제거 (rules-of-hooks 위반 수정), 중복 visited effect 제거
- themeToggle.tsx: setState-in-effect 패턴 → `useSyncExternalStore` 기반 `useMounted`로 교체
- footer/sidebar 중복 `Logo` 컴포넌트 → 공유 `Logo.tsx` 추출, `<img>` → `next/image`
- sidebar.tsx: 하드코딩된 로케일 정규식 → `i18n/routing`의 `locales`에서 생성
- studycard: 중복 다운로드 버튼 → `DownloadButton` 추출, CTA의 JSX 인라인 훅 호출 제거, App Store 뱃지 죽은 링크(`href="#"`) → 비링크 처리
- page.tsx: 갤러리 `sizes` 오타 수정(min-width → max-width), `Badge`에 `rel="noopener noreferrer"` 추가
- studycard-logo.png: 1024px/1.5MB → 512px/240KB 최적화

### 2026-02-22: 버그 수정 및 코드 개선

- footer.tsx: 잔여 코드 제거, alt 속성 추가, 저작권 연도 동적 처리
- postHeader.tsx: `table:` -> `tablet:` 오타 수정, `React.FC` 제거, metadata/post 객체 통합
- copyLinkButton.tsx: `aria-label` 추가, 툴팁 접근성 개선
- 미사용 코드 제거: `CustomImage.tsx`, `api/hello/route.ts`, 주석 import문
- 홈페이지 이미지 `priority` 6개 -> 2개로 최적화
- `lib/types.ts`: `BlogMetadata`, `BlogPost` 공유 타입 생성
- `lib/constants.ts`: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION` 상수 추출
- 6개 파일에서 하드코딩 URL을 상수로 교체
- `blog.ts`, `postHeader.tsx`, `blog/page.tsx` 중복 타입 정의 제거
- `AppleGallery.tsx`: 터치 상태 `useRef` 전환, 매직넘버 상수화
- `lib/utils.tsx` -> `lib/utils.ts` 확장자 변경

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

- [x] ~~footer.tsx: 주석 처리된 코드 잔여물~~
- [x] ~~footer.tsx: 로고 이미지 alt 속성 누락~~
- [x] ~~footer.tsx: 저작권 연도 하드코딩~~
- [x] ~~CustomImage.tsx: 폐기된 Image API 사용~~ (컴포넌트 삭제)
- [x] ~~postHeader.tsx: `table:` -> `tablet:` 오타~~
- [x] ~~blog/page.tsx: 블로그 글 6개 미만 시 레이아웃 깨짐~~ (`firstArticle &&`, `length > 0` 가드 적용됨)

---

## 코드 개선 (Refactor)

- [x] ~~미사용 코드 정리 (CustomImage, api/hello, 주석 import)~~
- [x] ~~React.FC 패턴 -> 함수 선언 패턴 통일~~
- [x] ~~postHeader.tsx metadata/post 객체 통합~~
- [x] ~~AppleGallery.tsx 터치 상태 useRef 전환~~
- [x] ~~AppleGallery.tsx 매직넘버 상수화~~
- [x] ~~Metadata 타입 중앙 집중화~~
- [x] ~~하드코딩된 URL 상수화~~
- [x] ~~lib/utils.tsx -> lib/utils.ts~~
- [ ] **[AppleImage.tsx, HeroImage.tsx] prose 스타일 오버라이드 문제**
  - `FIXME: my-0 은 상위에 prose가 적용되어 있는 것을 무시하기 위해 추가`
  - MDX 컴포넌트 구조에서 prose 적용 범위 재설계

---

## 성능 (Performance)

- [x] ~~홈페이지 이미지 priority 과다 설정 (6개 -> 2개)~~
- [x] ~~blog/page.tsx: 블로그 타일 이미지 sizes 누락~~ (반응형 sizes 적용됨)
- [x] ~~anime.js 사용 범위 검토~~ (의존성에서 제거 완료, CSS 애니메이션으로 대체됨)
- [x] ~~studycard-logo.png 원본 과대(1.5MB)~~ (512px/240KB로 축소)
- [x] ~~`[locale]` 페이지 동적 렌더링~~ (`setRequestLocale` 추가로 SSG 전환)

---

## 접근성 (Accessibility)

- [x] ~~copyLinkButton.tsx: aria-label 추가~~
- [x] ~~copyLinkButton.tsx: 툴팁 접근성 개선~~
- [x] ~~AppleGallery.tsx: 갤러리 키보드 내비게이션~~ (`role="tablist"`/`"tab"`, 화살표·Home·End 키 지원 적용됨)

---

## 구조적 한계 (Known Limitations)

- [ ] **html lang 초기값 문제**
  - 루트 레이아웃이 `lang="ko"` 고정, `SetHtmlLang`이 클라이언트에서 사후 패치
  - 영어 등 다른 로케일 페이지도 초기 HTML은 `lang="ko"`로 전송됨 (SEO 영향)
  - 블로그(비국제화)와 `[locale]` 영역이 루트 레이아웃을 공유해서 생긴 절충
  - 근본 해결은 블로그까지 `[locale]` 하위로 옮기는 구조 재설계 필요

---

## 기능 추가 (Feature)

- [x] ~~다크 모드~~ (next-themes + `dark:` 클래스 적용 완료)
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
  - `postHeader.tsx`: `datePublished`와 `dateModified`가 동일
  - 수정일을 별도 관리할 수 있도록 metadata 확장
- [ ] **블로그 목차 (Table of Contents)**
  - MDX 헤딩 기반 자동 TOC 생성
- [ ] **loading.tsx 추가**
  - 페이지 전환 시 로딩 상태 UI

---

## 기술 스택

| 항목         | 버전              |
| ------------ | ----------------- |
| Next.js      | 16.1.6            |
| React        | 19.2.4            |
| TypeScript   | 5.8.3             |
| Tailwind CSS | 4.1.11            |
| ESLint       | 9.x (flat config) |
| Node.js      | 24.1.0            |
| next-intl    | 4.8.3             |
| next-themes  | 0.4.6             |
| MDX          | 3.1.0             |
