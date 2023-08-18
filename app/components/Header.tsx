import * as React from "react";
import Link from "next/link";

export default function Header() {
  //const router = useRouter();
  //console.log(router.query);

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center px-10 py-2 bg-gray-200">
      <Link
        href="/"
        className="font-script text-3xl p-3 font-bold text-blue-500"
      >
        La <span className=" ">Movie</span>
      </Link>
      <nav className="flex gap-5 text-c-blue font-bold text-xl">
        <Link href="/" prefetch>
          Home
        </Link>
        <Link href="/about">About</Link>
        <Link href="/movie">Movie</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>

      <Link href="login">Login</Link>
    </header>
  );
}
