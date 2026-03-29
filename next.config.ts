import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withNextIntl(withMDX(nextConfig));
