// import dynamic from "next/dynamic";

import { ICredits, IMovie, IVideoItem } from "@/app/interfaces";
import React, { Suspense, useEffect } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Recommendations from "@/app/components/movie/Recommendations";
import { getMovieCredits, getMovieDetails } from "@/app/api/FetchMovieDB";
import PersonSlider from "@/app/components/person/PersonSlider";
import Loading from "@/app/components/Loading";
import MovieBannerParallax from "@/app/components/movie/MovieBannerParallax";
import { MovieTabs } from "@/app/components/movie/MovieTabs";
import VideoSlider from "@/app/components/movie/VideoSlider";

type MovieDetailProps = {
	params: { movieId: string; lang?: string };
	//searchParams: { [key: string]: string | undefined };
};

// const MovieTabs = dynamic(() => import("@/app/components/movie/MovieTabs"), {
// 	loading: () => <p>Loading Tabs...</p>,
// });

export async function generateMetadata(
	{ params }: MovieDetailProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const movieId = params.movieId[0].split("-")[0];
	const lang = params?.lang || "en";

	const movie: IMovie = await getMovieDetails({
		movieId: movieId,
		language: lang,
		append_to_response: "keywords",
	});

	let keywords: string[] = [];
	keywords.push(movie.title);
	movie.keywords?.keywords.map((key) => keywords.push(key.name));
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	console.log(movie);

	//const title = `Movie ${movie.title}`

	return {
		title: `${movie.title} Movie (${movie.release_date}) ${movie?.tagline}  | La Movie - Review Movie Poster Photo Banner Download`,
		description: movie.overview,
		keywords: keywords.join(", "),

		//publisher: tv.first_air_date.toDateString(),
		openGraph: {
			images: [
				`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
				`https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
				...previousImages,
			],
		},
	};
}

export async function MovieDetailPage(props: MovieDetailProps) {
	const lang = props.params?.lang || "en";
	const movieId = props.params.movieId[0].split("-")[0];
	//const lang = props.searchParams?.lang || "en";

	const movie: IMovie = await getMovieDetails({
		movieId: movieId,
		language: lang,
		append_to_response: "videos,images,credits,keywords,reviews",
	});

	let videoTrailer: IVideoItem[] = [];
	if (movie?.videos && movie.videos.results) {
		const videos: IVideoItem[] = movie?.videos?.results;

		videoTrailer = videos.sort((a, b) => {
			// Sort by "type" with "Trailer" coming first
			if (a.type === "Trailer" && b.type !== "Trailer") {
				return -1;
			} else if (a.type !== "Trailer" && b.type === "Trailer") {
				return 1;
			} else {
				return a.name.localeCompare(b.name);
			}
		});
	}

	return (
		<Suspense fallback={<Loading text="Loading Movie..." />}>
			<div className="movie-detail min-h-screen">
				{!movie ? (
					<div className="loading">Loading Movie ... </div>
				) : (
					<div className="movie-detail-view m-auto">
						<MovieBannerParallax movie={movie} />

						<h2
							className="mt-5 lg:mt-10 py-5 text-2xl lg:text-4xl 2xl:text-5xl my-3 xl:my-6 leading-normal 
						animate-text-gradient bg-gradient-to-r from-blue-500 via-[#8678f9] to-orange-700
						bg-[200%_auto] bg-clip-text text-transparent
						"
						>
							Movie: {movie.title}
						</h2>

						<div className="trailer-desktop m-auto max-w-screen-2xl flex flex-col gap-5">
							{movie?.credits && movie.credits?.cast && movie.credits.cast.length > 0 && (
								<PersonSlider personList={movie.credits.cast} />
							)}

							{videoTrailer.length > 0 && <VideoSlider videos={videoTrailer} limit={9} />}
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
		</Suspense>
	);
}

export default MovieDetailPage;
