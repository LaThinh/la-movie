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
export const metadata: Metadata = {
  title: "Welcome to La Movies page",
  description:
    "La Movie developed by Paul La use Next.js and The Movie Database API",
};

export default async function Home() {
  //const data: ITrending = await getData();
  //console.log(data.results[0]);

  return (
    <>
      <Head>
        <title>Welcome to La Movies</title>
      </Head>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 lg:text-3xl">
              Top Trending Movies
            </h2>
          </div>

          {/* <div
          className="movie-grid grid gap-4 grid-cols-2 sm-grid-cols-2  
        md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 2xl:grid-cols-5"
        >
          {data?.results &&
            data.results?.length > 0 &&
            data.results.map((movieItem) => (
              <div
                className="movie-item flex flex-col rounded-lg overflow-hidden border bg-white"
                key={movieItem.id}
              >
                <Link
                  className="group relative block h-64 overflow-hidden  bg-gray-100 md:h-80"
                  href={`/movie/${movieItem.id}`}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`}
                    alt={movieItem.title}
                    width={200}
                    height={300}
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </Link>
                <div className="flex flex-1 flex-col text-gray-700 text-left p-4 sm:p-5">
                  <h3 className="mb-2 text-lg font-semibold ">
                    <Link
                      className="text-gray-700"
                      href={`/movie/${movieItem.id}`}
                      title={movieItem?.original_title}
                    >
                      {movieItem.title}
                    </Link>
                  </h3>
                  <p
                    className="text-gray-500 line-clamp-3"
                    title={movieItem.overview}
                  >
                    {movieItem.overview}
                  </p>
                </div>
              </div>
            ))}
        </div> */}

          <InfiniteScrollMovie />
        </div>
      </div>
    </>
  );
}
