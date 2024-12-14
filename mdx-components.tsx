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
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  blockquote: (props: BlockQuoteProps) => (
    <blockquote
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="w-87.5 mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li {...props} />,
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => {
    return (
      <pre
        className="mx-auto max-w-[366px] tablet:max-w-[576px] laptop:max-w-[653px]"
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
  customComponents: MDXComponents
): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
