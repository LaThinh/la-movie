"use client";
import { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  //const router = useRouter();
  //console.log(router.query);

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center px-10 py-1 bg-primary-400 dark:bg-black">
      <div className="header-container max-w-screen-2xl flex justify-between items-center w-full m-auto">
        <Link
          href="/"
          className="font-script text-3xl p-3 font-bold text-blue-500 text-white hover:text-yellow-400"
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

        <div className="settings flex gap-3 justify-center items-center w-16">
          <ThemeSwitcher />
          <Link className="login text-white w-[140px] text-right" href="login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
