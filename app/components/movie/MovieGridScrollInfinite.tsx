"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "@nextui-org/react";
import { IMovieItem } from "@/app/interfaces";
import {
	getDiscoverMovieGenres,
	getMoviePopular,
	getMovieTrending,
} from "@/app/lib/fetchMovie";
import CardMovie from "@/app/components/movie/CardMovie";

type MovieGridScroll = {
	type: "Popular" | "Trending" | "Genre";
	MovieItem?: IMovieItem[];
	lang?: string;
	genreId?: string;
	fromPage?: number;
	toPage?: number;
	pageParam?: boolean;
};

export default function MovieGridScrollInfinite(props: MovieGridScroll) {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lang = params?.lang?.toString() || props.lang || "en";

	const fromPage = searchParams.get("page")
		? Number(searchParams.get("page"))
		: props.fromPage;
	const toPage = props.toPage || 5;

	const [page, setPage] = useState<number>(fromPage || 1);
	const [movieList, setMovieList] = useState<IMovieItem[]>([]);
	const [loading, setLoading] = useState(true);
	//const maxPage = toPage ? toPage : (fromPage || 1) + 5;

	const { ref } = useInView({
		onChange(inView, entry) {
			if (inView && !loading && page < toPage) {
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
					data = await getMovieTrending({ page: page, time: "day", lang: lang });
					break;

				case "Popular":
					data = await getMoviePopular({ page: page, lang: lang });
					break;

				case "Genre":
					data = await getDiscoverMovieGenres({
						genreId: props?.genreId || "16",
						language: lang,
						page: page.toString(),
						//sort_by: "popularity.asc",
					});
					break;
				default:
					data = await getMoviePopular({ page: page, lang: lang });
					break;
			}
			//data = await getTVPopular({ page: page, lang: lang });
			//console.log(data?.results);
			if (movieList.length < 1) setMovieList(data?.results);
			else {
				setMovieList((prevList) => [...prevList, ...data?.results]);
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (page === 1 && props?.MovieItem) {
			setMovieList(props.MovieItem);
		} else {
			loadMoreData(page);
		}
	}, []);

	useEffect(() => {
		loadMoreData(page);

		if (props.pageParam) {
			const newPath = pathname + "?" + createQueryString("page", page.toString());
			// router.push(newPath);
			window.history.replaceState(null, "", newPath);
		}
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
				{movieList &&
					movieList?.length > 0 &&
					movieList.map((movie, index) => (
						<CardMovie movie={movie} key={index} lang={lang} />
					))}
			</div>
			{/* <h3 className="text-lg hidden text-gray-700 my-5">End Trending page {page}</h3> */}
			<Button
				className="load-more mt-10 mb-5 px-8 py-2 rounded-full"
				ref={ref}
				size="lg"
				color="primary"
				radius="lg"
				onClick={handleLoadMore}
				disabled={loading}
				isLoading={loading}
				spinnerPlacement="end"
			>
				{loading ? `Loading movie page ${page}` : `Load more page ${page + 1}`}
			</Button>
		</div>
	);
}
