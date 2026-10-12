"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import Logo from "./Logo";
import { locales } from "@/i18n/routing";

const navItems = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "works", path: "/works" },
  { name: "project", path: "/project" },
];

const APP_ROUTES = ["/studycard"];
const localePattern = new RegExp(`^/(${locales.join("|")})(/|$)`);

export default function NavBar() {
  let pathname = usePathname() || "/";
  const cleanPathname = pathname.replace(localePattern, "/");

  if (APP_ROUTES.some((route) => cleanPathname.startsWith(route))) {
    return null;
  }

  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <aside>
      <div className="content-container mb-2">
        <div>
          <Logo className="h-20 animate-[fade-in-up_0.6s_ease-out_both] transition-transform duration-200 hover:scale-[1.02]" />
        </div>
        <nav
          className="relative flex scroll-pr-6 items-start overflow-hidden px-4 pb-0 desktop:flex-col desktop:overflow-auto desktop:px-0"
          id="nav"
        >
          <div className="relative my-2 flex flex-row items-center desktop:mt-0">
            {navItems.map(({ name, path }, index) => {
              const isActive = path === pathname;
              return (
                <Link
                  href={path}
                  key={path}
                  className={`relative animate-[fade-in-up_0.5s_ease-out_both] rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-fg"
                      : "text-fg-muted hover:bg-surface hover:text-fg" // 대비 4.5:1 이상 (stone-400 은 2.6:1 이었다)
                  }`}
                  style={{ animationDelay: `${100 + index * 80}ms` }}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 animate-[pill-in_0.25s_ease-out_both] rounded-md bg-surface ring-1 ring-line/60" />
                  )}
                  {name}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </aside>
  );
}
