"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const MOBILE_BREAKPOINT = 734;
const SWIPE_THRESHOLD = 50;

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  caption: string;
}

export default function AppleGallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return null;
  }

  const totalSlides = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const dotButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setVisited((prev) => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex]);

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    }

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const changeImage = useCallback(
    (newIndex: number) => {
      const normalizedIndex = (newIndex + totalSlides) % totalSlides;
      setCurrentIndex(normalizedIndex);
      setVisited((prev) => ({ ...prev, [normalizedIndex]: true }));
    },
    [totalSlides],
  );

  const handlePrev = useCallback(() => {
    changeImage(currentIndex - 1);
  }, [changeImage, currentIndex]);

  const handleNext = useCallback(() => {
    changeImage(currentIndex + 1);
  }, [changeImage, currentIndex]);

  const transformStyle = isMobile
    ? { transform: `translateX(-${currentIndex * 100}%)` }
    : undefined;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < SWIPE_THRESHOLD) {
      return;
    }

    if (diff > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handleDotKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const focusDot = (targetIndex: number) => {
      changeImage(targetIndex);
      dotButtonRefs.current[targetIndex]?.focus();
    };

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusDot((index - 1 + totalSlides) % totalSlides);
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusDot((index + 1) % totalSlides);
        break;
      case "Home":
        event.preventDefault();
        focusDot(0);
        break;
      case "End":
        event.preventDefault();
        focusDot(totalSlides - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="not-prose gallery my-8 me-auto ms-auto w-full max-w-[414px] tablet:my-9 tablet:max-w-[850px] tablet:px-[79px] laptop:my-11 laptop:box-border laptop:w-auto laptop:max-w-[1228px] laptop:px-[124px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="이미지 갤러리"
    >
      <div
        className={`component-content relative flex flex-col whitespace-nowrap max-[734px]:overflow-hidden`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            handlePrev();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            handleNext();
          }
        }}
      >
        {/* 점 네비게이션 */}
        <nav className="dotnav order-2 text-center" aria-label="슬라이드 선택">
          <ul
            className="pointer-events-auto mx-[17px] mt-[17px] inline-flex h-3"
            role="tablist"
            aria-orientation="horizontal"
          >
            {images.map((_, index) => (
              <li key={index} role="presentation" className="mx-2">
                <button
                  type="button"
                  ref={(element) => {
                    dotButtonRefs.current[index] = element;
                  }}
                  role="tab"
                  id={`gallery-dot-${index}`}
                  aria-selected={index === currentIndex}
                  aria-controls={`gallery-slide-${index}`}
                  tabIndex={index === currentIndex ? 0 : -1}
                  aria-label={`${index + 1}번 슬라이드`}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-black dark:bg-white"
                      : "bg-gray-300 hover:bg-gray-400 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                  }`}
                  onClick={() => changeImage(index)}
                  onKeyDown={(event) => handleDotKeyDown(event, index)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* 이미지 슬라이드 */}
        <div
          className="gallery-images relative h-auto w-full whitespace-nowrap max-[734px]:flex max-[734px]:transition-transform max-[734px]:duration-500 tablet:grid tablet:grid-cols-[100%]"
          style={transformStyle}
        >
          {images.map((image, index) => {
            // 방문한 적이 있으면 visited[index] === true
            // 현재 슬라이드 vs 방문한 슬라이드 vs 아직 방문하지 않은 슬라이드
            let classNames;
            if (index === currentIndex) {
              classNames =
                "tablet:visible tablet:z-10 tablet:opacity-100 tablet:will-change-[opacity]";
            } else if (visited[index]) {
              classNames = "tablet:visible tablet:z-0 tablet:opacity-0";
            } else {
              classNames = "tablet:z-0 tablet:opacity-0";
            }

            return (
              <div
                key={index}
                className={`gallery-item w-full transform max-[734px]:shrink-0 tablet:col-start-1 tablet:col-end-2 tablet:row-start-1 tablet:row-end-2 tablet:inline-block tablet:translate-x-0 tablet:translate-y-0 tablet:transition-opacity tablet:duration-500 tablet:ease-in-out ${classNames}`}
                role="tabpanel"
                id={`gallery-slide-${index}`}
                aria-labelledby={`gallery-dot-${index}`}
                aria-hidden={index !== currentIndex}
              >
                <figure className="image-sharesheet-gallery">
                  <div className="image-sharesheet">
                    <div className="image-asset relative h-auto w-full pt-[56.224487%]">
                      <picture className="absolute left-0 top-0 h-full w-full">
                        <Image
                          fill
                          src={image.src}
                          alt={image.alt}
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                          sizes="(max-width: 734px) 87.5vw, (max-width: 1068px) 692px, 980px"
                          className={`h-auto w-full object-contain phone:rounded-xl`}
                        />
                      </picture>
                    </div>
                    <div
                      className={`gallery-caption mx-auto mt-3 w-87.5 text-xs font-extrabold text-gray-500 dark:text-neutral-400 tablet:w-[576px] laptop:mt-4 laptop:w-[653px]`}
                      aria-live={index === currentIndex ? "polite" : undefined}
                    >
                      <div className="image-caption break-all">
                        {image.caption}
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>

        {/* 화살표 버튼 */}
        <nav className="paddle-nav absolute left-1/2 top-[43%] hidden w-[calc(100%+88px+24px)] -translate-x-1/2 transform tablet:block">
          <ul className="relative flex justify-between">
            {/* 이전 버튼 */}
            <li>
              <button
                type="button"
                className="-mt-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                onClick={handlePrev}
                aria-label="이전 슬라이드"
              >
                <FaAngleLeft className="text-2xl font-extrabold" />
              </button>
            </li>
            {/* 다음 버튼 */}
            <li>
              <button
                type="button"
                className="-mt-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                onClick={handleNext}
                aria-label="다음 슬라이드"
              >
                <FaAngleRight className="text-2xl font-extrabold" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
