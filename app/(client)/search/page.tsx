"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, CircularProgress, Input, Select, SelectItem } from "@nextui-org/react";
import { GridIcon, ListBulletIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getAllGenres, searchMovies } from "@/app/api/FetchMovieDB";
import { IGenre, IMovieItem } from "@/app/interfaces";
import MovieGrid from "@/app/components/movie/MovieGrid";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import MovieList from "@/app/components/movie/MovieList";
import SelectLanguages from "@/app/components/SelectLanguages";

export interface ISearchResult {
	page: number;
	results: IMovieItem[];
	total_pages: number;
	total_results: number;
}

export interface SearchPage {
	query?: string;
	view?: string;
	result: ISearchResult;
}

export enum SearchView {
	GRID = "grid",
	LIST = "list",
}

const SearchPage = (props: SearchPage) => {
	//const { params } = props;
	const router = useRouter();
	const searchParams = useSearchParams();

	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [searchResult, setSearchResult] = useState<ISearchResult | undefined>(undefined);
	const [genreList, setGenreList] = useState<IGenre[]>([]);
	const [searchView, setSearchView] = useState<SearchView>(SearchView.GRID);

	// const [selectedKeys, setSelectedKeys] = useState("en");

	// const selectedValue = React.useMemo(
	//   () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
	//   [selectedKeys]
	// );

	const [lang, setLang] = useState<string>(localStorage.getItem("lang") || "en");

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLang(e.target.value);
	};

	const createQueryString = useCallback(
		(name: string, value: string) => {
			if (!searchParams) return "";
			const params = new URLSearchParams(Array.from(searchParams.entries()));
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	//Run first
	useEffect(() => {
		const searchQuery = searchParams?.get("q") || "";
		if (searchQuery) {
			console.log("Search default query param " + searchQuery);
			setQuery(searchQuery);
		}

		const fetchGenreList = async () => {
			const data = await getAllGenres();
			console.log("Fetch Data Genres List");
			setGenreList(data?.genres);
			// const genreCurrent: IGenre[] = data?.genres.filter((g: IGenre) => {
			//   return g.id == params.genreId;
			// });
			// setGenreName(genreCurrent[0].name);
		};

		fetchGenreList();
	}, []);

	const handleSearchChange = (query: string) => {
		//createQueryString("q", query);
		//handleSearch();
	};

	const handleKeyUp = async (e: any) => {
		if (e.key === "Enter" || e.key === " " || e.key === "Backspace") {
			handleSearch();
		}
		if (e.key === "Enter") {
			createQueryString("q", query);
			router.push(`./search?q=${query}`);
		}
	};

	const handleSearchClear = () => {
		console.log("Handle Search Clear");
		//setSearchResult(null);
		setQuery(query);
		//setSearch(" ");
		//createQueryString("search", " ");
		createQueryString("q", query);
		router.push(`./search?q=${query}`);
	};

	//Function Search Main
	const handleSearch = () => {
		const searchFunction = async () => {
			setLoading(true);
			const querySearch = query;
			//setPage(1);
			console.log("Run function async HandleSearch query = " + query);
			const searchData = await searchMovies({
				query: query,
				page: page.toString(),
				language: lang,
			});
			setSearchResult(searchData);
			setLoading(false);
			//console.log("Push query param");
			createQueryString("q", querySearch);
			router.replace(`./search?q=${querySearch}`);
		};

		if (query && query.length > 0) {
			setPage(1);
			searchFunction();
		}
	};

	useEffect(() => {
		if (page == 0) {
			setPage(1);
			handleSearch();
		}
	}, [query]);

	useEffect(() => {
		handleSearch();
	}, [lang]);

	const { ref } = useInView({
		onChange(inView, entry) {
			if (inView && !loading) {
				setPage(page + 1);
			}
		},
	});

	// const handleLoadMore = () => {
	//   setPage(page + 1);
	// };

	useEffect(() => {
		async function getSearchMore(page: number) {
			console.log("Fetch Data Movie Page " + page);
			try {
				setLoading(true);

				const searchData: ISearchResult = await searchMovies({
					query: query.trim(),
					page: page.toString(),
					language: lang,
				});
				//setSearch(query);
				//setDataSearch(searchData);
				console.log(searchData);
				if (page == 1) {
					//setResults(searchData.results);
					//Set New Array Search
					setSearchResult(searchData);
				} else {
					// const newResult: IMovieItem[] = [
					//   ...searchResult?.results,
					//   ...searchData?.results,
					// ];
					//setResults((prevList) => [...prevList, ...searchData?.results]);
					//Push more results to Prev Array
					setSearchResult((prevState: any) => {
						return {
							...prevState,
							//results: newResult,
							results: [...prevState.results, ...searchData?.results],
						};
					});
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		}

		if (page == 1) {
			handleSearch();
		} else if (page > 1) getSearchMore(page);

		//console.log(movieList);
	}, [page]);

	return (
		<>
			<Head>
				<title>Search Page</title>
			</Head>
			<div
				className="search-page min-h-[calc(100vh-132px)] pt-10
      bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
      dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r"
			>
				<div className="m-auto w-full text-center">
					<h1 className="page-title text-xl md:text-2xl lg:text-3xl xl:text-4xl">
						Search Page
					</h1>

					{query && query.length > 1 && (
						<>
							<h2 className="whitespace-nowrap w-full text-xl lg:text-2xl">
								{`Keyword: `}
								<span className="text-primary-500 dark:text-blue-400">{query}</span>
							</h2>
							<p className="hidden">Query: {query}</p>
						</>
					)}

					<div className="search-form max-w-xl lg:max-w-5xl m-auto px-2 lg:px-10">
						<div className="search-box my-8 flex justify-between align-middle">
							<Input
								isClearable
								type="input"
								color="primary"
								name="search"
								size="lg"
								id="search-query"
								variant="bordered"
								aria-describedby="search-query"
								description="Search all movies, keyword ..."
								placeholder="The movie, person or keyword ..."
								labelPlacement="outside"
								defaultValue={query ? query : ""}
								onClear={handleSearchClear}
								onChange={(e) => {
									setQuery(e.target.value);
								}}
								onValueChange={(value: string) => handleSearchChange}
								classNames={{
									base: "border-color-yellow",
									label: "",
									input: "flex flex-1 lg:text-[24px] font-bold px-3 py-3 ",
									description:
										"text-sm lg:text-xl lg:text-center block w-full text-gray-500 dark:text-gray-200",
									inputWrapper:
										"lg:h-16 flex rounded-r-none rounded-l-full bg-white dark:bg-primary-900 dark:border-white",
								}}
								onKeyUp={handleKeyUp}
							/>

							<Button
								color="primary"
								size="lg"
								id="search-submit"
								radius="none"
								type="submit"
								aria-describedby="search-submit"
								aria-label="Search"
								onClick={handleSearch}
								className="flex px-5 min-w-[100px] lg:min-w-[140px] lg:h-16 rounded-r-full text-xl"
								endContent={
									<MagnifyingGlassIcon
										width="36"
										height="36"
										className="text-white text-xl font-semibold"
									/>
								}
							>
								Search
							</Button>
						</div>
					</div>

					{loading && (
						<div className="flex justify-center items-center text-primary-500 text-2xl p-10 m-5">
							{`Searching ${query} ...`}
							<CircularProgress aria-label="Loading..." />
						</div>
					)}

					{searchResult?.results &&
						searchResult?.results.length == 0 &&
						query.length > 2 && (
							<div
								className="max-w-5xl m-auto min-h-[360px] rounded-2xl 
            text-2xl lg:text-4xl text-red bg-white/50 flex justify-center items-center"
							>
								{`No Result for keyword "${query}" `}
							</div>
						)}

					{searchResult?.results && searchResult?.results.length > 0 && (
						<>
							<div
								className="search-toolbar mb-5 w-full bg-white dark:bg-gray-700 py-2 px-3 lg:py-3 lg:px-5
              sticky top-[68px] z-30"
							>
								<div className="toolbar-container max-w-screen-2xl mx-auto flex flex-wrap justify-between align-middle items-center ">
									<div className="search-view flex gap-2 items-center">
										<span className="hidden md:block">View: </span>
										<Button
											isIconOnly
											aria-label="Search View Grid"
											variant="solid"
											color="primary"
											size="sm"
											onClick={() => {
												setSearchView(SearchView.GRID);
											}}
											isDisabled={searchView === SearchView.GRID}
										>
											<GridIcon width="20" height="20" />
										</Button>
										<Button
											isIconOnly
											aria-label="Search View List"
											variant="solid"
											color="primary"
											size="sm"
											onClick={() => {
												setSearchView(SearchView.LIST);
											}}
											isDisabled={searchView === SearchView.LIST}
										>
											<ListBulletIcon width="24" height="24" />
										</Button>
									</div>
									<h3 className="search-info text-sm lg:text-xl text-center text-primary-500 dark:text-blue-400">
										{searchResult?.total_results ?? 0} results
									</h3>
									<div className="search-language">
										<SelectLanguages />
										{/* <Select
											label="Language"
											className="w-28 lg:w-36"
											//color="primary"
											size="sm"
											radius="lg"
											selectionMode="single"
											defaultSelectedKeys={[lang]}
											onChange={handleLanguageChange}
										>
											<SelectItem key="en" value="en">
												English
											</SelectItem>
											<SelectItem key="vi" value="vi">
												Vietnam
											</SelectItem>
											<SelectItem key="fr" value="fr">
												France
											</SelectItem>
											<SelectItem key="zh" value="zh">
												China
											</SelectItem>
											<SelectItem key="th" value="th">
												Thailand
											</SelectItem>
											<SelectItem key="ja" value="ja">
												Japan
											</SelectItem>
										</Select> */}
									</div>
								</div>
							</div>
							<div className="search-results  max-w-screen-2xl m-auto px-2 py-2 lg:px-5 xl:py-5">
								{searchView === SearchView.GRID && (
									<MovieGrid movieList={searchResult?.results} />
								)}

								{searchView === SearchView.LIST && (
									<MovieList movieList={searchResult?.results} genreList={genreList} />
								)}

								<h4 className="search-load text-2xl">{`Loaded ${searchResult?.results.length} / ${searchResult?.total_results}`}</h4>

								{searchResult?.total_pages && searchResult?.total_pages > page && (
									<Button
										className="load-more mt-10 mb-5 px-5 py-2"
										ref={ref}
										size="lg"
										color="primary"
										radius="lg"
										onClick={() => {
											setPage(page + 1);
										}}
										disabled={loading}
										isLoading={loading}
										spinnerPlacement="end"
									>
										{loading ? `Loading page ${page}` : `Load more page ${page + 1}`}
									</Button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchPage;
