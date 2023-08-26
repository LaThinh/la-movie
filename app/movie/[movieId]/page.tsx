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
import useLocalStorage from "@/app/hooks/useLocalStorage ";
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

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

// async function getDataMovie(id: string) {
//   // let language = "en-EN" || "vi-VN";
//   // //language = "vi-VN";
//   // console.log("33333333333333333333333333333333333333333333333333333333");
//   // console.log("Get data tyle = " + typeof window);
//   // language = localStorage.getItem("language") || "en-US" || "vi-VN";

//   // if (typeof window !== "undefined") {
//   //   // Perform localStorage action
//   //   console.log("lang before fetch" + language);
//   //   language = localStorage.getItem("language") || "en-US" || "vi-VN";
//   //   console.log("lang after fetch" + language);
//   // }

//   const url = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?language=${language}`,
//     {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzQxODJmN2Y4M2U1MTMwZmE2ZjRiOTRlMGM2OGE3NyIsInN1YiI6IjY0YjYwN2VlMzc4MDYyMDBmZjNhMmNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nv6BfKpMo2TI6mBuoJaOcXGOdKmZEd2F7E7Q01RkaGY",
//       },
//       next: {
//         //revalidate: 60,
//         tags: ["comment"],
//         //revalidateTag: "Comment"
//       },
//     }
//   );

//   console.log("Fetch Data Movie from server. Function getDataMovie");

//   return url.json();
// }

export async function MovieDetailPage(props: any) {
  const { params, searchParams, data } = props;

  console.log("Render function MovieDetailPage");
  console.log(props);

  // const router = useRouter();
  // const movieId = router.query.movieId || "976573";
  // console.log(movieId);

  // const [lang, setLang] = useLocalStorage("language", "en-EN");
  // //const [movie, setMovie] = useState<IMovie>();

  // useEffect(() => {
  //   async function getDataDetail() {
  //     const data: IMovie = await getDataMovie(params?.movieId);
  //     console.log(movie);
  //     setMovie(data);
  //   }

  //   getDataDetail();
  // }, [lang]);

  const movie: IMovie = await getMovieDetails(params?.movieId);

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6 xl:p-8">
      <div className="movie-detail-view max-w-screen-2xl  m-auto ">
        {movie?.title && movie?.backdrop_path && (
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

        {movie && (
          <>
            <div className="flex flex-col lg:flex-row gap-5 rounded-2xl">
              <div
                className="@container left-info lg:w-1/2 font-medium bg-slate-200/50 
              dark:bg-transparent dark:border
              p-5 lg:p-8 rounded-xl"
              >
                <MovieInfo movie={movie} />
              </div>

              <div className="right-content lg:w-1/2 font-medium flex-1 ">
                <Comments id={movie?.id} />
              </div>
            </div>

            <Recommendations movieId={movie.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
