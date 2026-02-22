import Link from "next/link";

function Logo() {
  return (
    <Link href={`/`} aria-label={`Park Yunha`}>
      <img className={`h-20 w-32`} src={`/images/logo.svg`} alt="Park Yunha Logo" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto w-full tablet:w-full">
      <div className="mx-auto w-87.5 max-w-[366px] px-5 tablet:max-w-[576px] laptop:max-w-[653px] laptop:p-0">
        <div>
          <Logo />
          <ul
            className={`hidden laptop:flex laptop:flex-row justify-between text-sm text-neutral-700`}
          >
            <li className="text-neutral-400">
              <span>|</span>
            </li>
            <li className="grow text-center">
              <Link href="/">home</Link>
            </li>
            <li className="text-center text-neutral-400">
              <span>|</span>
            </li>
            <li className="grow text-center">
              <Link href="/work">work</Link>
            </li>
            <li className="text-center text-neutral-400">
              <span>|</span>
            </li>
            <li className="grow text-center">
              <Link href="/blog">blog</Link>
            </li>
            <li className="text-neutral-400">
              <span>|</span>
            </li>
          </ul>
          <ul className={`block laptop:hidden text-sm text-neutral-800`}>
            <hr className="my-2 border-neutral-300" />
            <li>
              <Link href="/">home</Link>
            </li>
            <hr className="my-2 border-neutral-300" />
            <li>
              <Link href="/work">work</Link>
            </li>
            <hr className="my-2 border-neutral-300" />
            <li>
              <Link href="/blog">blog</Link>
            </li>
            <hr className="my-2 border-neutral-300" />
          </ul>
        </div>
        <div className="py-4 pb-5 text-sm text-gray-500">
          Copyright &copy; {new Date().getFullYear()} PARK YUNHA
        </div>
      </div>
    </footer>
  );
}
