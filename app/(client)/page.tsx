import Image from "next/image";
import { IMovieListPage, ITrending } from "../interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Trending from "../components/Trending";
import Head from "next/head";
import { Metadata } from "next";
import ScrollLoadMore from "../components/InfiniteScrollMovie";
import InfiniteScrollMovie from "../components/InfiniteScrollMovie";
import { getPopular, getTrending } from "../api/FetchMovieDB";
import CarouselSliderMovie from "../components/movie/CarouselSliderMovie";

async function getData() {
	var language = "en-EN" || "vi-VN";
	language = "vi-VN";

	const res = await fetch(
		`https://api.themoviedb.org/3/trending/movie/day?language=${language}&page=1`,
		{
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.THE_MOVIE_DATABASE_API as string,
			},
			next: {
				revalidate: 10,
			},
		}
	);

	return res.json();
}

type IHomePage = {
	trendingData: ITrending;
	trendingTitle: string;
};

export const metadata: Metadata = {
	title: "Welcome to La Movies | Review Film Hot",
	description: "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function HomePage() {
	//const data: ITrending = await getData();
	//console.log(data.results[0]);
	console.log("Get data trending homepage");
	const dataTrending: ITrending = (await getTrending(1)) || null;
	// console.log(dataTrending.results[0]);

	console.log("Get Movie Popular");
	const dataPopular: IMovieListPage = await getPopular();
	// console.log(dataPopular.results[0]);

	return (
		<div className="home-page main">
			<h1 className="text-c-blue-light font-script text-3xl lg:text-4xl xl:text-5xl my-5 lg:my-10">
				Welcome to La Movies
			</h1>
			<div className="md:px-3 lg:px-5 2xl:px-8">
				<CarouselSliderMovie movieList={dataPopular} />
			</div>
			<div className="mx-auto py-6 lg:py-8 w-full max-w-screen-2xl px-3 md:px-5 lg:px-8">
				<h3 className="mb-10 text-center text-2xl font-bold  lg:text-3xl">
					{"Top Trending Movies"}
				</h3>
				{/* {<Trending page={"1"} />} */}
				<InfiniteScrollMovie movieData={dataTrending.results} fromPage={1} />
			</div>
		</div>
	);
}
