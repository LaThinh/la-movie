import Head from "next/head";
import Image from "next/image";
import { Metadata } from "next";
import { IMovieListPage, ITrending } from "../interfaces";
import { getPopular, getTrending } from "../api/FetchMovieDB";
import CarouselSliderMovie from "../components/movie/CarouselSliderMovie";
import MovieGridScrollInfinite from "@/app/components/movie/MovieGridScrollInfinite";
import TrendingMovie from "@/app/components/block/TrendingMovie";
import { getMoviePopular, getMovieTrending } from "@/app/lib/fetchMovie";
import MovieNowPlaying from "@/app/components/block/MovieNowPlaying";

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
	title: "La Movies | Review Film Hot",
	description: "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function HomePage() {
	const dataTrending: ITrending = (await getTrending(1)) || null;
	const dataPopular: IMovieListPage = await getPopular({});
	// console.log(dataPopular.results[0]);

	const lang = "en";

	const dataTrendingDay = await getMovieTrending({ time: "day", lang: "en" });
	const dataTrendingWeek = await getMovieTrending({ time: "week", lang: "en" });
	const dataMoviePlaying = await getMoviePopular({ lang });

	return (
		<div className="home-page main">
			<MovieNowPlaying dataMovie={dataMoviePlaying.results} lang={lang} />
			<h1 className="page-title font-bold my-5">Welcome to La Movies</h1>
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
				<MovieGridScrollInfinite type="Popular" fromPage={1} toPage={5} />
			</div>
		</div>
	);
}
