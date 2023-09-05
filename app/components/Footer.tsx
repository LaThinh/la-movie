import Link from "next/link";
import ScrollToTopButton from "./ScrollToTop";

export default function Footer() {
  return (
    <footer className="flex w-full p-5 bg-gray-200/50">
      <div className="container m-auto">
        <div className="copyright m-auto text-center">
          Copyright (c) 2024 by{" "}
          <Link
            href="https://www.facebook.com/lathinh"
            title="View Facebook"
            target="_blank"
            className="text-primary-500"
          >
            Thịnh La
          </Link>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
}
