import dynamic from "next/dynamic";

import { IMovie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Comments from "@/app/components/Comments";
import { Metadata } from "next";
import Recommendations from "@/app/components/movie/Recommendations";
import MovieInfo from "@/app/components/movie/MovieInfo";
import Trailer from "@/app/components/movie/Trailer";
import { getMovieDetails } from "@/app/api/FetchMovieDB";

export async function generateMetadata({
  params,
}: {
  params: { movieId: string };
}): Promise<Metadata> {
  //console.log("generateMetadata meta data");
  const data: IMovie = await getMovieDetails(`${params?.movieId}`);

  return {
    title: `${data?.title} | La Movie`,
    description: data?.overview,
  };
}

export async function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  console.log("Render function MovieDetailPage" + params.movieId);
  const movie: IMovie = await getMovieDetails(params.movieId);

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6 xl:p-8">
      {!movie ? (
        <div className="loading">Loading ... </div>
      ) : (
        <div className="movie-detail-view max-w-screen-2xl  m-auto ">
          {movie?.backdrop_path && (
            <div className="banner h-[50vh] max-h-[540px] relative overflow-hidden">
              <Image
                alt={movie?.title}
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                className="object-cover w-full rounded-lg"
                priority={true}
                fill
              />
            </div>
          )}

          <h1 className="text-3xl lg:text-5xl 2xl:text-6xl my-5 xl:my-10 leading-normal ">
            {movie?.title}
          </h1>

          <div className="trailer-desktop hidden lg:block">
            <Trailer movieId={movie.id} limitDefault={12} />
          </div>

          <div className="flex flex-col lg:flex-row gap-5 rounded-2xl">
            <div
              className="@container left-info p-5 font-medium rounded-xl
              bg-slate-200/50 dark:bg-transparent dark:border
              lg:w-1/2 lg:p-8 "
            >
              <MovieInfo movie={movie} />
            </div>

            <div className="right-content lg:w-1/2 font-medium flex-1 ">
              <Comments id={movie?.id} />
            </div>
          </div>

          <Recommendations movieId={movie.id} />
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
