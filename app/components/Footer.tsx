import Link from "next/link";
import ScrollToTopButton from "./ScrollToTop";
import SelectLanguages from "./SelectLanguages";

export default function Footer() {
	return (
		<footer className="flex w-full p-5 border-t items-center">
			<div className="container m-auto max-w-screen-2xl flex justify-between">
				<div className="copyright">
					Copyright (c) 2024 by{" "}
					<Link
						href="https://myblog.laquocthinh.com/"
						title="View My Blog"
						target="_blank"
						className=""
					>
						Thịnh La
					</Link>
				</div>
				<SelectLanguages />
			</div>
			<ScrollToTopButton />
		</footer>
	);
}
