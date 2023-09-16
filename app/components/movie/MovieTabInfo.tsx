import React from "react";
import MovieInfo from "./MovieInfo";
import { IMovie } from "@/app/interfaces";

export default function MovieTabInfo({ movie }: { movie: IMovie }) {
  return (
    <>
      <MovieInfo movie={movie} />
    </>
  );
}
