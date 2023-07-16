import Link from "next/link";
import styles from "@/components/styles.module.css";

function Logo() {
  console.log(styles);

  return (
    <Link href={`/`} aria-label={`Park Yunha`}>
      <img className={`h-20 w-32`} src={`/images/logo.svg`} />
    </Link>
  );
}

export default function Footer() {
  return (
    // <div className={styles.myfoot}>
    <footer className="mx-auto w-full tablet:w-full">
      <div className="mx-auto px-5 laptop:max-w-screen-laptop_inner laptop:p-0">
        <div>
          <Logo />
          <ul
            className={`${styles.myfoot} text-sm font-semibold tablet:flex laptop:flex`}
          >
            <li>
              <a href="/">home</a>
            </li>
            <li>
              <a href="/about">about</a>
            </li>
            <li>
              <a href="/blog">blog</a>
            </li>
          </ul>
        </div>
        <div className="py-4 pb-5 text-sm text-gray-500">
          Copyright &copy; 2023 YUNHA INDUSTRIES
        </div>
      </div>
    </footer>
    // </div>
  );
}
