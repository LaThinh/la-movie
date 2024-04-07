"use client";
import { ITVItem } from "@/app/lib/interfaces";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TVCard from "./TVCard";
import { Button } from "@nextui-org/react";
import {
	getDiscoverTvGenres,
	getTVPopular,
	getTVTrending,
	getTvGenre,
} from "@/app/lib/fetchTv";

type TVGridScroll = {
	type: "Popular" | "Air Today" | "Top Rated" | "Trending" | "Genre";
	TVItems?: ITVItem[];
	lang?: string;
	fromPage?: number;
	toPage?: number;
	genreId?: string;
};

export default function TVGridScrollInfinite(props: TVGridScroll) {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lang = params?.lang?.toString() || props.lang || "en";

	const fromPage = searchParams.get("page")
		? Number(searchParams.get("page"))
		: props.fromPage;
	const toPage = props.toPage;

	const [page, setPage] = useState<number>(fromPage || 1);
	const [tvList, setTvList] = useState<ITVItem[]>([]);
	const [loading, setLoading] = useState(true);
	const maxPage = toPage ? toPage : (fromPage || 1) + 3;

	const { ref } = useInView({
		onChange(inView, entry) {
			if (inView && !loading && page < maxPage) {
				setPage(page + 1);
			}
		},
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const loadMoreData = async (page: number) => {
		console.log("Load more " + props.type + " page " + page);
		try {
			setLoading(true);
			let data: any;
			switch (props.type) {
				case "Trending":
					data = await getTVTrending({ page: page, time: "day", lang: lang });
					break;

				case "Genre":
					data = await getDiscoverTvGenres({
						genreId: props?.genreId || "16",
						language: lang,
						page: page.toString(),
						// sort_by: "first_air_date.desc",
					});
					break;
				default:
					data = await getTVPopular({ page: page, lang: lang });
					break;
			}
			//data = await getTVPopular({ page: page, lang: lang });
			//console.log(data?.results);
			if (tvList.length < 1) setTvList(data?.results);
			else {
				setTvList((prevList) => [...prevList, ...data?.results]);
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (page === 1 && props?.TVItems) {
			setTvList(props?.TVItems);
		} else {
			loadMoreData(page);
		}
	}, []);

	useEffect(() => {
		loadMoreData(page);
		//searchParam.set("page", page);
		const newPath = pathname + "?" + createQueryString("page", page.toString());
		// router.push(newPath);
		window.history.replaceState(null, "", newPath);
	}, [page]);

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	return (
		<div className="tv-grid-container @container">
			<div className="page sticky top-[97%] left-auto right-2 z-[500] w-20 bg-white px-2 py-1 rounded-full">
				Page {page}
			</div>
			<div
				className="movie-grid grid grid-cols-1 gap-2
                            @xs:grid-cols-2 @xs:gap-3 
                            @2xl:grid-cols-3 @3xl:gap-4
                            @4xl:grid-cols-4 @5xl:gap-5 
                            @6xl:grid-cols-5 @6xl:gap-6"
			>
				{tvList &&
					tvList?.length > 0 &&
					tvList.map((item, index) => <TVCard tv={item} key={index} lang={lang} />)}
			</div>
			<h3 className="text-lg hidden text-gray-700 my-5">End Trending page {page}</h3>
			<Button
				className="load-more mt-10 mb-5 px-5 py-2"
				ref={ref}
				size="lg"
				color="primary"
				radius="lg"
				onClick={handleLoadMore}
				disabled={loading}
				isLoading={loading}
				spinnerPlacement="end"
			>
				{loading ? `Loading page ${page}` : `Load more page ${page + 1}`}
			</Button>
		</div>
	);
}
