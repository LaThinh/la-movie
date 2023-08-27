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

const SearchPage = (props: any) => {
  //const { params } = props;
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMovieItem[]>([]);
  const [dataSearch, setDataSearch] = useState();
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

  const handleOnChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleKeyUp = async (e: any) => {
    console.log(e.key);

    if (e.key === "Enter" || e.key === " " || e.key === "Backspace") {
      const newQuery = query || search || "";

      const searchData = await searchMovies({
        query: newQuery,
        page: "1",
      });
      setSearch(newQuery);
      setDataSearch(searchData);
      setResults(searchData.results);
      console.log(searchData);
      createQueryString("search", query);
    }
    if (e.key === "Enter") {
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
      query: query || "",
      page: "1",
    });

    setResults(searchData.results);
  };

  useEffect(() => {
    const newQuery = query || search || "";
    setQuery(newQuery);
    createQueryString("search", newQuery);
    handleSearch;
  }, [query]);

  return (
    <div
      className="search-page min-h-[90vh] flex flex-col justify-center 
      bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100      
      dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r"
      
    >
      <div className="m-auto  w-full  max-w-screen-2xl p-2 xl:p-10 text-center">
        <h1 className="page-title">
          Search Page. Keyword:
          <span className="text-primary-500 dark:text-blue-400">{` ${
            search || ""
          } `}</span>
        </h1>
        {query && query.length > 1 && <p>Query: {query}</p>}

        <div className="search-form max-w-5xl m-auto">
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
              onChange={handleOnChange}
              onValueChange={(value: string) => handleSearchChange}
              //   endContent={
              //     <MagnifyingGlassIcon className="text-black/50 w-8 h-8 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              //   }
              classNames={{
                base: "border-color-yellow",
                label: "",
                input: "flex flex-1 text-[24px] font-bold px-3 py-3 ",
                description: "text-xl text-center block w-full text-gray-500",
                inputWrapper:
                  "h-16 flex rounded-r-none bg-white dark:bg-primary-900 dark:border-white",
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
              className="flex px-5 w-24 h-16 rounded-r-xl text-xl"
            >
              Search
            </Button>
          </div>
        </div>

        {results.length == 0 ? (
          search.length > 2 && (
            <div className="max-w-5xl m-auto min-h-[360px] rounded-2xl shadow-xl text-2xl lg:text-4xl text-white flex justify-center items-center">
              {`No Result for keyword "${query}" `}
            </div>
          )
        ) : (
          <div className="search-results">
            <h3 className="search-info text-xl text-center mb-5 text-primary-500 dark:text-blue-400">
              Total {dataSearch?.total_results ?? 0} results
            </h3>
            <MovieGrid movieList={results} />
          </div>
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {};

export default SearchPage;
