import React from "react";
import Link from "next/link";
import CardMovie from "@/app/components/movie/CardMovie";
import { IGenre, IMovieItem } from "@/app/interfaces";
import ListMovie from "./ListMovie";

export default function MovieList({
  movieList,
  genreList,
}: {
  movieList: IMovieItem[];
  genreList?: IGenre[];
}) {
  const data = movieList;

  return (
    <div className="movie-container @container">
      <div className="movie-list flex flex-col gap-6 rounded-lg">
        {data?.length > 0 &&
          data.map((movieItem, index) => (
            <ListMovie movie={movieItem} key={index} genreList={genreList} />
          ))}
      </div>
      <h3 className="text-lg text-gray-700 my-5">End Movie List Page</h3>
    </div>
  );
}
