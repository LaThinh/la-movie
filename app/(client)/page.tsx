import Head from "next/head";
import Image from "next/image";
import { Metadata } from "next";
import { IMovieListPage, ITrending } from "../interfaces";
import { getPopular, getTrending } from "../api/FetchMovieDB";
import CarouselSliderMovie from "../components/movie/CarouselSliderMovie";
import MovieGridScrollInfinite from "@/app/components/movie/MovieGridScrollInfinite";
import TrendingMovie from "@/app/components/block/TrendingMovie";
import { getMovieTrending } from "@/app/lib/fetchMovie";

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
				revalidate: 7200,
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
	const dataPopular: IMovieListPage = await getPopular({});
	// console.log(dataPopular.results[0]);

	const dataTrendingDay = await getMovieTrending({ time: "day", lang: "en" });
	const dataTrendingWeek = await getMovieTrending({ time: "week", lang: "en" });

	return (
		<div className="home-page main">
			{/* <h1 className="text-c-blue-light font-script text-3xl lg:text-4xl xl:text-5xl my-5 lg:my-10">
				<span
					className="animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] 
    bg-[200%_auto] bg-clip-text text-transparent"
				>
					Welcome to La Movies
				</span>
			</h1> */}
			<div className="">{/* <CarouselSliderMovie movieList={dataPopular} /> */}</div>

			<div className="home-sections w-full m-auto p-3 lg:p-6 max-w-screen-2xl">
				<TrendingMovie
					dataDay={dataTrendingDay?.results}
					dataWeek={dataTrendingWeek?.results}
				/>
			</div>
			<div className="mx-auto py-6 lg:py-8 w-full max-w-screen-2xl px-3 md:px-5 lg:px-8">
				<h3 className="mb-10 text-center text-2xl font-bold  lg:text-3xl">
					{"Top Trending Movies"}
				</h3>
				{/* {<Trending page={"1"} />} */}
				{/* <InfiniteScrollMovie movieData={dataTrending.results} fromPage={1} /> */}
				<MovieGridScrollInfinite type="Popular" fromPage={1} toPage={7} />
			</div>
		</div>
	);
}
