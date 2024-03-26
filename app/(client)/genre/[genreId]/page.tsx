"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IMovieItem, IMovieListPage, IGenre } from "@/app/interfaces";
import { getAllGenres, getMovieListQuery } from "@/app/api/FetchMovieDB";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "@nextui-org/react";
import GenreList from "@/app/components/movie/GenreList";
import MovieGrid from "@/app/components/movie/MovieGrid";

export function GenreIdPage({ params }: { params: { genreId: string } }) {
	//const genreId = params?.genreId || "1";

	const [movieList, setMovieList] = useState<IMovieItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(0);
	const [genreList, setGenresList] = useState([]);
	const [genreName, setGenreName] = useState("");

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			if (!searchParams) return "";
			const params = new URLSearchParams(Array.from(searchParams.entries()));
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		const fetchList = async () => {
			const data = await getAllGenres();
			setGenresList(data?.genres);
			const genreCurrent: IGenre[] = data?.genres.filter((g: IGenre) => {
				return g.id == params.genreId;
			});
			setGenreName(genreCurrent[0].name);
		};

		if (genreList.length < 1) {
			fetchList();
		}

		const paramPage = searchParams?.get("page");
		if (paramPage && parseInt(paramPage) > 1) {
			setPage(parseInt(paramPage));
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const genreMovies: IMovieListPage = await getMovieListQuery({
				genreId: params?.genreId || "1",
				page: page.toString(),
			});
			if (genreMovies && genreMovies?.results.length > 0) {
				//console.log(genreMovies);
				setMovieList(genreMovies.results);
				setTotalPage(Math.min(90, genreMovies.total_pages));

				setLoading(false);
			}
		};

		fetchData();
	}, [page]);

	function handlePaginationChange(page: number) {
		setPage(page);
		setMovieList([]);
		router.replace(
			pathname + "?" + createQueryString("page", page.toString()),
			undefined
			// { shallow: true }
		);

		setLoading(true);
	}

	return (
		<div className="layout-movie flex gap-2 xl:gap-10 w-full flex-col xl:items-end m-auto max-w-[1920px] p-5 relative ">
			<h1 className="page-title flex w-full xl:w-4/5 text-center justify-center items-center xl:items-end">
				Movie Genre {genreName}
			</h1>
			<div className="main-container flex flex-col xl:flex-row gap-5 xl:gap-10 max-w-screen-2xl m-auto">
				<div className="sidebar movie-sidebar rounded-lg w-full block xl:w-1/5">
					<GenreList genres={genreList} currentId={params.genreId} />
				</div>
				<div className="main-content flex flex-col w-full xl:w-4/5 min-h-screen align-top">
					<>
						{totalPage > 0 && (
							<div className="toolbar toolbar-top py-10 flex gap-4 flex-wrap justify-center md:justify-between items-center">
								<div className="page-info text-lg">
									Page {page} / {totalPage}
								</div>
								<Pagination
									total={totalPage}
									initialPage={page}
									boundaries={1}
									showControls
									// disableAnimation
									onChange={(page: number) => handlePaginationChange(page)}
								/>
								<div className="sort-by"></div>
							</div>
						)}
						{loading ? (
							<div>Loading ...</div>
						) : (
							movieList &&
							movieList.length > 0 && (
								<>
									<MovieGrid movieList={movieList} />

									<div className="toolbar toolbar-top py-10 flex gap-4 flex-wrap justify-center items-center">
										<Pagination
											total={totalPage}
											initialPage={page}
											showControls
											onChange={(page: number) => handlePaginationChange(page)}
										/>
									</div>
								</>
							)
						)}
					</>
				</div>
			</div>
		</div>
	);
}

export default GenreIdPage;
