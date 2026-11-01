# 디자인 시스템 — 토큰 · 레인 · 부품 · 움직임

값은 `app/styles/tokens.css` 한 곳에만 있다. 컴포넌트는 역할 이름(`bg-canvas`, `text-display`, `lane-media` …)만 쓰고, 다크 모드와 폰 · 태블릿 · 데스크톱은 **토큰 값이 바뀌어서** 처리된다. 숫자는 애플 뉴스룸 기준(현재 사이트가 따르던 값)이다.

## 파일

| 파일                                       | 하는 일                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `app/styles/tokens.css`                    | 값의 유일한 출처 — 원시(`--ref-*`) · 역할(`@theme static`) · 레이아웃(`--lane-*`) · 움직임(`--reveal-*`) · 다크(`.dark`) |
| `app/styles/layout.css`                    | 레인 유틸리티 `lanes` · `lane-text` · `lane-panel` · `lane-media` · `lane-wide` · `lane-full`                            |
| `app/styles/article.css`                   | 글 본문(prose)을 토큰에 연결 — 글 속 링크는 본문색 + 밑줄                                                                |
| `app/styles/motion.css`                    | 스크롤 등장 — 순수 CSS (`data-reveal-*` 상태별 모양)                                                                     |
| `app/globals.css`                          | Tailwind 진입점 · 브레이크포인트 · 컨테이너 크기                                                                         |
| `lib/layout.ts`                            | JS 가 쓰는 숫자 사본 (`next/image` 의 `sizes`, `matchMedia`) · 비율 프리셋 `ASPECT`                                      |
| `scripts/check-layout-tokens.mjs`          | CSS 와 `lib/layout.ts` 의 숫자가 같은지 검사                                                                             |
| `app/components/Figure/`                   | 그림 · 영상 한 장                                                                                                        |
| `app/components/Gallery/`                  | 갤러리 — `Gallery.tsx` · `useGallery.ts` · `GalleryVideo.tsx` · `Gallery.module.css`                                     |
| `app/components/Reveal/RevealOnScroll.tsx` | 스크롤 등장 — 루트 레이아웃에 하나                                                                                       |
| `app/components/brand/`                    | 워드마크 `Wordmark` · 낙관 `Seal` · 서명 `Signature` · `brand.module.css` (치수는 대문자 높이 `--brand-cap` 하나에서)    |
| `app/components/sidebar.tsx`               | 머리 — 한 줄 띠(워드마크 · 내비 · 테마 단추), 모양은 `sidebar.module.css`                                                |
| `app/components/themeToggle.tsx`           | 테마 단추 → 메뉴(라이트 · 다크 · 시스템), 모양은 `themeToggle.module.css`                                                |
| `app/components/Carousel/`                 | 가로 캐러셀 — `Carousel.tsx` · `Carousel.module.css`                                                                     |
| `app/components/BlogTile.tsx`              | 블로그 타일 — /blog · 홈 최신 · 홈 시리즈 캐러셀                                                                         |
| `app/components/ProjectCard.tsx`           | 프로젝트 카드 — /project · 홈 (데이터는 `lib/projects.ts`)                                                               |
| `app/components/PageHeader.tsx`            | 쪽 머리 — h1 제목(`text-title`) + 소개 한 줄. /blog · /works · /project · 시리즈 쪽                                      |

## 4층 토큰

| 층                  | 이름                                                             | 하는 일                                                 | Spring 에 빗대면           |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- | -------------------------- |
| 1 원시              | `--ref-gray-0 … 1000`, `--ref-blue-*`, `--ref-cinnabar-500`      | 값 그 자체. 컴포넌트에서 쓰지 않는다                    | `application.yml` 의 상수  |
| 2 역할              | `--color-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--ease-*` | 의미. 컴포넌트는 여기에만 기댄다. 다크는 이 층만 바꾼다 | 인터페이스 (DIP)           |
| 3 레이아웃 · 움직임 | `--lane-*`, `--reveal-*`                                         | 화면 폭 · 사용자 설정마다 값이 바뀌는 것                | 프로파일별 설정값          |
| 4 부품              | `--gallery-*`                                                    | 부품 하나의 손잡이. 부품 CSS 모듈 맨 위에만             | `@ConfigurationProperties` |

부품 둘 이상이 같은 값을 쓰면 `tokens.css :root` 로 올린다 — 점 · 화살표 크기(`--gallery-dot` · `--gallery-dot-hit` · `--gallery-paddle`)는 갤러리 · 캐러셀이 함께 써서 `:root` 에 있다(이름은 처음 쓴 갤러리를 따랐다).

역할 토큰을 `@theme static` 에 두는 이유

- `static`: 유틸리티가 쓰이지 않아도 CSS 변수로 늘 나온다 → CSS 모듈이 `var(--color-fg)` 로 읽을 수 있다.
- `inline` 을 쓰지 않는 이유: `inline` 은 유틸리티 안에 값을 박아 넣어서 `.dark` 가 역할 토큰을 바꿔도 따라오지 않는다.
- 원시 토큰(`--ref-*`)은 `:root` 에만 둔다. 하위 요소에서 다시 정의하지 않는다.

### 색 역할

| 역할                               | 밝게                  | 어둡게            | 쓰는 곳                                     |
| ---------------------------------- | --------------------- | ----------------- | ------------------------------------------- |
| `canvas`                           | #ffffff               | #000000           | 페이지 바탕                                 |
| `surface`                          | #f5f5f7               | #1d1d1f           | 목록 페이지 바탕                            |
| `frame`                            | #fafafc               | #161617           | 갤러리 액자                                 |
| `card`                             | #ffffff               | #2c2c2e           | 블로그 타일                                 |
| `fg`                               | #1d1d1f               | #f5f5f7           | 본문 · 제목 · 글 속 링크                    |
| `fg-muted`                         | #6e6e73               | #a1a1a6           | 설명 · 날짜 · 분류 (어떤 면 위에서도 4.5:1) |
| `fg-subtle`                        | #86868b               | #6e6e73           | 글머리표 · 보조 아이콘 (본문 글자 금지)     |
| `line` / `line-strong`             | #d2d2d7 / #86868b     | #424245 / #6e6e73 | 선 · 테두리 · 갤러리 점                     |
| `accent`                           | #0066cc               | #2997ff           | 강조 링크 (글 속 링크는 본문색 + 밑줄)      |
| `focus`                            | #0071e3               | #2997ff           | 포커스 링                                   |
| `control` / `control-fg`           | #f5f5f7 / #6e6e73     | #2c2c2e / #a1a1a6 | 갤러리 화살표 · 영상 단추                   |
| `media-control` / `-hover` / `-fg` | 검정 50% / 66% / #fff | 같음              | 영상 위 재생 · 일시정지 단추                |
| `positive`                         | #16a34a               | #4ade80           | 확인 표시(✓) 같은 상태 — 버튼 · 링크 금지   |
| `seal`                             | #1d1d1f               | #f5f5f7           | 낙관 — 평소엔 먹색(흑백)                    |

- 검정 단추(CTA · 툴팁)는 `bg-fg text-canvas` — 잉크 색을 바탕으로 쓴다. 다크에서는 저절로 뒤집힌다.
- Tailwind 기본 팔레트는 `tokens.css` 의 `--color-*: initial;` 로 지웠다. `gray-500` · `white` 같은 클래스는 CSS 가 생기지 않는다.
- 남아 있는 `dark:` 는 색이 아니라 모양을 바꾸는 둘뿐 — StudyCard 의 밝은 · 어두운 화면 갈무리 바꿔 보이기, 검정 배지 그림 반전. 브랜드의 주문 ↔ 백문 바꿔 보이기는 `brand.module.css` 에서 `:global(.dark)` 로.

### 글자 역할 (크기 / 줄 높이 px)

| 역할              | 폰    | 태블릿 | 데스크톱 | 굵기 | 쓰는 곳            |
| ----------------- | ----- | ------ | -------- | ---- | ------------------ |
| `text-display`    | 32/39 | 42/50  | 48/57    | 800  | 글 제목            |
| `text-title`      | 24/30 | 28/34  | 32/38    | 700  | 페이지 섹션 제목   |
| `text-lead`       | 21/27 | 21/27  | 24/30    | 700  | 글 요약            |
| `text-heading`    | 24/32 |        |          | 700  | 글 속 h2           |
| `text-subheading` | 20/28 |        |          | 700  | 글 속 h3           |
| `text-body`       | 17/29 |        |          | 400  | 본문               |
| `text-caption`    | 14/20 |        |          | 600  | 그림 · 갤러리 설명 |
| `text-eyebrow`    | 12/16 |        |          | 700  | 분류               |
| `text-meta`       | 14/20 |        |          | 600  | 날짜               |

간격: `my-media` 32 · 36 · 44, `mt-caption` 12 · 12 · 16, `pb-section` 40 · 64 · 80. 모서리: `rounded-media` 0(화면을 꽉 채우는 동안) → 9(뉴스룸 액자), `rounded-card` 16.

글 속 링크: 본문색(`fg`) + 밑줄 1px(글자에서 0.2em 아래), 마우스를 올리면 2px. `article.css` 한 곳.

## Tailwind 와 CSS — 어디에 쓰나

Tailwind 는 남긴다. 다만 **억지로 쓰지 않는다**. 두 쪽 모두 같은 토큰(CSS 변수)을 읽으니 섞여도 값은 한 곳이다.

| 어디                          | 무엇                                                                                 | 예                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| 유틸리티 (`className`)        | 간격 · 정렬 · 레인 · 글자 역할 · 색 역할 — 한 요소에 몇 개로 끝나는 것               | `lane-text text-display mt-5`                       |
| CSS 모듈 (`부품.module.css`)  | 상태(`[data-active]` · `[data-mode]`) · 전환 · keyframes · 컨테이너 쿼리 · 부품 토큰 | `Gallery`, `Figure`                                 |
| 전역 CSS (`app/styles/*.css`) | 마크업을 못 고치는 곳 · 페이지 전체에 걸친 규칙 · 값 그 자체                         | `article.css`(MDX 본문), `motion.css`, `tokens.css` |

CSS 로 넘기는 신호

1. 한 요소의 클래스가 한 줄을 넘는다.
2. 같은 임의값(`[…]`)이 두 번 넘게 나온다 → 토큰이나 클래스로.
3. 상태 · 자식 · 형제 선택자가 필요하다.
4. keyframes · 여러 단계 전환.
5. `className` 을 붙일 수 없는 출력(MDX 본문 · 서드파티).

CSS 모듈은 `@reference "../../globals.css";` 를 맨 위에 두면 `@variant tablet` · `@apply text-caption` 처럼 테마를 그대로 쓸 수 있다. `.prettierrc` 는 `tailwindStylesheet` 로 `globals.css` 를 읽어서 `phone-lg:` · `tablet:` · `desktop:` 순서를 안다.

## 레인

| 레인    | 폰 < 735         | 태블릿 ≥ 735          | 데스크톱 ≥ 1069      | 쓰는 곳                                 |
| ------- | ---------------- | --------------------- | -------------------- | --------------------------------------- |
| `text`  | 87.5% · 최대 366 | 576.67 (692 의 10/12) | 653.33 (980 의 8/12) | 기본값 — 문단 · 제목 · 설명             |
| `panel` | 100% · 최대 366  | 576.67                | 653.33               | 코드 · 인용                             |
| `media` | 100% · 최대 414  | 692                   | 980                  | 그림 · 영상 · 갤러리 액자               |
| `wide`  | = media          | 850                   | 1228                 | 더 넓은 시각 자료                       |
| `full`  | 100%             | 100%                  | 100%                 | 띠 · 배경 · 레인을 넘나드는 부품의 바깥 |

- 부모가 `lanes` 면 자식은 기본으로 본문 레인. 다른 레인이 필요할 때만 `lane-*`.
- 폭은 “부모를 채우되(100%) 레인을 넘지 않게(`max-inline-size`)”. `min()` 으로 쓰면 긴 코드 한 줄이 페이지 폭을 밀어낸다.
- 그림 · 갤러리처럼 레인을 넘나드는 부품은 `lane-full` 을 차지하고 안에서 다시 고른다(사진은 media, 설명은 text). 그래서 설명의 왼쪽 선이 본문과 언제나 맞는다.
- 레인은 변형과 함께 쓸 수 있다: `lane-text tablet:lane-media`.
- 시작선은 둘 — 글 · 소개 · 섹션 제목은 `lane-text`, 머리 · 푸터 띠와 카드 목록 · 캐러셀은 `lane-text tablet:lane-media`(폰에서는 본문 레인과 같은 선).

## 브레이크포인트 · 컨테이너 크기

`app/globals.css` 의 `@theme` 한 곳. CSS 변수는 미디어 쿼리 안에서 못 쓰기 때문에 숫자는 여기에만 두고, `tablet:` 변형과 CSS 모듈의 `@variant tablet` 이 함께 나온다.

| 이름                                 | 값        | 뜻                                             |
| ------------------------------------ | --------- | ---------------------------------------------- |
| `phone-lg:`                          | 415       | 미디어가 화면을 다 채우지 않기 시작 (모서리 9) |
| `tablet:`                            | 735       | 갤러리 화살표가 나타난다                       |
| `desktop:`                           | 1069      | (옛 이름 `laptop:`)                            |
| `@tile-sm:`                          | 305       | 데스크톱 3열 타일                              |
| `@tile-md:`                          | 474       | 데스크톱 2열 타일                              |
| `@text-tablet:` / `@text-desktop:`   | 576 / 653 | 본문 레인 (소수는 내림)                        |
| `@media-tablet:` / `@media-desktop:` | 692 / 980 | 미디어 레인                                    |

브레이크포인트나 레인 숫자를 바꾸면 `lib/layout.ts` 도 같이 고치고 `node scripts/check-layout-tokens.mjs` 로 확인한다.

## 쓰는 법

```tsx
// 글 본문 — 자식은 본문 레인, 크기와 색은 토큰. 글자는 움직이지 않고 그림 · 갤러리만 슥 올라온다
<div className="lanes article prose max-w-none">{children}</div>

// 그림
<Figure lane="media" caption="설명">
  <Image src={img} alt="…" sizes={laneSizes("media")} />
</Figure>
<Figure lane="text" caption="설명">…</Figure>        // 태블릿부터 본문 폭, 폰에서는 꽉
<Figure lane="media" aspect="16:9"><iframe … /></Figure>

// 갤러리 — 사진 · 영상을 섞어 쓴다
<Gallery
  label="도메인 설정 과정"
  aspect="16:9"                                   // 기본. "21:9" "3:2" "4:3" "1:1" "4:5" "9:16" 또는 "7:3"
  items={[
    { src: img1, alt: "…", caption: "…" },
    { type: "video", src: "/videos/intro.mp4", poster: "/videos/intro.jpg", alt: "소개 영상", caption: "…" },
  ]}
/>
// fit: "contain" | "cover"   transition: "auto" | "slide" | "fade"   loop: 기본 true

// 카드 목록 — 함께 들어온 카드는 차례로
<div className="grid gap-8 tablet:grid-cols-2" data-reveal-children data-reveal-stagger>…</div>

// 페이지 섹션과 타일
<PageHeader title="블로그 글 읽기" description="…" /> // 쪽 머리 — h1 text-title, 들여쓰기 없이
<article className="@container">
  <p className="text-[19px] @tile-md:text-title">…</p>
</article>
```

## 갤러리

### 넘기는 방식

| 환경                 | 넘기기                               | 화살표                | 액자 폭                      |
| -------------------- | ------------------------------------ | --------------------- | ---------------------------- |
| 폰 · 터치            | 밀어 넘기기 (가로 스크롤 + 스냅)     | 없음 — 스와이프 · 점  | 화면 꽉, 최대 414            |
| 폰 폭 · 마우스       | 밀어 넘기기 (트랙패드) · 점 · 키보드 | 없음                  | 같음                         |
| 태블릿 이상 · 터치   | 밀어 넘기기                          | 액자 밖 12px, 지름 44 | 레인 폭, 모자라면 화면 − 144 |
| 태블릿 이상 · 마우스 | 겹쳐 바꾸기 0.5초                    | 액자 밖 12px, 지름 44 | 같음                         |

- 끝에서 처음으로 이어진다(`loop` 기본 켬). 점은 현재 #1d1d1f · 나머지 #d2d2d7 — 뉴스룸 그대로.
- 크기 · 간격은 뉴스룸 실측: 액자 980 × 551 · 모서리 9, 화살표 44(액자에서 12), 설명 14px 600(줄 최소 높이 24), 점 8 · 간격 24. 뉴스룸의 내려받기 단추는 보도자료용이라 두지 않는다 — 필요하면 길게 눌러 저장.
- “몇 번째 장인가”는 `useGallery` 하나가 맡고, 어떤 모습으로 넘길지는 CSS(`data-mode`)가 맡는다.
- 점은 tablist, 장은 tabpanel. 장이 바뀌면 aria-live 로 “2 / 5. 설명”을 읽는다. 보이지 않는 장은 `inert`. 움직임 줄이기 설정을 따른다.

### 액자 비율

| 프리셋 | 쓰임                | 데스크톱 (창 높이 900) |
| ------ | ------------------- | ---------------------- |
| `16:9` | 기본 · 뉴스룸       | 980 × 551              |
| `21:9` | 시네마 · 파노라마   | 980 × 420              |
| `3:2`  | 사진 (35mm)         | 980 × 653              |
| `4:3`  | 스크린샷 · 문서     | 936 × 702              |
| `1:1`  | 정사각              | 702 × 702              |
| `4:5`  | 세로 사진           | 562 × 702              |
| `9:16` | 세로 영상 · 폰 화면 | 395 × 702              |

- 폭은 미디어 레인이, 높이는 `--gallery-max-block`(= `min(78svh, 820px)`)이 상한 — 먼저 닿는 쪽에 맞춘다. 세로 액자는 화면을 넘지 않고 폭이 줄어 가운데에 선다.
- 프리셋은 `lib/layout.ts` 의 `ASPECT` 한 곳. 프리셋 밖은 `"가로:세로"` 문자열 그대로. `Figure` 도 같은 이름을 쓴다(`HeroImage` "3:2", `YoutubeIframe` "16:9").

### 담을 수 있는 것

| type          | 필수              | 동작                                                                                                                                                                                                       |
| ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (생략) 이미지 | `src`, `alt`      | `next/image` fill · `sizes` 는 레인에서. 지금 장 ±1 만 먼저 불러온다                                                                                                                                       |
| `"video"`     | `src`(mp4), `alt` | 보이는 장이고 갤러리가 화면 안일 때만 소리 없이 반복 재생, 벗어나면 멈춤. 사용자가 멈추면 장을 오가도 멈춘 채. 움직임 줄이기면 큰 재생 단추. `sources` 로 webm 을 앞에, `poster`, `autoPlay` · `loop` 끄기 |

- 영상 파일은 `/public` (같은 도메인)에 둔다. H.264 mp4 하나면 대부분의 브라우저가 재생한다. 브라우저는 소스를 앞에서부터 보고 재생할 수 있는 첫 것을 고르니, 용량을 줄이거나 H.264 가 빠진 브라우저(오픈소스 Chromium 등)까지 챙기려면 `sources` 로 webm 을 앞에 둔다.
- 자동 재생은 `muted` + `playsInline` + 보일 때 `play()` — iOS 도 허용하는 조합. 막히면 재생 단추로 바뀐다.
- 한 장짜리 갤러리 = 화살표 · 점 없는 단독 영상(설명은 그대로).
- 사진 · 영상 말고 다른 것(애니메이션 등)이 필요해지면 `type` 을 하나 더하고 `SlideView` 에 갈래를 더한다. 쓰는 곳이 없어 뺀 ‘사용자 슬라이드’ 틀(`type: "custom"` · `useSlide()` · `[data-playing]`)은 커밋 `4027223` 에 남아 있다.

## 머리 · 테마 · 푸터

- 머리(`sidebar.tsx`)는 한 줄 띠 — 왼쪽 워드마크, 이어서 내비, 오른쪽 테마 단추, 아래 1px `line`. 태블릿부터 높이 72 한 줄, 폰은 두 줄(워드마크 · 테마 단추 56 / 내비 44, 넘치면 가로로 밀림). 폭은 `lane-text tablet:lane-media`.
- 내비는 `blog · works · project` — 홈은 워드마크가 맡아 `home` 항목이 없다. 지금 쪽은 `aria-current="page"` + 굵게 `fg`, 나머지 `fg-muted`. 글(`/blog/…`)에서는 blog, `/en/project` 에서는 project 가 지금 쪽. 알약 배경 · 등장 애니메이션은 없다. `/studycard` 는 머리를 숨긴다.
- 테마 단추(`themeToggle.tsx`)는 아이콘 하나(지름 40 · 아이콘 20)가 지금 값을 보여 준다 — 해 · 달 · 반원(시스템). 누르면 메뉴(`role="menu"` · `menuitemradio`, 지금 값에 체크). ↑ ↓ · Home · End 로 옮기고, 바깥을 누르거나 Esc 로 닫는다(Esc · 고른 뒤에는 단추로 초점). 메뉴는 그림자 없이 `line` 테두리 + `canvas` 바탕.
- 푸터는 머리와 같은 띠(`lane-text tablet:lane-media`). Navigate 에도 `home` 은 없다.

## 캐러셀

```tsx
<Carousel label="시리즈 개발 도구 팁" itemName="글" surface>
  {posts.map((post) => <BlogTile key={post.slug} article={post} sizes="…" />)}
</Carousel>
<Carousel label="사진" itemName="사진" variant="photo">…</Carousel>
```

- 가로 스크롤 + `scroll-snap`. 폰은 트랙이 화면 끝까지 차고 첫 카드가 본문 레인 왼쪽 선에서 시작한다 — 다음 카드가 화면 끝에 살짝 보인다. 태블릿부터는 트랙을 미디어 레인에서 잘라, 넓은 화면에서도 레인 밖으로 다음 장이 드러나지 않는다.
- 한 번에 보이는 장수: `card` 폰 1(본문 폭) · 태블릿 2 · 데스크톱 3, `photo` 폰 화면의 62.5% · 3 · 4.
- 아래 왼쪽 점(탭 목록 — ← → · Home · End), 오른쪽 이전 · 다음 단추 44px. 갤러리와 같은 토큰이지만 끝에서 처음으로 이어지지 않고(끝 단추는 `aria-disabled`), 폰에서도 단추가 보인다. 한 번에 다 보이는 폭(예: 데스크톱의 시리즈 3장)에서는 넘길 곳이 없어 점 · 단추를 숨긴다 — 장수(`data-count`)로 CSS 가 고른다. `surface` 띠 위에서는 단추 바탕이 `control-hover`.
- 카드 글자는 그림 아래 — 카드는 `BlogTile` 그대로. 사진 위에 글을 얹지 않는다.
- 바뀔 때 '글 2 / 3' 을 읽어 준다. 초점 갈 곳이 없는 사진 트랙은 트랙에 초점이 가서 ← → 로 스크롤한다. 스크롤 등장은 트랙 하나에(`data-reveal`).

## 움직임

### 스크롤 등장

| 속성                                       | 뜻                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `data-reveal-children`                     | 직계 자식을 하나씩 등장시킨다                                          |
| `data-reveal-children data-reveal-stagger` | + 함께 들어온 자식끼리 90ms 씩 차례로, 최대 450ms (카드 목록)          |
| `data-reveal`                              | 이 요소 하나만 (그림 · 갤러리 — `Figure` · `Gallery` 가 스스로 붙인다) |

상태(`data-reveal-state`, JS 가 붙인다): 없음 → `pending`(첫 화면 아래에서 기다림: 투명 · 16/24px 아래) → `shown`(화면 아래 8% 선을 넘으면 0.9초 동안 오름) → `done`(규칙에서 빠져 요소 본래 스타일로).

- 서버 HTML 에는 상태가 없다 → JS 가 없거나 늦어도 다 보인다. 첫 화면 · 이미 지나온 위쪽은 건드리지 않는다.
- 한 번만. End 키 · 앵커로 한 번에 건너뛴 블록은 움직임 없이 바로 보인다.
- 숨은 블록 안 링크에 키보드 초점이 닿으면 즉시 보인다(`:focus-within`). 움직임 줄이기 · 인쇄에서는 언제나 보인다.
- 목록 안의 목록은 목록 자신 대신 항목이 뜬다(두 번 겹쳐 움직이지 않게).
- 지금 붙인 곳: 그림 · 갤러리(`Figure` · `Gallery`), `/blog` 카드 두 묶음, 홈 사진, works 그리드. 글 본문의 글자(문단 · 제목 · 목록 · 코드 · 인용)는 움직이지 않는다.
- Spring 으로 읽으면: `data-reveal-*` 는 `@Transactional` 같은 선언이고, 일은 `RevealOnScroll`(루트 레이아웃의 어드바이스 하나)이 한다. 효과를 바꿀 때는 `motion.css` · `RevealOnScroll.tsx` 두 파일만.

### 움직임 토큰

| 토큰                                  | 값                               | 쓰임                                      |
| ------------------------------------- | -------------------------------- | ----------------------------------------- |
| `--ease-reveal`                       | `cubic-bezier(0.2, 0.7, 0.2, 1)` | 빠르게 출발해 부드럽게 선다 — 스크롤 등장 |
| `--reveal-distance`                   | 16px · 24px(태블릿 이상)         | 오르는 거리                               |
| `--reveal-duration`                   | 900ms                            | 오르는 시간                               |
| `--reveal-stagger`                    | 90ms                             | 함께 들어온 카드 사이                     |
| `--duration-fast` · `--duration-slow` | 150ms · 500ms                    | 상태 전환 · 갤러리 겹쳐 바꾸기            |

움직임 줄이기 설정이면 시간 · 거리가 모두 0 — 토큰 한 곳에서 꺼진다.

## 지킬 규칙

1. 컴포넌트는 `--ref-*` 와 팔레트 클래스(`gray-500`, `neutral-400` …)를 쓰지 않는다.
2. `dark:` 는 색에 쓰지 않는다(역할 토큰이 바꾼다). 모양이 바뀌는 곳(숨김 · 보임, 그림 반전)에만. 섹션 하나만 어둡게 하려면 그 요소에 `dark` 클래스.
3. 반응형 크기 · 폭은 토큰으로 — `tablet:text-[42px]` 대신 `text-display`, 폭 클래스 대신 `lane-*`.
4. 클래스 이름을 조립하지 않는다(`` `lane-${lane}` `` ✗). Tailwind 는 소스의 글자 그대로를 찾아 클래스를 만든다.
5. 유틸리티로 어색해지면 CSS 로 — 위의 “어디에 쓰나”와 신호 다섯 가지.
6. 움직임은 토큰(`--ease-reveal` · `--reveal-*` · `--duration-*`)으로, 상태는 `data-*` 속성으로. 시간 · 곡선을 부품마다 새로 정하지 않는다.

## 브랜드

로고 키트 2판의 규칙을 `brand.module.css` 가 CSS 로 들고 있다. 치수는 대문자 높이 `--brand-cap` 하나에서 나온다 — 워드마크 높이 = cap × 1.09, 도장 = cap × 2, 사이 = cap × 1.

| 자리               | 부품                                                                                | 값                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 헤더               | `Logo`(링크 + `Wordmark`)                                                           | 대문자 16px, 글자색 `fg`. 머리 띠의 왼쪽 — 폰 56 줄 · 태블릿부터 72 줄의 가운데                                     |
| 푸터               | `Signature`(워드마크 + 낙관)                                                        | 대문자 24 · 도장 48 · 사이 24. 밝은 배경 주문(글자 + 테두리), 다크 백문(바탕에 글자를 비움)                         |
| 파비콘 · 앱 아이콘 | `app/favicon.ico` · `icon.svg` · `apple-icon.png` · `manifest.ts` + `public/icons/` | 백문 작은 판 — 먹색 바탕 흰 글자                                                                                    |
| 링크 미리보기      | `app/opengraph-image.png` · 글은 `app/blog/og.tsx`                                  | 1200 × 630 밝은 판. 글은 폴더마다 `opengraph-image.tsx` 가 유형 · 제목 + 서명을 빌드 때 그린다(Pretendard Bold OTF) |

- 워드마크는 `currentColor` 라 다크에서 `invert` 하지 않는다. 낙관 색은 `seal` 토큰 하나 — 평소에는 먹색(흑백)이라 밝게는 검정, 어둡게는 흰색으로 찍힌다. 로고 키트의 인주색 #b4382a 는 `--ref-cinnabar-500` 에 값만 남겨 두고 인쇄물 같은 특별한 자리에서만 쓴다.
- 파비콘 `icon.svg` 는 다크 탭에서 밝은 바탕에 먹색 글자로 바뀐다(`prefers-color-scheme`). PNG 아이콘은 먹색 바탕에 흰 글자 하나.
- 규칙: 서명은 대문자 24px 이상에서만(작은 헤더는 워드마크만), 도장 둘레 여백은 도장의 ⅛ 이상, 글꼴 윤곽은 손대지 않는다(EBS 훈민정음체 라이선스).

## 남은 일

1. (선택) prose 를 글 전용 CSS 로 — `article.css` 한 파일만 고쳐 쓰면 된다.
