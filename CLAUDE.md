# llighter.io (parkyunha.com) — 작업 규칙

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · MDX. 설계서는 `docs/design-system.md`, 값은 `app/styles/tokens.css` 한 곳.

## 디자인 시스템

- 색 · 글자 · 간격 · 모서리는 역할 토큰으로 — `bg-canvas` `text-fg-muted` `text-display` `my-media` `rounded-media`. `--ref-*` 와 팔레트 클래스(`gray-500` · `neutral-400` …)는 쓰지 않는다.
- `dark:` 는 색에 쓰지 않는다 — 다크는 `.dark` 범위에서 토큰 값만 바뀐다. 기본 팔레트는 지워져 있어(`--color-*: initial`) `gray-500` 같은 클래스는 CSS 가 생기지 않는다. `dark:` 는 모양이 바뀌는 곳(숨김 · 보임, 그림 반전)에만.
- 폭은 레인으로 — 부모 `.lanes`, 블록은 `lane-text` · `lane-panel` · `lane-media` · `lane-wide` · `lane-full`. 폭 숫자를 직접 쓰지 않는다.
- 브레이크포인트 `phone-lg` 415 · `tablet` 735 · `desktop` 1069 (`app/globals.css` 의 `@theme`). 바꾸면 `lib/layout.ts` 도 같이 고치고 `node scripts/check-layout-tokens.mjs`.
- 클래스 이름을 조립하지 않는다 (`` `lane-${x}` `` ✗ — Tailwind 가 찾지 못한다).
- Tailwind 는 쓰되 억지로 쓰지 않는다. 상태(`[data-*]`) · keyframes · 컨테이너 쿼리 · 부품 토큰은 CSS 모듈, MDX 본문과 페이지 전체 규칙은 `app/styles/*.css`. 한 요소의 클래스가 한 줄을 넘거나 같은 임의값이 두 번 넘게 나오면 CSS 로 옮긴다.
- 움직임은 토큰(`--ease-reveal` · `--reveal-*` · `--duration-*`)으로. 움직임 줄이기 설정을 지킨다.
- 그림은 `Figure`, 갤러리는 `Gallery`(사진 · 영상, `aspect` 프리셋, 내려받기 없음). `AppleImage` · `HeroImage` · `YoutubeIframe` · `AppleGallery` 는 기존 글을 위한 감싸개.
- 머리(`sidebar.tsx`)는 한 줄 띠 — 워드마크 · 내비(`blog · works · project · about`, home 없음) · 테마 메뉴, 폭은 `lane-text tablet:lane-media`. 푸터도 같은 띠.
- 쪽 머리는 `PageHeader`(h1 `text-title` + 소개 한 줄) — 제목 앞에 `&nbsp;` 를 넣어 선을 맞추지 않는다. 시리즈 쪽은 `/blog/series/[key]`(`SERIES` 에 있는 키만). 소개 쪽 글은 `app/about/content.mdx` 하나(한 줄 소개 · 본문 · 링크 줄).
- 채널 · 바깥 링크 칩은 `Chip`(사진 쪽은 글자 탭 줄), 다른 쪽으로 가는 링크 줄은 `LinkList`. 글 본문(prose) 안에 둘 때는 `not-prose` 로 감싼다.
- 카드 여러 장을 가로로 넘길 때는 `Carousel`(카드는 `BlogTile` — 그림 아래 글). 점 · 화살표 크기는 `tokens.css :root` 의 `--gallery-dot` · `--gallery-dot-hit` · `--gallery-paddle`.
- 브랜드는 `app/components/brand/` — 헤더 `Logo`(워드마크), 푸터 `Signature`(워드마크 + 낙관). 치수는 `brand.module.css` 의 `--brand-cap`, 낙관 색은 `--color-seal`(평소엔 먹색 — 흑백). 낙관 글꼴 윤곽은 손대지 않는다(EBS 라이선스).
- 글 metadata 는 `export const metadata = postMetadata({ … })`(`lib/post-metadata.ts` — `summary` 가 검색 · 링크 미리보기 설명이 된다). 링크 미리보기 제목 · 설명은 쪽의 `title` · `description` 을 Next 가 그대로 쓴다 — 레이아웃 `openGraph` 에 title · description · url 을 다시 적지 않는다.
- 글 metadata: `type`(필수 — `"note"` · `"deep-dive"`, 표시 이름은 `lib/constants.ts` 의 `POST_TYPES`, 없으면 빌드가 멈춘다), `series`(같은 값의 글을 홈 시리즈 줄이 모은다 — 이름 · 설명은 `SERIES`), `hidden: true` 면 목록 · sitemap 에서 빠진다, `updatedAt` 이 있으면 dateModified 로. `category` 는 남아 있지만 화면은 `type` 을 쓴다.
- 새 글을 쓰면 글 폴더에 `opengraph-image.tsx` 도 둔다 — 다른 글의 것을 복사해 `alt`(제목)와 `postOgImage("<slug>")` 만 바꾼다. 링크 미리보기 그림은 `app/blog/og.tsx` 가 그린다.
- 사진은 긴 변 2400px · JPEG 85 로 줄여서 넣는다(메타데이터 없이). 원본은 저장소 밖(사진 보관함 · NAS)에 둔다.
- 사진 쪽(`/works` · `/works/<앨범>`)은 `app/components/Works/` — 가운데 머리 `WorksHeader`, 글자 탭 `TextTabs`, 카드 `AlbumCard` · `VideoCard`, 그리드 `PhotoGrid` → `Lightbox`. 글자는 `text-showcase` · `text-showcase-card` · `font-mono text-mono`, 모서리 0. 데이터는 `lib/works.ts`.
- 사진 쪽 사진은 마스터 `photos/<앨범>/<이름>.jpg`(긴 변 2400 · JPEG 85) 하나만 커밋한다 — 크기별 파일은 `npm run photos`(build · dev 앞에 저절로)가 `public/photos/` 에 만들고, 그림은 `PhotoImage`(사진 loader)로. Vercel 이미지 최적화를 쓰지 않는다.
- 스크롤 등장은 `data-reveal-children` · `data-reveal-stagger` · `data-reveal` 속성만 붙인다 (일은 `RevealOnScroll` 하나가 한다).

## 확인

- `npx tsc --noEmit` · `npm run lint` · `node scripts/check-layout-tokens.mjs` · `npm run build`
- 화면은 폭 390 · 768 · 1280, 밝게 · 어둡게. 확인용 서버는 `npm run start -- -p 3100` (3000 은 개발 서버용으로 비워 둔다).

## 작업 방식

- main 에 바로 커밋하지 않는다. 브랜치에서 하고, 한 커밋 = 한 가지 일.
- 커밋 · 푸시 · 파일 삭제 · 패키지 설치는 하기 전에 묻는다.
- 커밋 메시지는 한국어 한 줄, 필요하면 본문.
