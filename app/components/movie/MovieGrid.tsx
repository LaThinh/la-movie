"use client";

import React from "react";
import Link from "next/link";
import CardMovie from "@/app/components/movie/CardMovie";
import { IMovieItem } from "@/app/interfaces";
import { useParams } from "next/navigation";

function MovieGrid({
	movieList,
	language,
}: {
	movieList: IMovieItem[];
	language?: string;
}) {
	const data = movieList;
	const lang = language || "en";

	return (
		<div className="movie-container @container">
			<div
				className="movie-grid grid grid-cols-1 gap-2
        @xs:grid-cols-2 @xs:gap-3 
        @3xl:grid-cols-3 @3xl:gap-4
        @5xl:grid-cols-4 @5xl:gap-6 
        @7xl:grid-cols-5 #7xl:gap-8"
			>
				{data?.length > 0 &&
					data.map((movieItem, index) => (
						<CardMovie movie={movieItem} key={index} lang={lang} />
					))}
			</div>
			<h3 className="text-lg text-gray-700 my-5">End Movie Grid Page</h3>
		</div>
	);
}

export default MovieGrid;
