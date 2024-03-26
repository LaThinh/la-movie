import dynamic from "next/dynamic";

import { ICredits, IMovie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
// import Comments from "@/app/components/Comments";
import { Metadata } from "next";
import Recommendations from "@/app/components/movie/Recommendations";
import MovieInfo from "@/app/components/movie/MovieInfo";
import Trailer from "@/app/components/movie/Trailer";
import { getMovieCredits, getMovieDetails } from "@/app/api/FetchMovieDB";
import SliderVideos from "@/app/components/SliderVideos";
//import MovieTabs from "@/app/components/movie/MovieTabs";
import PersonSlider from "@/app/components/person/PersonSlider";
import BannerParallax from "@/app/components/BannerParallax";

type MovieDetailProps = {
	params: { movieId: string };
	searchParams: { [key: string]: string | undefined };
};

const MovieTabs = dynamic(() => import("@/app/components/movie/MovieTabs"), {
	loading: () => <p>Loading Tabs...</p>,
});

export async function generateMetadata(props: MovieDetailProps): Promise<Metadata> {
	//console.log("generateMetadata meta data");
	const movieId = props.params.movieId[0].split("-")[0];
	const lang = props.searchParams?.lang || "en";
	const movie: IMovie = await getMovieDetails({
		movieId: movieId,
		language: lang,
	});

	return {
		title: `${movie?.title} | La Movie`,
		description: movie?.overview,
	};
}

export async function MovieDetailPage(props: MovieDetailProps) {
	console.log("Render function MovieDetailPage " + props.params.movieId);
	console.log(props.params);

	const movieId = props.params.movieId[0].split("-")[0];
	const lang = props.searchParams?.lang || "en";
	const movie: IMovie = await getMovieDetails({
		movieId: movieId,
		language: lang,
		append_to_response: "keywords",
	});

	const movieCredits: ICredits = await getMovieCredits({ movieId: movieId });

	return (
		<div className="movie-detail min-h-screen">
			{!movie ? (
				<div className="loading">Loading ... </div>
			) : (
				<div className="movie-detail-view m-auto">
					{movie?.backdrop_path && (
						// <div className="banner h-[54vh] max-h-[720px] max-w-[2800px] m-auto relative overflow-hidden">
						//   <Image
						//     alt={movie?.title}
						//     src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
						//     className="object-cover w-full"
						//     priority={true}
						//     fill
						//   />

						// </div>

						<BannerParallax
							imageUrl={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
							imageTitle={movie.title}
						/>
					)}

					<h1 className="text-2xl lg:text-4xl 2xl:text-6xl my-3 xl:my-6 leading-normal ">
						{movie?.title}
					</h1>

					<div className="trailer-desktop m-auto max-w-screen-2xl flex flex-col gap-5">
						{movieCredits?.cast && movieCredits.cast.length > 0 && (
							<PersonSlider personList={movieCredits.cast} />
						)}

						<SliderVideos movieId={movie.id} limitDefault={9} language={lang} />
						{/* <Trailer movieId={movie.id} limitDefault={12} /> */}
					</div>

					<MovieTabs movieId={movie.id} movie={movie} />

					<div className="movie-detail-container my-5 m-auto p-3 md:p-4 lg:p-6 xl:p-8 max-w-screen-2xl">
						{/* <div className="flex flex-col lg:flex-row gap-5 rounded-2xl">
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
            </div> */}

						<Recommendations movieId={movie.id} />
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieDetailPage;
