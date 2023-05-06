import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";

interface MdxProps {
  code: string;
}

const CustomLink = (props) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  const { aspect, ...rest } = props;
  const aspectRatio = Number(aspect).toFixed(2); // 이미지의 가로 세로 비율 계산

  return (
    <div className={`content-large pb-10`}>
      <div style={{ aspectRatio: aspectRatio }} className={`relative`}>
        <Image
          alt={props.alt}
          fill={true}
          className={`rounded-none object-contain shadow-2xl phone:rounded-xl`}
          {...rest}
        />
      </div>
    </div>
  );
}

function Aside(props) {
  return (
    <div>
      <div className="mx-2 mb-2 h-[0.1em] bg-blue-600" />
      <div className={`mx-4 text-blue-600`}>
        <span className={`mr-3`}>⭐</span>️ {props.children}
      </div>
    </div>
  );
}

const components = {
  Aside,
  a: CustomLink,
  Image: RoundedImage,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <article className={`prose prose-neutral mx-auto break-keep`}>
      <Component components={{ ...components }} />
    </article>
  );
}
