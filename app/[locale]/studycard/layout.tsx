import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/app/components/themeToggle";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

function AppNav() {
  const t = useTranslations("nav");

  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/studycard"
          className="text-lg font-bold tracking-tight text-fg"
        >
          StudyCard
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/studycard#features"
            className="hidden text-fg-muted transition-colors hover:text-fg tablet:inline"
          >
            {t("features")}
          </Link>
          <Link
            href="/studycard/privacy"
            className="hidden text-fg-muted transition-colors hover:text-fg tablet:inline"
          >
            {t("privacy")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default async function StudyCardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AppNav />
      <div className="flex-1">{children}</div>
    </>
  );
}
