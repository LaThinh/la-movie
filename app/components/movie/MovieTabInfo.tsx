import React from "react";
import MovieInfo from "./MovieInfo";
import { IMovie } from "@/app/interfaces";
import { Image } from "@nextui-org/react";

export default function MovieTabInfo({ movie }: { movie: IMovie }) {
  return (
    <div className="tab-movie-info flex flex-col lg:flex-row gap-5 m-auto max-w-screen-xl xl:gap-10 lg:p-5 relative">
      <div className="tab-movie-sidebar hidden lg:w-1/4 lg:flex lg:max-w-[300px] sticky top-[200px]">
        <div className="movie-poster-image w-full aspect-[2/3] flex flex-col gap-5 ">
          <Image
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            loading="eager"
            radius="none"
            removeWrapper
            className="w-full rounded-lg shadow-xl bg-slate-300"
          />
          <h4 className="text-xl text-center">{movie.original_title}</h4>
        </div>
      </div>
      <div className="tab-movie-content lg:flex-1">
        <MovieInfo movie={movie} />
      </div>
    </div>
  );
}
