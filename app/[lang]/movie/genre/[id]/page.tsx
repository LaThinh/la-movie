import { getMovieListQuery } from "@/app/api/FetchMovieDB";
import MovieGenres from "@/app/components/movie/MovieGenres";
import MovieGrid from "@/app/components/movie/MovieGrid";
import { IMovieListPage } from "@/app/interfaces";
import { getDiscoverMovieGenres, getMovieGenre } from "@/app/lib/fetchMovie";
import { IGenre } from "@/app/lib/interfaces";
import React from "react";

export default async function MovieGenre({
	params,
}: {
	params: { lang: string; id: string };
}) {
	console.log(params.id);
	const lang = params.lang || "en";
	const genreId = params.id || "1";

	const movieGenres: IGenre[] = await getMovieGenre(lang);
	const genreMovies: IMovieListPage = await getDiscoverMovieGenres({
		genreId: genreId,
		language: lang,
		page: "1",
	});

	const currentGenre = movieGenres.find((genre) => genre.id == genreId);

	return (
		<div className="movie-page flex flex-1 flex-col gap-6 container m-auto max-w-screen-2xl">
			<h1 className="page-title my-5">Movies {currentGenre?.name}</h1>

			<div className="wrapper px-3 flex flex-col gap-8 m-auto w-full max-w-screen-2xl">
				<div className="toolbar">
					<MovieGenres genres={movieGenres} lang={lang} displayAll activeId={params.id} />
				</div>

				<div className="movie-grid ">
					<MovieGrid movieList={genreMovies.results} />
				</div>
			</div>
		</div>
	);
}
