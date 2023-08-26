import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import UserMenu from "@/app/components/UserMenu";

export default function Header() {
  //const router = useRouter();
  //console.log(router.query);

  return (
    <header
      className="flex sticky top-0 z-30 justify-between items-center px-3
    lg:px-10 py-1 bg-primary-400 dark:bg-black"
    >
      <div className="header-container max-w-screen-2xl flex justify-between items-center w-full m-auto">
        <Link
          href="/"
          className="font-script text-3xl p-3 font-bold  text-white hover:text-yellow-400"
        >
          La <span className=" ">Movie</span>
        </Link>
        <nav className="gap-5 lg:gap-8 xl:gap-10  text-white font-bold text-xl hidden md:flex">
          <Link href="/" prefetch>
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href="/movie">Movie</Link>
          <Link href="/genre/12">Genre</Link>
          {/* <Link href="/dashboard">Dashboard</Link> */}
        </nav>

        <div className="settings flex gap-3 justify-end items-center w-28">
          <ThemeSwitcher />
          {/* <UserMenu /> */}
        </div>
      </div>
    </header>
  );
}
