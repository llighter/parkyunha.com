import Link from "next/link";
import { Signature } from "./brand/Signature";

const navLinks = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "works", path: "/works" },
  { name: "project", path: "/project" },
];

const projectLinks = [{ name: "StudyCard", path: "/studycard" }];

export default function Footer() {
  return (
    <footer className="mx-auto w-full border-t border-line">
      {/* 헤더와 같은 본문 레인에 선다 (전에는 1024px 선 하나가 따로 있었다) */}
      <div className="lane-text pt-10">
        <div className="flex flex-col gap-10 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <Link
              href="/"
              aria-label="PARK YUNHA — 홈"
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
