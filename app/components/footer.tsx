import Link from "next/link";
import { Signature } from "./brand/Signature";

/** 홈은 서명(워드마크)이 맡는다 — 머리와 같이 home 은 뺀다 */
const navLinks = [
  { name: "blog", path: "/blog" },
  { name: "works", path: "/works" },
  { name: "project", path: "/project" },
];

const projectLinks = [{ name: "StudyCard", path: "/studycard" }];

export default function Footer() {
  return (
    <footer className="mx-auto w-full border-t border-line">
      {/* 머리와 같은 띠 — 폰은 본문 레인, 태블릿부터 미디어 레인 */}
      <div className="lane-text pt-10 tablet:lane-media">
        <div className="flex flex-col gap-10 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Park Yunha — 홈"
              className="flex h-20 items-center"
            >
              <Signature />
            </Link>
            <p className="mt-1 text-sm text-fg-muted">
              Dreaming to be a Developer and Entrepreneur.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <h3 className="mb-3 font-semibold text-fg">Navigate</h3>
              <ul className="space-y-2">
                {navLinks.map(({ name, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-fg">Project</h3>
              <ul className="space-y-2">
                {projectLinks.map(({ name, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line py-6 text-sm text-fg-muted">
          &copy; {new Date().getFullYear()} Park Yunha
        </div>
      </div>
    </footer>
  );
}
