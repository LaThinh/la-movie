import Link from "next/link";
import ScrollToTopButton from "./ScrollToTop";
import SelectLanguages from "./SelectLanguages";
import Image from "next/image";

export default function Footer() {
	return (
		<footer
			className="footer p-4 flex flex-col w-full border-t items-center @container
		bg-slate-50 text-gray-700 dark:bg-slate-700 dark:text-white"
		>
			<div
				className="container @container m-auto max-w-screen-2xl flex flex-wrap gap-4 justify-center
				lg:p-6"
			>
				<div className="footer-logo flex items-center flex-col gap-3">
					<Image
						src="/la-movie.svg"
						width="210"
						height="70"
						alt="La Movie"
						className="hidden dark:block aspect-[24/8]"
					/>
					<Image
						src="/la-movie-2.svg"
						width="210"
						height="70"
						alt="La Movie"
						className="block dark:hidden aspect-[24/8]"
					/>

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
				</div>

				<div className="footer-menu order-5 w-full min-w-72 flex-1 @container">
					<div className="footer-cols m-auto flex flex-wrap justify-center @md:flex-row @md:justify-evenly">
						<div className="footer-menu-links w-32 flex flex-col gap-3 ">
							{/* <h5>Links</h5> */}
							<ul className="flex flex-col gap-2">
								<li>
									<Link href="/en/about">About Us</Link>
								</li>
								<li>
									<Link href="/en/person">Peoples</Link>
								</li>
								<li>
									<Link href="/en/movie">Movies</Link>
								</li>
								<li>
									<Link href="/en/tv">TVs</Link>
								</li>
							</ul>
						</div>
						<div className="footer-menu-links w-32 flex flex-col gap-5">
							<h5>Source From TMDB</h5>
							<Link href="https://www.themoviedb.org" rel="noopener" target="_blank">
								<Image
									src="/logo-TMDB.svg"
									width="120"
									height="64"
									alt="La Movie"
									className="aspect-[300/129]"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="order-3 md:order-7">
					<SelectLanguages />
				</div>
			</div>
			<div className="footer-copyright w-full text-center"></div>
		</footer>
	);
}
