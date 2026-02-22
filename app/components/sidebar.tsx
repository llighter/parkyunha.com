"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./themeToggle";

const navItems = [
  { name: "home", path: "/" },
  { name: "work", path: "/work" },
  { name: "blog", path: "/blog" },
];

function Logo() {
  return (
    <Link href="/" aria-label="Park Yunha">
      <img
        className="h-20 w-36 animate-[fade-in-up_0.6s_ease-out_both] transition-transform duration-200 hover:scale-[1.02] dark:invert"
        src="/images/logo.svg"
        alt="Park Yunha Logo"
      />
    </Link>
  );
}

export default function NavBar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <aside>
      <div className="content-container mb-2">
        <div>
          <Logo />
        </div>
        <nav
          className="relative flex scroll-pr-6 items-start overflow-hidden px-4 pb-0 laptop:flex-col laptop:overflow-auto laptop:px-0"
          id="nav"
        >
          <div className="relative my-2 flex flex-row items-center laptop:mt-0">
            {navItems.map(({ name, path }, index) => {
              const isActive = path === pathname;
              return (
                <Link
                  href={path}
                  key={path}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 animate-[fade-in-up_0.5s_ease-out_both] ${
                    isActive
                      ? "font-semibold text-stone-900 dark:text-neutral-100"
                      : "text-stone-400 hover:text-stone-700 hover:bg-stone-50 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-800"
                  }`}
                  style={{ animationDelay: `${100 + index * 80}ms` }}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-md bg-stone-100 ring-1 ring-stone-200/60 dark:bg-neutral-800 dark:ring-neutral-700/60 animate-[pill-in_0.25s_ease-out_both]" />
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
