import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full p-5 bg-gray-500/5">
      <div className="container m-auto">
        <div className="copyright m-auto text-center">
          Copyright (c) 2024 by{" "}
          <Link
            href="https://www.facebook.com/lathinh"
            title="View Facebook"
            target="_blank"
          >
            Thịnh La
          </Link>
        </div>
      </div>
    </footer>
  );
}
