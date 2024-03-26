"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function NavMenu() {
	const params = useParams();

	let lang = params?.lang;

	if (!lang && typeof window !== "undefined") {
		lang = localStorage.getItem("lang") || "en";
	}
	lang = lang?.toString();

	return (
		<>
			<Link
				href={`/${lang}`}
				className="font-script text-3xl p-3 font-bold  text-white hover:text-yellow-400"
			>
				La <span className=" ">Movie</span>
			</Link>
			<nav className="gap-5 lg:gap-8 xl:gap-10  text-white font-bold text-xl hidden md:flex">
				<Link href={`/${lang}`} prefetch>
					Home
				</Link>
				<Link href={`/${lang}/about`}>About</Link>
				<Link href={`/${lang}/movie`}>Movie</Link>
				<Link href={`/${lang}/movie/genre`}>Genre</Link>
				<Link href={`/${lang}/search`}>Search</Link>
				{/* <Link href="/dashboard">Dashboard</Link> */}
			</nav>
		</>
	);
}
