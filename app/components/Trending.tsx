import React from "react";
import { ITrending } from "../interfaces";
import Link from "next/link";
import Image from "next/image";

async function getDataTrending(page: string) {
  var language = "en-EN" || "vi-VN";
  language = "vi-VN";

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?page=${page}&language=${language}`,
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

async function Trending({ page }: { page: string }) {
  const data: ITrending = await getDataTrending(page);

  console.log(data);

  return (
    <div className="trending">
      <div
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
                className="group relative block h-80 overflow-hidden  bg-gray-100 md:h-[500px]"
                href={`/movie/${movieItem.id}`}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`}
                  alt={movieItem.title}
                  width={300}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between text-gray-700 text-left p-4 sm:p-5">
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
                <p className="release-date mt-2">
                  Popularity: <span>{movieItem?.popularity}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
      <h3 className="text-lg text-gray-700 my-5">End Trending page {page}</h3>
    </div>
  );
}

Trending.propTypes = {};

export default Trending;
