import { getMovieListQuery } from "@/app/api/FetchMovieDB";
import MovieGenres from "@/app/components/movie/MovieGenres";
import MovieGrid from "@/app/components/movie/MovieGrid";
import TVGridScrollInfinite from "@/app/components/tv/TVGridScrollInfinite";
import TvGenres from "@/app/components/tv/TvGenres";
import { getDiscoverTvGenres, getTvGenre } from "@/app/lib/fetchTv";
import { IGenre, ITvListPage } from "@/app/lib/interfaces";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
	params: { lang: string; id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// fetch data
	const tvGenres: IGenre[] = await getTvGenre({ lang: params.lang });
	const currentGenre = tvGenres.find((genre) => genre.id == params.id);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: "The Movie TV Genre " + currentGenre?.name,
		openGraph: {
			images: [...previousImages],
		},
	};
}

export default async function MovieGenre({
	params,
}: {
	params: { lang: string; id: string };
}) {
	console.log(params.id);
	const lang = params.lang || "en";
	const genreId = params.id || "1";

	const tvGenres: IGenre[] = await getTvGenre({ lang: lang });
	const genreTvs: ITvListPage = await getDiscoverTvGenres({
		genreId: genreId,
		language: lang,
		page: "1",
	});

	const currentGenre = tvGenres.find((genre) => genre.id == genreId);

	return (
		<div className="movie-page flex flex-1 flex-col gap-6 container m-auto max-w-screen-2xl">
			<h1 className="page-title my-5">TV Genre: {currentGenre?.name}</h1>

			<div className="wrapper px-3 flex flex-col gap-8 m-auto w-full max-w-screen-2xl">
				<div className="toolbar">
					<TvGenres genres={tvGenres} lang={lang} displayAll activeId={params.id} />
				</div>

				<TVGridScrollInfinite
					TVItems={genreTvs.results}
					lang={lang}
					type="Genre"
					genreId={genreId}
				/>
			</div>
		</div>
	);
}
