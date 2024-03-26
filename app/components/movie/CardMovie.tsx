import React from "react";
import { IMovieItem } from "../../interfaces";
import Link from "next/link";
// import Image from "next/image";
import Rating from "./Rating";
import { CircularProgress, Image, Tooltip } from "@nextui-org/react";
import { convertToSlug } from "@/app/lib/utils";

const CardMovie = ({ movie, lang }: { movie: IMovieItem; lang?: string }) => {
	let vote = movie?.vote_average ? movie.vote_average : 0;
	//let rating:number = parseFloat((vote / 2).toString()).toFixed(0);

	const pLang = lang ? `${lang}/` : "";

	let movieSlug = `/${pLang}movie/${movie?.id}`;
	if (lang === "vi" || lang === "fr") {
		movieSlug = movieSlug + "-" + convertToSlug(movie.title);
	} else {
		movieSlug = movieSlug + "-" + convertToSlug(movie.original_title);
	}

	return (
		<div
			className="card-movie flex flex-col rounded-lg overflow-hidden border dark:border-c-dark  bg-white dark:bg-gray-800 hover:shadow-sm "
			key={movie.id}
		>
			<Link
				className="group relative block aspect-[2/3] overflow-hidden bg-gray-300 "
				href={movieSlug}
			>
				{movie.poster_path != null && (
					<Image
						src={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
						alt={movie?.title || "Title"}
						sizes="300"
						width={300}
						height={450}
						loading="eager"
						radius="none"
						isZoomed
						removeWrapper
						// style={{ objectFit: "cover" }}
						className="w-full object-cover m-auto aspect-[2/3]"
						//className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
					/>
				)}

				<span
					className="absolute z-10 top-2 right-2 border-2 p-4 hidden
        w-14 h-14 flex justify-center items-center box-border rounded-full 
        border-c-green bg-white text-c-green font-extrabold text-xl
        group-hover:border-c-blue-light group-hover:text-c-blue-light"
				>
					{movie?.vote_average?.toFixed(1)}
				</span>

				<CircularProgress
					className="absolute z-10 top-2 right-2 bg-white rounded-full box-border"
					classNames={{
						svg: "w-16 h-16 drop-shadow-md",
						track: "stroke-white/10",
						value: "text-[18px] font-bold text-primary-500",
					}}
					size="lg"
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
					aria-label="Point"
				/>
			</Link>
			<div
				className="flex flex-1 flex-col justify-between text-gray-700 dark:text-white 
      text-left p-3 lg:p-4 "
			>
				<h4 className="mb-2 text-lg  line-clamp-2 h-14">
					<Link
						className="text-gray-700 dark:text-gray-200"
						href={`/movie/${movie.id}-${convertToSlug(movie.title)}`}
						title={movie?.original_title}
					>
						{movie.title}
					</Link>
				</h4>
				<div className="release-date text-sm sm:hidden font-semibold italic mb-2">
					{movie?.release_date.toLocaleString()}
				</div>

				<p
					className="text-gray-500 dark:text-gray-200 text-sm line-clamp-3"
					title={movie.overview}
				>
					{movie.overview}
				</p>
				<p>{movie?.original_language}</p>
				<div className="card-footer flex flex-wrap gap-2 justify-center sm:justify-between align-middle items-center mt-4 w-full">
					<div className="popularity hidden w-full">{movie?.popularity}</div>

					<Tooltip
						content={
							<div className="tooltip-content flex flex-col justify-center items-center">
								<div className="text-semibold">{`Vote Count: ${movie?.vote_count}`}</div>
								<div className="text-gray-500">Point: {vote.toFixed(2)} / 10</div>
							</div>
						}
					>
						<div className="rating ">
							<Rating rating={Math.ceil(vote / 2)} size="small" />
						</div>
					</Tooltip>

					<div className="release-date text-sm hidden sm:block font-semibold italic">
						{movie?.release_date.toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardMovie;
