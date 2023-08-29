"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { searchMovies } from "../api/FetchMovieDB";
import { IMovieItem } from "@/app/interfaces";
import MovieGrid from "@/app/components/movie/MovieGrid";
import { useInView } from "react-intersection-observer";

type SearchResult = {
  page: number;
  results: IMovieItem[];
  total_pages: number;
  total_results: number;
};

const SearchPage = (props: any) => {
  //const { params } = props;
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [dataSearch, setDataSearch] = useState<SearchResult>();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (search: string) => {
    createQueryString("search", search);
    handleSearch();
  };

  const handleKeyUp = async (e: any) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Backspace") {
      const newQuery = query || search || "";
      setPage(1);
      const searchData = await searchMovies({
        query: newQuery.trim(),
        page: "1",
      });
      setSearch(newQuery);
      setDataSearch(searchData);
      setResults(searchData.results);
      //console.log(searchData);
    }
    if (e.key === "Enter") {
      createQueryString("search", query);
      router.push(`./search?search=${query}`);
    }
  };

  const handleSearchClear = () => {
    console.log("Handle Search Clear");
    setResults([]);
    setQuery(" ");
    setSearch(" ");
    createQueryString("search", " ");
  };

  const handleSearch = async () => {
    console.log("handle Search " + search);
    const searchData = await searchMovies({
      query: query || search || "",
      page: "1",
    });

    setDataSearch(searchData);
    setResults(searchData.results);
    router.push(`./search?search=${query}`);
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      console.log("Search default param " + searchParam);
      handleSearch();
    }
  }, [search]);

  useEffect(() => {
    const newQuery = query || search || "";
    setQuery(newQuery);
    createQueryString("search", newQuery);
    handleSearch;
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

        const searchData = await searchMovies({
          query: query.trim(),
          page: page.toString(),
        });
        setSearch(query);
        setDataSearch(searchData);
        console.log(searchData);
        if (page == 1) setResults(searchData.results);
        else {
          setResults((prevList) => [...prevList, ...searchData?.results]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getSearchMore(page);

    //console.log(movieList);
  }, [page]);

  return (
    <div
      id="search-page"
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
            <div className="whitespace-nowrap w-full text-xl lg:text-2xl">
              Keyword:
              <span className="text-primary-500 dark:text-blue-400">
                {` ${search || ""} `}
              </span>
            </div>
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
              defaultValue={search ? search : ""}
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
              onClick={handleSearch}
              className="flex px-5 w-24 lg:h-16 rounded-r-xl text-xl"
            >
              Search
            </Button>
          </div>
        </div>

        {results.length == 0 ? (
          search.length > 2 && (
            <div
              className="max-w-5xl m-auto min-h-[360px] rounded-2xl 
            text-2xl lg:text-4xl text-red bg-white/50 flex justify-center items-center"
            >
              {`No Result for keyword "${query}" `}
            </div>
          )
        ) : (
          <div className="search-results">
            <h3 className="search-info text-xl text-center mb-5 text-primary-500 dark:text-blue-400">
              Total {dataSearch?.total_results ?? 0} results
            </h3>

            <MovieGrid movieList={results} />

            {dataSearch?.total_pages && dataSearch?.total_pages > page && (
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
  );
};

SearchPage.propTypes = {};

export default SearchPage;
