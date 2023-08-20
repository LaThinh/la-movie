import { getRecommendations } from "@/app/api/FetchMovieDB";
import React from "react";
import CardMovie from "./CardMovie";
import { IMovieItem } from "@/app/interfaces";

export default async function Recommendations({
  movieId,
}: {
  movieId: string;
}) {
  const data = await getRecommendations(movieId);
  console.log(data);
  const listMovie = data?.results;
  return (
    <div className="movie-recommend">
      {listMovie && listMovie.length > 0 && (
        <>
          <h3 className="text-3xl my-10 text-gray-700 text-left">
            Recommendations
          </h3>
          <div
            className="movie-grid grid gap-4 grid-cols-2 sm-grid-cols-2  
        md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 2xl:grid-cols-5"
          >
            {listMovie.map((movie: IMovieItem) => (
              <CardMovie movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
