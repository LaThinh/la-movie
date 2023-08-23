import Image from "next/image";
import { ITrending } from "./interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Trending from "./components/Trending";
import Head from "next/head";
import { Metadata } from "next";
import ScrollLoadMore from "./components/InfiniteScrollMovie";
import InfiniteScrollMovie from "./components/InfiniteScrollMovie";
import { getTrending } from "./api/FetchMovieDB";

async function getData() {
  var language = "en-EN" || "vi-VN";
  language = "vi-VN";

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=${language}&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.THE_MOVIE_DATABASE_API as string,
      },
      next: {
        revalidate: 10,
      },
    }
  );

  return res.json();
}

type IHomePage = {
  trendingData: ITrending;
  trendingTitle: string;
};

export const metadata: Metadata = {
  title: "Welcome to La Movies | Review Film Hot",
  description:
    "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function HomePage() {
  //const data: ITrending = await getData();
  //console.log(data.results[0]);
  console.log("Get data trending homepage");
  const dataTrending: ITrending = (await getTrending(1)) || null;
  console.log(dataTrending.results[0]);

  return (
    <>
      <div className="mx-auto bg-white py-6 sm:py-8 lg:py-12 max-w-screen-2xl px-4 md:px-5 lg:px-8">
        <div className="mb-6 md:mb-8 lg:mb-10 2xl:mb-12">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 lg:text-3xl">
            {"Top Trending Movies"}
          </h2>
        </div>
        {<Trending page={"1"} />}
        <InfiniteScrollMovie movieData={dataTrending.results} fromPage={2} />
      </div>
    </>
  );
}
