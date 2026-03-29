import createMiddleware from "next-intl/middleware";
import { routing, locales } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const i18nPaths = ["/project", "/studycard"];

const localePattern = new RegExp(
  `^/(${locales.filter((l) => l !== "ko").join("|")})(/|$)`,
);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeMatch = pathname.match(localePattern);
  const pathWithoutLocale = localeMatch
    ? pathname.replace(localePattern, "/")
    : pathname;

  const needsI18n = i18nPaths.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + "/"),
  );

  if (needsI18n || localeMatch) {
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
