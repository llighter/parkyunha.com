import Link from "next/link";

function Logo() {
  return (
    <Link href={`/`} aria-label={`Park Yunha`}>
      <img className={`h-24 w-28`} src={`/images/logo.svg`} />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="my-f mx-auto w-87.5 max-w-[366px] tablet:w-full tablet:max-w-screen-tablet_inner laptop:max-w-screen-laptop_inner bg-blue-100">
      <div>
        <Logo />
        <ul className="text-sm font-semibold tablet:flex laptop:flex">
          <li><a href="/">home</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="/blog">blog</a></li>
        </ul>
      </div>
      <div className="text-sm text-gray-500 py-4 pb-5">Copyright &copy; 2023 YUNHA INDUSTRIES</div>
    </footer>
  )
}