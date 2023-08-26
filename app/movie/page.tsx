import { useSearchParams } from "next/navigation";
import * as React from "react";
import CarouselSlider2 from "../components/movie/CarouselSlider2";
import { IMovieListPage } from "../interfaces";
import { getPopular } from "../api/FetchMovieDB";
import InfiniteScrollMovie from "../components/InfiniteScrollMovie";

export interface IMovieProps {}

export default async function Movie() {
  //const searchParams = useSearchParams();
  //const search = searchParams.get("search");
  //console.log(search);

  console.log("Get Movie Popular");
  const dataPopular: IMovieListPage = await getPopular();
  console.log("Pololarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  console.log(dataPopular.results[0]);

  return (
    <div className="layout-movie flex gap-10 w-full m-auto max-w-[1920px] p-5 relative">
      <div className="sidebar movie-sidebar sticky top-20 bg-gray-200 rounded-lg w-1/5 hidden xl:block">
        Sidebar
      </div>
      <div className="main-content w-full xl:w-4/5">
        <CarouselSlider2 movieList={dataPopular} />
        <InfiniteScrollMovie fromPage={1} toPage={5} />
      </div>
    </div>
  );
}
