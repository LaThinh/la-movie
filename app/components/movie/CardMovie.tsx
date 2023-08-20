import React from "react";
import { IMovieItem } from "../../interfaces";
import Link from "next/link";
import Image from "next/image";

const CardMovie = ({ movie }: { movie: IMovieItem }) => {
  return (
    <div
      className="card-movie flex flex-col rounded-lg overflow-hidden border bg-white"
      key={movie.id}
    >
      <Link
        className="group relative block h-80 overflow-hidden  bg-gray-100 md:h-[500px]"
        href={`/movie/${movie?.id}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title || "Title"}
          sizes="240"
          fill
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between text-gray-700 text-left p-4 sm:p-5">
        <h3 className="mb-2 text-lg font-semibold ">
          <Link
            className="text-gray-700"
            href={`/movie/${movie.id}`}
            title={movie?.original_title}
          >
            {movie.title}
          </Link>
        </h3>
        <p className="text-gray-500 line-clamp-3" title={movie.overview}>
          {movie.overview}
        </p>
        <p className="release-date mt-2">
          Popularity: <span>{movie?.popularity}</span>
        </p>
      </div>
    </div>
  );
};

export default CardMovie;
