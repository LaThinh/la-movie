import Loading from "@/app/components/Loading";
import MovieGenres from "@/app/components/movie/MovieGenres";
import MovieGrid from "@/app/components/movie/MovieGrid";
import MovieGridScrollInfinite from "@/app/components/movie/MovieGridScrollInfinite";
import { IMovieListPage } from "@/app/interfaces";
import { getDiscoverMovieGenres, getMovieGenre } from "@/app/lib/fetchMovie";
import { IGenre } from "@/app/lib/interfaces";
import React, { Suspense } from "react";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
	const lang = params.lang || "en";
	const movieGenres: IGenre[] = await getMovieGenre(lang);
	const paths = movieGenres.map((movieGenre) => movieGenre.id);

	// console.log(paths);
	return paths;
}

export default async function MovieGenre({
	params,
}: {
	params: { lang: string; id: string };
}) {
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
			<Suspense fallback={<Loading text="Loading Movies" />}>
				{currentGenre && <h1 className="page-title my-5">Movies {currentGenre?.name}</h1>}

				{movieGenres && (
					<div className="wrapper px-3 flex flex-col gap-8 m-auto w-full max-w-screen-2xl">
						<div className="toolbar">
							<MovieGenres
								genres={movieGenres}
								lang={lang}
								displayAll
								activeId={params.id}
							/>
						</div>

						<div className="movie-grid ">
							{/* <MovieGrid movieList={genreMovies.results} /> */}
							<MovieGridScrollInfinite
								type="Genre"
								genreId={genreId}
								lang={lang}
								MovieItem={genreMovies.results}
								pageParam={true}
							/>
						</div>
					</div>
				)}
			</Suspense>
		</div>
	);
}
