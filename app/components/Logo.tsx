import Image from "next/image";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Park Yunha">
      <Image
        className={className}
        src="/images/logo.svg"
        alt="Park Yunha Logo"
        width={479}
        height={98}
      />
    </Link>
  );
}
