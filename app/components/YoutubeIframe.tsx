export default function YoutubeIframe({ src, title, caption, inline = false }) {
  // AppleImage에서 사용하는 max-width 설정을 inline 여부에 따라 적용
  const classNames = inline
    ? `tablet:max-w-[576px] laptop:max-w-[653px]`
    : `tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`;

  return (
    <figure
      className={`mx-auto my-8 max-w-[414px] tablet:my-9 laptop:my-11 ${classNames}`}
    >
      <div className="component-content">
        <div className="iframe-sharesheet">
          <div className="iframe-asset">
            {/* aspect-video: 16:9 비율로 부모 너비에 맞춰 세로 길이 자동 조절 */}
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute left-0 top-0 h-full w-full border-0"
                src={src}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {caption && (
            <div className="iframe-description mx-auto mt-3 w-87.5 text-xs font-extrabold text-gray-500 tablet:w-[576px] laptop:mt-4 laptop:w-[653px]">
              <div className="iframe-caption break-all">{caption}</div>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}
