import React from "react";
import { IMovieItem } from "../../interfaces";
import Link from "next/link";
// import Image from "next/image";
import Rating from "./Rating";
import { CircularProgress, Image } from "@nextui-org/react";

const CardMovie = ({ movie }: { movie: IMovieItem }) => {
  let vote = movie?.vote_average ? movie.vote_average : 0;
  //let rating:number = parseFloat((vote / 2).toString()).toFixed(0);

  return (
    <div
      className="card-movie flex flex-col rounded-lg overflow-hidden border dark:border-c-dark  bg-white dark:bg-gray-800 hover:shadow-sm "
      key={movie.id}
    >
      <Link
        className="group relative block min-h-[240px] overflow-hidden bg-gray-300 lg:min-h-[350px]"
        href={`/movie/${movie?.id}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title || "Title"}
          sizes="400"
          width={400}
          height={400}
          loading="eager"
          radius="none"
          isZoomed
          // style={{ objectFit: "cover" }}
          //className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
        />

        <span
          className="absolute z-10 top-2 right-2 border-2 p-4 hidden
        w-14 h-14 flex justify-center items-center box-border rounded-full 
        border-c-green bg-white text-c-green font-extrabold text-xl
        group-hover:border-c-blue-light group-hover:text-c-blue-light"
        >
          {movie?.vote_average?.toFixed(1)}
        </span>

        <CircularProgress
          className="absolute z-10 top-2 right-2 bg-white/90 rounded-full box-border"
          classNames={{
            svg: "w-16 h-16 drop-shadow-md",
            track: "stroke-white/10",
            value: "text-[16px] font-bold text-primary-500",
          }}
          size="lg"
          strokeWidth={4}
          maxValue={10}
          value={vote}
          color={
            vote > 7.5
              ? "success"
              : vote > 6
              ? "warning"
              : vote > 4
              ? "primary"
              : vote > 2
              ? "danger"
              : "default"
          }
          showValueLabel={true}
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between text-gray-700 dark:text-white text-left p-4 lg:p-5">
        <h3 className="mb-2 text-lg font-semibold line-clamp-2">
          <Link
            className="text-gray-700 dark:text-gray-200"
            href={`/movie/${movie.id}`}
            title={movie?.original_title}
          >
            {movie.title}
          </Link>
        </h3>

        <p
          className="text-gray-500 dark:text-gray-200 line-clamp-4"
          title={movie.overview}
        >
          {movie.overview}
        </p>
        <div className="card-footer flex justify-between items-center mt-5">
          <div className="vote">Votes: {movie?.vote_count}</div>
          <div className="point"></div>
          {}
          <Rating rating={Math.ceil(vote / 2)} />
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
