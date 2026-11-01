"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import Logo from "./Logo";
import { locales } from "@/i18n/routing";
import s from "./sidebar.module.css";

/** 홈은 워드마크가 맡는다 — 내비에 home 항목이 없다 */
const navItems = [
  { name: "blog", path: "/blog" },
  { name: "works", path: "/works" },
  { name: "project", path: "/project" },
  { name: "about", path: "/about" },
];

const APP_ROUTES = ["/studycard"];
const localePattern = new RegExp(`^/(${locales.join("|")})(/|$)`);

export default function NavBar() {
  const pathname = usePathname() || "/";
  const cleanPathname = pathname.replace(localePattern, "/");

  if (APP_ROUTES.some((route) => cleanPathname.startsWith(route))) {
    return null;
  }

  // 글(/blog/…)에서는 blog, /en/project 에서는 project 가 지금 쪽
  const isCurrent = (path: string) =>
    cleanPathname === path || cleanPathname.startsWith(`${path}/`);

  return (
    <header className="border-b border-line">
      <div className={`lane-text tablet:lane-media ${s.bar}`}>
        <Logo className={s.home} />
        <nav className={s.nav} aria-label="사이트">
          {navItems.map(({ name, path }) => (
            <Link
              href={path}
              key={path}
              className={s.link}
              aria-current={isCurrent(path) ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className={s.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
