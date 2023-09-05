"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import {
  GridIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { getAllGenres, searchMovies } from "../api/FetchMovieDB";
import { IGenre, IMovieItem } from "@/app/interfaces";
import MovieGrid from "@/app/components/movie/MovieGrid";
import { useInView } from "react-intersection-observer";
import { Metadata } from "next";
import Head from "next/head";
import MovieList from "../components/movie/MovieList";

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
  const searchParams = useSearchParams();

  //const [search, setSearch] = useState(searchParams.get("search") || "");
  // const [results, setResults] = useState<IMovieItem[]>([]);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ISearchResult | undefined>(
    undefined
  );
  const [genreList, setGenreList] = useState<IGenre[]>([]);
  const [searchView, setSearchView] = useState<SearchView>(SearchView.GRID);
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  //Run first
  useEffect(() => {
    const searchQuery = searchParams.get("q");
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
      //const newQuery = query;
      //setPage(1);
      handleSearch();
      // const searchData = await searchMovies({
      //   query: newQuery.trim(),
      //   page: "1",
      // });
      // //setSearch(newQuery);
      // setSearchResult(searchData);
      // //setResults(searchData.results);
      // //console.log(searchData);
      // createQueryString("q", query);
      // router.push(`./search?q=${query}`);
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
        <div className="m-auto w-full  max-w-screen-2xl p-2 xl:p-10 text-center">
          <h1 className="page-title text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Search Page
          </h1>

          {query && query.length > 1 && (
            <>
              <h2 className="whitespace-nowrap w-full text-xl lg:text-2xl">
                {`Keyword: `}
                <span className="text-primary-500 dark:text-blue-400">
                  {query}
                </span>
              </h2>
              <p className="hidden">Query: {query}</p>
            </>
          )}

          <div className="search-form max-w-xl lg:max-w-5xl m-auto">
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
                description="Search all movies, persions or keyword ..."
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
                    "lg:h-16 flex rounded-r-none bg-white dark:bg-primary-900 dark:border-white",
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
                className="flex px-5 w-24 lg:h-16 rounded-r-xl text-xl"
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
            <div className="search-results">
              <div className="search-toolbar max-w-5xl mx-auto mb-5 bg-slate-200 py-2 px-3 rounded-lg flex justify-between align-middle items-center">
                <div className="search-view flex gap-2 items-center">
                  View:
                  <Button
                    isIconOnly
                    aria-label="Search View Grid"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    onClick={() => {
                      setSearchView(SearchView.GRID);
                    }}
                    isDisabled={searchView === SearchView.GRID}
                  >
                    <GridIcon fontSize={24} />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Search View List"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    onClick={() => {
                      setSearchView(SearchView.LIST);
                    }}
                    isDisabled={searchView === SearchView.LIST}
                  >
                    <ListBulletIcon fontSize={24} />
                  </Button>
                </div>
                <h3 className="search-info text-xl text-center text-primary-500 dark:text-blue-400">
                  Total {searchResult?.total_results ?? 0} results
                </h3>
                <div className="search-language">Language</div>
              </div>
              {searchView === SearchView.GRID && (
                <MovieGrid movieList={searchResult?.results} />
              )}

              {searchView === SearchView.LIST && (
                <MovieList
                  movieList={searchResult?.results}
                  genreList={genreList}
                />
              )}

              <h4 className="search-load text-2xl">{`Loaded ${searchResult?.results.length} / ${searchResult?.total_results}`}</h4>

              {searchResult?.total_pages &&
                searchResult?.total_pages > page && (
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
                    {loading
                      ? `Loading page ${page}`
                      : `Load more page ${page + 1}`}
                  </Button>
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
