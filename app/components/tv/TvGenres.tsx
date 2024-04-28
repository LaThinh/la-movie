import { IGenre } from "@/app/lib/interfaces";
import Link from "next/link";
import React from "react";

export default function TvGenres({
	genres,
	lang,
	size,
	displayAll,
	activeId,
}: {
	genres: IGenre[];
	lang: string;
	size?: "sm" | "md" | "lg";
	displayAll?: boolean;
	activeId?: string;
}) {
	const showAll = displayAll || false;
	const btnSize = size || "md";
	const selectId = activeId || "all";

	let classSize = `text-${btnSize} px-3 py-[5px]`;
	const classActive = `text-white border-primary-500 bg-primary-500`;

	switch (btnSize) {
		case "sm":
			classSize = `text-${btnSize} px-2 py`;
		case "md":
		case "lg":
	}

	if (genres.length < 1) {
		return <></>;
	}
	return (
		<div className="genres flex gap-2 flex-wrap justify-center">
			{showAll && (
				<Link
					href={`/${lang}/tv/genre`}
					className={`genre-link border border-gray-400 rounded-full  
                        text-gray-500 font-semibold transition
                        hover:text-white hover:border-primary-500 hover:bg-primary-500
                        ${selectId == "all" ? classActive : ""}
                        ${classSize}`}
					prefetch={false}
				>
					All Genres
				</Link>
			)}
			{genres.map((genre) => (
				<Link
					href={`/${lang}/tv/genre/${genre.id}`}
					key={genre.id}
					className={`genre-link border border-gray-400 rounded-full  
                            text-gray-500 font-semibold transition
                            hover:text-white hover:border-primary-500 hover:bg-primary-500
                            ${genre.id == selectId ? classActive : ""}
                            ${classSize}`}
				>
					{genre?.name}
				</Link>
			))}
		</div>
	);
}
