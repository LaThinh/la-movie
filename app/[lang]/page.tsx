import Image from "next/image";
import { IMovieListPage, ITrending } from "../interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import Trending from "../components/Trending";
import Head from "next/head";
import { Metadata } from "next";
import ScrollLoadMore from "../components/InfiniteScrollMovie";
import InfiniteScrollMovie from "../components/InfiniteScrollMovie";
import { getPopular, getTrending } from "../api/FetchMovieDB";
import CarouselSliderMovie from "../components/movie/CarouselSliderMovie";
import {
	getMovieNowPlaying,
	getMoviePopular,
	getMovieTrending,
} from "@/app/lib/fetchMovie";
import MovieGridScrollInfinite from "../components/movie/MovieGridScrollInfinite";
import TrendingMovie from "@/app/components/block/TrendingMovie";
import MovieNowPlaying from "@/app/components/block/MovieNowPlaying";

type IHomePage = {
	trendingData: ITrending;
	trendingTitle: string;
};

export const metadata: Metadata = {
	title: "Welcome to La Movie",
	description: "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function HomePage({ params }: { params: { lang: string } }) {
	let lang = "en";
	if (params?.lang) {
		const paramLang = params.lang;
		if (paramLang.length > 0 && paramLang.length < 3) {
			lang = paramLang;
		}
	}
	const dataPopular: IMovieListPage = await getPopular({ lang: lang });

	const dataTrendingDay = await getMovieTrending({ time: "day", lang });
	const dataTrendingWeek = await getMovieTrending({ time: "week", lang });

	const dataMoviePlaying = await getMoviePopular({ lang });

	return (
		<div className="home-page main bg-gradient-to-r from-gray-200 to-gray-50 dark:from-slate-800 dark:to-slate-700">
			<MovieNowPlaying dataMovie={dataMoviePlaying.results} lang={lang} />
			<h1 className="page-title font-bold my-5">Welcome to La Movies</h1>
			<div className="home-sections w-full m-auto p-3 lg:p-6 max-w-screen-2xl">
				<TrendingMovie
					language={lang}
					dataDay={dataTrendingDay?.results}
					dataWeek={dataTrendingWeek?.results}
				/>
			</div>

			{/* <div className="md:px-3 lg:px-5 2xl:px-8 !px-0">
				<CarouselSliderMovie movieList={dataPopular} lang={lang} />
			</div> */}
			<div className="mx-auto py-6 lg:py-8 w-full max-w-screen-2xl px-3 md:px-5 lg:px-8">
				<h3 className="text-center text-2xl lg:text-3xl">{"Top Popular Movies"}</h3>
				{/* {<Trending page={"1"} />} */}
				{/* <InfiniteScrollMovie fromPage={1} toPage={7} /> */}
				<MovieGridScrollInfinite
					type="Popular"
					MovieItem={dataPopular?.results}
					lang={lang}
					fromPage={1}
					toPage={5}
				/>
			</div>
		</div>
	);
}
