import React from "react";
// import dynamic from "next/dynamic";
import { getMovieDetails } from "@/app/api/FetchMovieDB";
import { IMovie } from "@/app/interfaces";
import Image from "next/image";

export const preLoad = async (id: string) => {
  //const movieId = context.params?.id;

  const res = await getMovieDetails({movieId: id});

  const data: IMovie = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};

export async function DetailPage({ params }: { params: { id: string } }) {
  const id = params?.id;
  const movie: IMovie = await getMovieDetails({ movieId: id });

  return (
    <div>
      {movie && (
        <>
          <Image
            alt={movie?.title}
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            className="object-cover w-full rounded-lg"
            priority={true}
            fill
          />
          <h1>{movie?.title}</h1>
        </>
      )}
    </div>
  );
}

type DetailPage = {
  data: IMovie;
};

export default DetailPage;
