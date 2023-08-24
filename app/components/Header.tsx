import * as React from "react";
import Link from "next/link";

export default function Header() {
  //const router = useRouter();
  //console.log(router.query);

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center px-10 py-1 bg-c-blue">
      <div className="header-container max-w-screen-2xl flex justify-between items-center w-full m-auto">
        <Link
          href="/"
          className="font-script text-3xl p-3 font-bold text-blue-500 text-white"
        >
          La <span className=" ">Movie</span>
        </Link>
        <nav className="gap-5 text-c-blue text-white font-bold text-xl hidden md:flex">
          <Link href="/" prefetch>
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href="/movie">Movie</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <Link className="login text-white w-[140px] text-right" href="login">
          Login
        </Link>
      </div>
    </header>
  );
}
