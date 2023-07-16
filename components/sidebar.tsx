"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
    x: 0,
    y: 0,
    w: "64px",
  },
  "/about": {
    name: "about",
    x: 60,
    y: 35,
    w: "65px",
  },
  "/blog": {
    name: "blog",
    x: 120,
    y: 69,
    w: "56px",
  },
};

function Logo() {
  return (
    <Link href={`/`} aria-label={`Park Yunha`}>
      <img className={`h-20 w-36`} src={`/images/logo.svg`} />
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
      <div
        className={`mx-auto mb-4 w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner`}
      >
        <div>
          <Logo />
        </div>
        <nav
          className={`relative flex scroll-pr-6 items-start overflow-hidden px-4 pb-0 laptop:flex-col laptop:overflow-auto laptop:px-0`}
          id={`nav`}
        >
          <div className={`my-2 flex flex-row space-x-0 pr-10 laptop:mt-0`}>
            {navItems[pathname] ? (
              <>
                {/*  Desktop version, hidden on mobile, animates y axis */}
                {/*<div className="hidden laptop:block">*/}
                {/*  <motion.div*/}
                {/*    className={`absolute z-[-1] h-[34px] rounded-md bg-neutral-100`}*/}
                {/*    initial={{ opacity: 0, y: navItems[pathname].y }}*/}
                {/*    animate={{*/}
                {/*      opacity: 1,*/}
                {/*      y: navItems[pathname].y,*/}
                {/*      width: navItems[pathname].w,*/}
                {/*    }}*/}
                {/*    transition={{*/}
                {/*      type: "spring",*/}
                {/*      stiffness: 350,*/}
                {/*      damping: 30,*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*  Mobile version, hidden on desktop, animates x axis */}
                <div className={`block`}>
                  <motion.div
                    className={`absolute z-[-1] h-[34px] rounded-md bg-neutral-100`}
                    initial={{ opacity: 0, x: navItems[pathname].x }}
                    animate={{
                      opacity: 1,
                      x: navItems[pathname].x,
                      width: navItems[pathname].w,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
              </>
            ) : null}

            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;

              return (
                <Link
                  href={path}
                  key={path}
                  className={`px-[10px] py-[5px] transition-all hover:text-neutral-800`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
