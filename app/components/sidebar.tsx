"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate } from "animejs";

type NavItem = {
  name: string;
  x: number;
  y: number;
  w: string;
};

const navItems: { [key: string]: NavItem } = {
  "/": {
    name: "home",
    x: 1,
    y: 0,
    w: "60px",
  },
  "/work": {
    name: "work",
    x: 64,
    y: 35,
    w: "60px",
  },
  "/blog": {
    name: "blog",
    x: 121,
    y: 69,
    w: "60px",
  },
};

function Logo() {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Gentle logo entrance animation
    if (logoRef.current) {
      logoRef.current.style.willChange = "transform, opacity";

      animate(logoRef.current, {
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 800,
        ease: "outQuart",
        delay: 100,
      });

      // Subtle hover animation
      logoRef.current.addEventListener("mouseenter", () => {
        animate(logoRef.current, {
          scale: 1.02,
          duration: 200,
          ease: "outQuad",
        });
      });

      logoRef.current.addEventListener("mouseleave", () => {
        animate(logoRef.current, {
          scale: 1,
          duration: 200,
          ease: "outQuad",
        });
      });
    }
  }, []);

  return (
    <Link href="/" aria-label="Park Yunha">
      <img
        ref={logoRef}
        className="h-20 w-36"
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

  const navRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    // Simple stagger animation for nav items entrance
    if (navLinksRef.current.length > 0) {
      navLinksRef.current.forEach((el) => {
        if (el) el.style.willChange = "transform, opacity";
      });

      animate(navLinksRef.current, {
        translateY: [15, 0],
        opacity: [0, 1],
        delay: (_, i) => 300 + i * 80,
        duration: 600,
        ease: "outQuart",
      });
    }
  }, []);

  useEffect(() => {
    // Smooth slide animation for active indicator when pathname changes
    if (activeIndicatorRef.current && navItems[pathname]) {
      animate(activeIndicatorRef.current, {
        translateX: navItems[pathname].x,
        translateY: "-50%",
        width: navItems[pathname].w,
        duration: 300,
        ease: "outQuint",
      });
    }
  }, [pathname]);

  const handleNavHover = (element: HTMLAnchorElement, isEntering: boolean) => {
    animate(element, {
      scale: isEntering ? 1.05 : 1,
      duration: 150,
      ease: "outQuad",
    });

    // Add subtle summer-themed ripple effect on hover
    if (isEntering) {
      const ripple = document.createElement("div");
      ripple.className = "absolute inset-0 rounded-full opacity-10";
      ripple.style.background =
        "radial-gradient(circle, #87CEEB 0%, #B0E0E6 100%)";
      ripple.style.transform = "scale(0)";
      ripple.style.pointerEvents = "none";
      element.style.position = "relative";
      element.appendChild(ripple);

      animate(ripple, {
        scale: [0, 1.5],
        opacity: [0.1, 0],
        duration: 600,
        ease: "outQuad",
        complete: () => ripple.remove(),
      });
    }
  };

  return (
    <aside>
      <div className="content-container mb-2">
        <div>
          <Logo />
        </div>
        <nav
          ref={navRef}
          className="laptop:flex-col laptop:overflow-auto laptop:px-0 relative flex scroll-pr-6 items-start overflow-hidden px-4 pb-0"
          id="nav"
        >
          <div className="laptop:mt-0 relative my-2 flex flex-row items-center pr-10">
            {navItems[pathname] ? (
              <div className="block">
                <div
                  ref={activeIndicatorRef}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: `translateX(${navItems[pathname].x}px) translateY(-50%)`,
                    zIndex: -1,
                    height: "36px",
                    borderRadius: "0.375rem",
                    background:
                      "linear-gradient(135deg, #87CEEB 0%, #87CEFA 50%, #B0E0E6 100%)",
                    boxShadow:
                      "0 4px 20px rgba(135, 206, 235, 0.4), 0 0 15px rgba(135, 206, 250, 0.3)",
                    width: navItems[pathname].w,
                    willChange: "transform, width",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
            ) : null}

            {Object.entries(navItems).map(([path, { name }], index) => {
              const isActive = path === pathname;

              return (
                <Link
                  href={path}
                  key={path}
                  ref={(el) => {
                    if (el) navLinksRef.current[index] = el;
                  }}
                  className={`relative inline-block overflow-hidden px-3 py-2 text-center transition-all hover:text-neutral-800 ${
                    isActive
                      ? "font-semibold text-neutral-800"
                      : "text-neutral-600"
                  }`}
                  onMouseEnter={(e) => handleNavHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleNavHover(e.currentTarget, false)}
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
