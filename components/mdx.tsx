import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxProps {
  code: string;
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
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className={`prose prose-neutral`}>
      <Component components={{ ...components }} />
    </article>
  );
}
