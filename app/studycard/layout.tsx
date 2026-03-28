import Link from "next/link";
import ThemeToggle from "@/app/components/themeToggle";

function AppNav() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/studycard"
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          StudyCard
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/studycard#features"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Features
          </Link>
          <Link
            href="/studycard/privacy"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Privacy
          </Link>
          <Link
            href="/"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default function StudyCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNav />
      <div className="flex-1">{children}</div>
    </>
  );
}
