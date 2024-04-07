import TVGrid from "@/app/components/tv/TVGrid";
import TVGridScrollInfinite from "@/app/components/tv/TVGridScrollInfinite";
import TvGenres from "@/app/components/tv/TvGenres";
import { IGenre } from "@/app/interfaces";
import { getTVPopular, getTVTrending, getTvGenre } from "@/app/lib/fetchTv";
import { ITVItem } from "@/app/lib/interfaces";
import React from "react";

export default async function TVPage({ params }: { params: { lang: string } }) {
	const lang = params?.lang || "en";
	const tvGenres: IGenre[] = await getTvGenre({ lang: lang });

	const data = await getTVTrending({ time: "week", page: 1, lang: lang });
	const dataPopular = await getTVPopular({ page: 1, lang: lang });
	const TVItems: ITVItem[] = await dataPopular?.results;
	//console.log(TVItems);

	return (
		<div className="tv-page container max-w-screen-2xl w-full m-auto p-3 lg:p-5">
			<h1 className="page-title text-gradient-green-2">Welcome to TVPage</h1>
			{/* <TVGrid TVItems={TVItems} lang={lang} /> */}

			<div className="wrapper flex flex-col  gap-8">
				<div className="toolbar">
					<TvGenres genres={tvGenres} lang={lang} displayAll />
				</div>

				<TVGridScrollInfinite TVItems={TVItems} lang={lang} type="Trending" />
			</div>
		</div>
	);
}
