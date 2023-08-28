import React from "react";
import { IMovie } from "@/app/interfaces";
import Link from "next/link";
import Rating from "./Rating";
import Trailer from "@/app/components/movie/Trailer";

function MovieInfo({ movie }: { movie: IMovie }) {
  let vote = movie?.vote_average ? movie.vote_average / 2 : 0;

  return (
    <div>
      <ul className="movie-info-list flex flex-col  gap-2 text-left">
        <li className="flex gap-3">
          <h4>HomePage</h4>
          {movie?.homepage && (
            <p>
              <Link
                href={movie?.homepage || "/"}
                target="_blank"
                className="text-xl"
              >
                {movie?.original_title}
              </Link>
            </p>
          )}
        </li>
        <li className="flex gap-3 flex-col @2xl:flex-row">
          <h4>Overview</h4>
          <p>{movie?.overview}</p>
        </li>
        <li className="flex gap-3">
          <h4>Release Date</h4>
          <p>{movie?.release_date}</p>
        </li>
        <li>
          <h4>Average</h4>
          <p>{movie?.vote_average}</p>
        </li>
        <li>
          <h4>Rating:</h4>

          <Rating
            rating={Math.ceil(vote)}
            showLabel
            size="medium"
            label={`${vote.toFixed(1)} starts`}
          />
        </li>
        <li>
          <h4>Tagline</h4>
          <p>{movie?.tagline}</p>
        </li>
        <li>
          <h4>Genres</h4>
          <div className="flex gap-3 flex-1 flex-wrap">
            {movie?.genres.map((item) => (
              <Link
                key={item.id}
                href={`/genre/${item.id}`}
                className="genre bg-primary-500 text-white dark:bg-primary-700 dark:border dark:hover:bg-primary-500
                rounded-md py-2 px-3 cursor-pointer whitespace-nowrap hover:bg-blue-500 hover:text-white"
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </li>
        {movie?.spoken_languages && (
          <li>
            <h4>Languages:</h4>
            <div className="language flex gap-2">
              {movie?.spoken_languages.map((item) => (
                <span key={item.iso_639_1}>{item.name}</span>
              ))}
            </div>
          </li>
        )}
      </ul>
      <div className="video-trailer block w-full">
        <Trailer movieId={movie.id} />
      </div>
    </div>
  );
}

MovieInfo.propTypes = {};

export default MovieInfo;
