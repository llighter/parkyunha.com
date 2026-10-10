import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

/*
  글 본문의 폭은 부모(.lanes)가 준다 — h1~h4 · p · ul · ol 은 기본 레인(본문)에 그대로 선다.
  배경이 있는 블록(인용 · 코드)만 lane-panel: 본문 폭이되 폰에서는 좌우 여백까지 쓴다.
*/
const components = {
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="lane-panel" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="lane-panel" {...props} />
  ),
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
