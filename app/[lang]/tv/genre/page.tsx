import React from "react";
import { IGenre, ITVItem } from "@/app/lib/interfaces";
import InfiniteScrollMovie from "@/app/components/InfiniteScrollMovie";
import TvGenres from "@/app/components/tv/TvGenres";
import { getDiscoverTvGenres, getTVTrending, getTvGenre } from "@/app/lib/fetchTv";
import TVGridScrollInfinite from "@/app/components/tv/TVGridScrollInfinite";

// import SelectLanguages from "@/app/components/SelectLanguages";
// import dynamic from "next/dynamic";
// import { ILanguage } from "@/app/lib/interfaces";
// const SelectLanguages = dynamic(() => import("@/app/components/SelectLanguages"), { ssr: false });

export default async function MoviePage({
	params,
}: {
	params: { lang: string; id: string };
}) {
	const lang = params.lang || "en";

	const tvGenres: IGenre[] = await getTvGenre({ lang: lang });
	const dataTvGenre = await getTVTrending({ lang: lang, time: "day" });
	const TVItems: ITVItem[] = await dataTvGenre?.results;

	return (
		<div className="movie-page flex flex-1 flex-col gap-6 container m-auto max-w-screen-2xl">
			<h1 className="page-title">TV All Genres Page</h1>

			<div className="wrapper">
				<div className="toolbar">
					<TvGenres genres={tvGenres} lang={lang} displayAll />
				</div>
				<TVGridScrollInfinite TVItems={TVItems} lang={lang} type="Trending" />
			</div>
		</div>
	);
}
