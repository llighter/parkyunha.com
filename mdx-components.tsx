import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type BlockQuoteProps = ComponentPropsWithoutRef<"blockquote">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="content-container"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="content-container"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="content-container"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="content-container"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="content-container"
      {...props}
    />
  ),
  blockquote: (props: BlockQuoteProps) => (
    <blockquote
      className="content-container-full"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="content-container"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="content-container"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li {...props} />,
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    return (
      <pre
        className="content-container-full"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(
  customComponents: MDXComponents,
): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
