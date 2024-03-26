import React from "react";
import { getLanguages } from "@/app/lib/fetchData";
import { getMovieGenre } from "@/app/lib/fetchMovie";
import { IGenre } from "@/app/lib/interfaces";
import Link from "next/link";
import MovieGenres from "@/app/components/movie/MovieGenres";
import InfiniteScrollMovie from "@/app/components/InfiniteScrollMovie";

// import SelectLanguages from "@/app/components/SelectLanguages";
// import dynamic from "next/dynamic";
// import { ILanguage } from "@/app/lib/interfaces";
// const SelectLanguages = dynamic(() => import("@/app/components/SelectLanguages"), { ssr: false });

export default async function MoviePage({ params }: { params: { lang: string } }) {
	const lang = params.lang || "en";

	const movieGenres: IGenre[] = await getMovieGenre(lang);

	return (
		<div className="movie-page flex flex-1 flex-col gap-6 container m-auto max-w-screen-2xl">
			<h1 className="page-title">Movies Page</h1>

			<div className="wrapper">
				<div className="toolbar">
					<MovieGenres genres={movieGenres} lang={lang} displayAll />
				</div>
			</div>

			<InfiniteScrollMovie fromPage={1} toPage={10} />
		</div>
	);
}
