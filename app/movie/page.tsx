"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAllGenres, getPopular } from "../api/FetchMovieDB";
import InfiniteScrollMovie from "../components/InfiniteScrollMovie";
import GenreList from "@/app/components/movie/GenreList";
import CarouselSlider2 from "@/app/components/movie/CarouselSlider2";
import { IMovieListPage } from "../interfaces";

export interface IMovieProps {}

export default function Movie() {
  //const searchParams = useSearchParams();
  //const search = searchParams.get("search");
  //console.log(search);

  const [genreList, setGenresList] = useState([]);
  const [dataPopular, setPopular] = useState<IMovieListPage>();

  useEffect(() => {
    const fetchPopular = async () => {
      const data: IMovieListPage = await getPopular();
      setPopular(data);
    };

    fetchPopular();
  }, [dataPopular]);

  useEffect(() => {
    const fetchList = async () => {
      const data = await getAllGenres();
      setGenresList(data?.genres);
    };

    if (genreList.length < 1) {
      fetchList();
    }
  }, [genreList]);

  return (
    <div className="layout-movie flex gap-2 xl:gap-10 w-full flex-col xl:items-end m-auto xl:max-w-[1920px] p-5 relative ">
      <div className="main-container flex flex-col xl:flex-row w-full gap-5 xl:gap-10 max-w-screen-2xl m-auto">
        <div className="sidebar movie-sidebar rounded-lg w-full block xl:w-1/5">
          <GenreList genres={genreList} />
        </div>
        <div className="main-content flex flex-col max-w-full xl:w-4/5 min-h-screen align-top">
          {dataPopular && <CarouselSlider2 movieList={dataPopular} />}

          <InfiniteScrollMovie fromPage={1} toPage={5} />
        </div>
      </div>
    </div>
  );
}
