import React from "react";
import { ITrending } from "../interfaces";
import Link from "next/link";
import Image from "next/image";
import CardMovie from "./movie/CardMovie";

async function getDataTrending(page?: string) {
  var language = "en-EN" || "vi-VN";
  language = "vi-VN";
  page = page || "1";

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
        className="movie-grid grid grid-cols-1 gap-2 mb-5
         mobile:grid-cols-2 mobile:gap-3 sm:gap-4
         tablet:grid-cols-3 lg:gap-6 
         xl:grid-cols-4 xl:gap-y-8 2xl:grid-cols-5"
      >
        {data?.results &&
          data.results?.length > 0 &&
          data.results.map((movieItem) => (
            <CardMovie movie={movieItem} key={movieItem.id} />
          ))}
      </div>
      <h3 className="text-lg hidden text-gray-700 my-5">
        End Trending page {page}
      </h3>
    </div>
  );
}

Trending.propTypes = {};

export default Trending;
