"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IMovieItem, ITrending } from "../interfaces";
import { getTrending } from "../api/FetchMovieDB";
import CardMovie from "./movie/CardMovie";

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
        console.log(data.page);
        //console.log(data?.results);
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
    <div>
      <div
        className="movie-grid grid grid-cols-1 gap-2
        mobile:grid-cols-2 mobile:gap-3 sm:gap-4
        tablet:grid-cols-3 lg:gap-6 
        xl:grid-cols-4 xl:gap-y-8 2xl:grid-cols-5"
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
      <button
        className="load-more mt-10 mb-5 border-2 border-c-blue text-c-blue hover:bg-c-blue hover:text-white rounded-lg px-5 py-2 text-lg"
        ref={ref}
        onClick={handleLoadMore}
        disabled={loading}
      >
        {loading ? `Loading page ${page}` : `Load more page ${page + 1}`}
      </button>
    </div>
  );
}