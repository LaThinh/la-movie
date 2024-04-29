"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const menus = [
	// {
	// 	href: "/",
	// 	title: "Home",
	// 	title_vn: "Trang chủ",
	// },

	{
		href: "/movie",
		title: "Movie",
		title_vn: "Phim",
	},
	{
		href: "/tv",
		title: "TV",
		title_vn: "TV",
	},
	{
		href: "/person",
		title: "People",
		title_vn: "Diễn viên",
	},
	{
		href: "/about",
		title: "About",
		title_vn: "Giới thiệu",
	},
	// {
	// 	href: "/movie/genre",
	// 	title: "Genre",
	// 	title_vn: "Thể loại",
	// },
	{
		href: "/search",
		title: "Search",
		title_vn: "Tìm kiếm",
	},
];
export default function NavMenu() {
	let lang = "en"; //Set value default
	const params = useParams();
	if (params?.lang) {
		lang = params.lang.toString();
	} else if (typeof window !== "undefined") {
		const localLang = localStorage.getItem("lang");
		if (localLang) lang = localLang.toString();
	}

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			<Link
				href={`/${lang}`}
				className="logo font-script font-bold 
				text-3xl text-white hover:text-yellow-400"
			>
				<Image
					src="/la-movie.svg"
					width="180"
					height="60"
					alt="La Movie"
					className="aspect-[18/6]"
				/>
			</Link>
			<nav className="flex-1 justify-center gap-5 lg:gap-8 xl:gap-10 font-bold text-xl hidden md:flex">
				{/* <Link href={`/${lang}/about`}>About</Link>
				<Link href="/dashboard">Dashboard</Link> */}
				{isClient &&
					menus.map((menu) => (
						<Link
							key={menu.href}
							href={`/${lang}${menu.href}`}
							className="capitalize text-nowrap"
							prefetch={false}
						>
							{lang === "vi" ? menu.title_vn : menu.title}
						</Link>
					))}
			</nav>
		</>
	);
}
