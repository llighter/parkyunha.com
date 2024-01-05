import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import { highlight } from "sugar-high";

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

function Code({children, ...props}) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\u3131-\uD79D\w-]+/g, "") // Remove all non-word chars except Korean
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  return ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Aside,
  a: CustomLink,
  Image: RoundedImage,
  code: Code,
};

// export function Mdx({ code }: MdxProps) {
//   const Component = useMDXComponent(code);
//   return (
//     <article className={`prose prose-neutral mx-auto break-keep`}>
//       <Component components={{ ...components }} />
//     </article>
//   );
// }

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
