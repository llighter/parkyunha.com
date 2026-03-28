import Link from "next/link";

const navLinks = [
  { name: "home", path: "/" },
  { name: "work", path: "/work" },
  { name: "blog", path: "/blog" },
  { name: "project", path: "/project" },
];

const projectLinks = [{ name: "StudyCard", path: "/studycard" }];

function Logo() {
  return (
    <Link href={`/`} aria-label={`Park Yunha`}>
      <img
        className={`h-20 w-32 dark:invert`}
        src={`/images/logo.svg`}
        alt="Park Yunha Logo"
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto w-full border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto w-87.5 max-w-5xl px-5 pt-10 laptop:px-0">
        <div className="flex flex-col gap-10 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <Logo />
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Dreaming to be a Developer and Entrepreneur.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <h3 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
                Navigate
              </h3>
              <ul className="space-y-2">
                {navLinks.map(({ name, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
                Project
              </h3>
              <ul className="space-y-2">
                {projectLinks.map(({ name, path }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-200 py-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Park Yunha
        </div>
      </div>
    </footer>
  );
}
