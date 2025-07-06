import Image from "next/image";

export default function AppleImage({ src, alt, caption, inline = false }) {
  const classNames = inline
    ? `tablet:max-w-[576px] laptop:max-w-[653px]`
    : `tablet:max-w-(--breakpoint-tablet_inner) laptop:my-11 laptop:max-w-(--breakpoint-laptop_inner)`;

  return (
    <figure
      className={`mx-auto my-8 max-w-[414px] tablet:my-9 laptop:my-11 ${classNames}`}
    >
      <div className="component-content">
        <div className="image-sharesheet">
          <div className="image-asset">
            {/* FIXME: my-0 은 상위에 prose가 적용되어 있는 것을 무시하기 위해 추가하였음 */}
            <picture className="my-0">
              <Image
                src={src}
                alt={alt}
                className={`h-auto w-full phone:rounded-xl`}
              />
            </picture>
          </div>
          <div className="image-description mx-auto mt-3 w-87.5 text-xs font-extrabold text-gray-500 tablet:w-[576px] laptop:mt-4 laptop:w-[653px]">
            <div className="image-caption break-all">{caption}</div>
          </div>
        </div>
      </div>
    </figure>
  );
}
