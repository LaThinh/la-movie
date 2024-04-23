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
import { getMovieTrending } from "@/app/lib/fetchMovie";
import MovieGridScrollInfinite from "../components/movie/MovieGridScrollInfinite";

type IHomePage = {
	trendingData: ITrending;
	trendingTitle: string;
};

export const metadata: Metadata = {
	title: "Welcome to La Movies | Review Film Hot",
	description: "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function HomePage({ params }: { params: { lang: string } }) {
	const lang = params?.lang || "en";
	const page = 1;
	console.log(params);

	// const dataTrending: ITrending = await getMovieTrending({ time: "day", page, lang });
	const dataPopular: IMovieListPage = await getPopular({ lang: lang });

	return (
		<div className="home-page main">
			<h1 className="text-c-blue-light font-script text-3xl lg:text-4xl xl:text-5xl my-5 lg:my-10">
				Welcome to La Movies
			</h1>
			<div className="md:px-3 lg:px-5 2xl:px-8 !px-0">
				<CarouselSliderMovie movieList={dataPopular} lang={lang} />
			</div>
			<div className="mx-auto py-6 lg:py-8 w-full max-w-screen-2xl px-3 md:px-5 lg:px-8">
				<h3 className="mb-10 text-center text-2xl font-bold  lg:text-3xl">
					{"Top Trending Movies"}
				</h3>
				{/* {<Trending page={"1"} />} */}
				{/* <InfiniteScrollMovie fromPage={1} toPage={7} /> */}
				<MovieGridScrollInfinite type="Trending" fromPage={1} toPage={7} />
			</div>
		</div>
	);
}
