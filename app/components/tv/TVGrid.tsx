import { ITVItem } from "@/app/lib/interfaces";
import React from "react";
import TVCard from "./TVCard";

export default function TVGrid({ TVItems, lang }: { TVItems: ITVItem[]; lang?: string }) {
	console.log(TVItems.length);
	return (
		<div className="movie-container @container">
			<div
				className="movie-grid grid grid-cols-1 gap-2
                    @xs:grid-cols-2 @xs:gap-3 
                    @2xl:grid-cols-3 @3xl:gap-4
                    @4xl:grid-cols-4 @5xl:gap-5 
                    @6xl:grid-cols-5 @6xl:gap-6 
                    @7xl:grid-cols-5 #7xl:gap-6"
			>
				{TVItems?.length > 0 &&
					TVItems.map((TVItem, index) => <TVCard tv={TVItem} key={index} lang={lang} />)}
			</div>
			<h3 className="text-lg text-gray-700 my-5">End Movie Grid Page</h3>
		</div>
	);
}
