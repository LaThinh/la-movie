import { Movie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Comments from "@/app/components/Comments";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { movieId: string };
}): Promise<Metadata> {
  //console.log("generateMetadata meta data");
  const data: Movie = await getDataMovie(`${params?.movieId}`);

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

async function getDataMovie(id: string) {
  let language = "en-EN" || "vi-VN";
  //language = "vi-VN";
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzQxODJmN2Y4M2U1MTMwZmE2ZjRiOTRlMGM2OGE3NyIsInN1YiI6IjY0YjYwN2VlMzc4MDYyMDBmZjNhMmNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nv6BfKpMo2TI6mBuoJaOcXGOdKmZEd2F7E7Q01RkaGY",
      },
      next: {
        //revalidate: 60,
        tags: ["comment"],
        //revalidateTag: "Comment"
      },
    }
  );

  console.log("Fetch Data Movie from server. Function getDataMovie");

  return url.json();
}

export async function MovieDetailPage(props: any) {
  const { params, searchParams, data } = props;

  console.log("Render function MovieDetailPage");
  console.log(props);

  // const router = useRouter();
  // const movieId = router.query.movieId || "976573";
  // console.log(movieId);

  const movie: Movie = await getDataMovie(params?.movieId);
  console.log(movie);

  return (
    <div className="min-h-screen p-3 lg:p-4 xl:p-8">
      <div className="movie-detail-view max-w-screen-2xl  m-auto ">
        {movie?.title && movie?.backdrop_path && (
          <div className="banner h-[50vh] max-h-[540px] relative overflow-hidden">
            <Image
              alt={movie?.title}
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              className="object-cover w-full rounded-lg"
              fill
            />
          </div>
        )}

        <h1 className="text-5xl my-5 leading-normal ">{movie?.title}</h1>

        {movie && (
          <div className="flex flex-col lg:flex-row gap-5 rounded-2xl">
            <div className="left-info lg:w-1/2 font-medium bg-slate-200/50 p-5 lg:p-8 rounded-xl">
              <ul className="movie-info-list flex flex-col gap-2 text-left">
                <li className="flex gap-3">
                  <h4>HomePage</h4>
                  {movie?.homepage && (
                    <p>
                      <Link href={movie?.homepage || "/"} target="_blank">
                        {movie?.original_title}
                      </Link>
                    </p>
                  )}
                </li>
                <li className="flex gap-3">
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
                  <h4>Tagline</h4>
                  <p>{movie?.tagline}</p>
                </li>
                <li>
                  <h4>Genres</h4>
                  <div className="flex gap-3 flex-1 flex-wrap">
                    {movie?.genres.map((item) => (
                      <span
                        key={item.id}
                        className="genre bg-gray-300 rounded-md py-2 px-3 cursor-pointer whitespace-nowrap hover:bg-blue-500 hover:text-white"
                      >
                        {item?.name}
                      </span>
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
            </div>

            <div className="right-content lg:w-1/2 font-medium flex-1 ">
              <Comments id={movie?.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
