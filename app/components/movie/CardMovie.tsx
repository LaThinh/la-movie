import React from "react";
import { IMovieItem } from "../../interfaces";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";

const CardMovie = ({ movie }: { movie: IMovieItem }) => {
  let vote = movie?.vote_average ? movie.vote_average / 2 : 0;
  //let rating:number = parseFloat((vote / 2).toString()).toFixed(0);

  return (
    <div
      className="card-movie flex flex-col rounded-lg overflow-hidden border bg-white hover:shadow-sm "
      key={movie.id}
    >
      <Link
        className="group relative block min-h-[320px] overflow-hidden  bg-gray-100 md:h-[500px]"
        href={`/movie/${movie?.id}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title || "Title"}
          sizes="240"
          fill
          style={{ objectFit: "cover" }}
          className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
        />

        <span
          className="absolute z-10 top-2 right-2 border-2 p-4
        w-14 h-14 flex justify-center items-center box-border rounded-full 
        border-c-green bg-white text-c-green font-extrabold text-xl
        group-hover:border-c-blue-light group-hover:text-c-blue-light"
        >
          {movie?.vote_average?.toFixed(1)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col justify-between text-gray-700 text-left p-4 lg:p-5">
        <h3 className="mb-2 text-lg font-semibold ">
          <Link
            className="text-gray-700"
            href={`/movie/${movie.id}`}
            title={movie?.original_title}
          >
            {movie.title}
          </Link>
        </h3>
        <p className="text-gray-500 line-clamp-4" title={movie.overview}>
          {movie.overview}
        </p>
        <div className="card-footer flex justify-between items-center mt-5">
          <div className="vote">Votes: {movie?.vote_count}</div>
          <div className="point"></div>
          {}
          <Rating rating={Math.ceil(vote)} />
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
