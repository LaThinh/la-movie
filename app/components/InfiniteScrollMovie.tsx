"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IMovieItem, ITrending } from "../interfaces";
import { getTrending } from "../api/FetchMovieDB";
import CardMovie from "./movie/CardMovie";
import { Button } from "@nextui-org/react";

export default function InfiniteScrollMovie({
  movieData,
  fromPage,
  toPage,
}: {
  movieData?: IMovieItem[] | null;
  fromPage?: number;
  toPage?: number;
}) {
  const [movieList, setMovieList] = useState<IMovieItem[]>([]);
  const [page, setPage] = useState(fromPage || 1);
  const [loading, setLoading] = useState(true);

  const maxPage = toPage ? toPage : (fromPage || 1) + 3;

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView && !loading && page < maxPage) {
        setPage(page + 1);
      }
    },
  });

  useEffect(() => {
    async function getMovie(page: number) {
      console.log("Fetch Data Movie Page " + page);

      try {
        setLoading(true);
        const data: ITrending = await getTrending(page);
        console.log(data?.results);
        if (movieList.length < 1) setMovieList(data?.results);
        else {
          setMovieList((prevList) => [...prevList, ...data?.results]);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getMovie(page);

    //console.log(movieList);
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="@container">
      <div
        className="movie-grid grid grid-cols-1 gap-2
        @xs:grid-cols-2 @xs:gap-3 
        @3xl:grid-cols-3 @3xl:gap-4
        @5xl:grid-cols-4 @5xl:gap-6 
        @7xl:grid-cols-5 #7xl:gap-8"
      >
        {movieList &&
          movieList?.length > 0 &&
          movieList.map((movieItem, index) => (
            <CardMovie movie={movieItem} key={index} />
          ))}
      </div>
      <h3 className="text-lg hidden text-gray-700 my-5">
        End Trending page {page}
      </h3>
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
