"use client";

import { getMovieTrending } from "@/app/lib/fetchMovie";
import React, { useEffect, useState } from "react";

import MediaSlider from "@/app/components/media/MediaSlider";
import { IMediaItem } from "@/app/lib/interfaces";
import { fetchBaseURL } from "@/app/lib/constants";
import { fetchHeader } from "@/app/lib/fetchData";
import { Switch, Tab, Tabs } from "@nextui-org/react";

async function getMediaTrending({
	time,
	type,
	lang,
	page,
}: {
	time?: string;
	type?: "all" | "movie" | "tv" | "people";
	lang?: string;
	page?: string;
}) {
	const sLang = lang || "en";
	const sType = type || "movie";
	const sTime = time || "day";
	const sPage = page || "1";

	// const url = fetchBaseURL + "/trending/" + sType + "/" + sTime + "&language=" + sLang;
	const url = `${fetchBaseURL}/trending/${sType}/${sTime}?language=${sLang}&page=${sPage}`;

	console.log(url);

	const res = await fetch(url, {
		headers: fetchHeader,
		cache: "force-cache",
		next: { revalidate: 7200 },
	});
	const data = await res.json();

	return Response.json(data);
}

export default function TrendingMovie({
	dataDay,
	dataWeek,
	language,
}: {
	dataDay: IMediaItem[];
	dataWeek: IMediaItem[];
	language?: string;
}) {
	const lang = language || "en";

	const [time, setTime] = useState<any>("day");

	return (
		<div
			className="block-trending-movie flex flex-col gap-5 px-[10px] overflow-hidden 
		lg:p-6 lg:border lg:border-gray-200 lg:rounded-xl lg:bg-neutral-200/50 lg:backdrop-blur-xl dark:bg-slate-700/80"
		>
			<div className="block-title flex flex-wrap gap-2 items-center justify-center md:justify-between">
				<h2
					className={`block-title text-xl lg:text-2xl xl:text-3xl whitespace-nowrap ${
						time === "day" ? "text-gradient-blue" : "text-gradient-purple"
					} animate-text `}
				>
					{`Top Trending Movie ${time === "day" ? " Today" : "This Week"}`}
				</h2>
				<Tabs
					aria-label="Tabs Times"
					color={time === "day" ? "primary" : "secondary"}
					radius="full"
					selectedKey={time}
					onSelectionChange={setTime}
				>
					<Tab key="day" title="To Day" />
					<Tab key="week" title="This Week" />
				</Tabs>
			</div>

			<div className="trending-slider flex flex-col gap-5">
				<div className={`${time === "day" ? "block" : "hidden"} `}>
					<MediaSlider movieList={dataDay} size="small" autoPlay loop />
				</div>
				<div className={`${time === "week" ? "block" : "hidden"} `}>
					<MediaSlider movieList={dataWeek} size="small" loop autoPlay />
				</div>
			</div>
		</div>
	);
}
