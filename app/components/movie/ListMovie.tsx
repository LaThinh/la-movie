import React from "react";
import { IGenre, IMovieItem } from "../../interfaces";
import Link from "next/link";
// import Image from "next/image";
import Rating from "./Rating";
import { CircularProgress, Image } from "@nextui-org/react";
import GenreList from "./GenreList";
import { convertToSlug } from "@/app/lib/utils";

export function findGenre(genreList: IGenre[], id: string) {
	if (genreList.length) {
		const genre = genreList.find((genre) => genre.id == id);
		return genre?.name;
	}
}

export default function ListMovie({
	movie,
	genreList,
}: {
	movie: IMovieItem;
	genreList?: IGenre[];
}) {
	let vote = movie?.vote_average ? movie.vote_average : 0;
	//let rating:number = parseFloat((vote / 2).toString()).toFixed(0);

	return (
		<div
			className="card-movie flex flex-row w-full rounded-lg overflow-hidden border 
      dark:border-c-dark  bg-white dark:bg-gray-800 hover:shadow-lg"
			id={movie.id.toString()}
		>
			<Link
				className="group relative block min-h-[120px] w-40 lg:w-44 overflow-hidden bg-gray-300 xl:min-h-[240px]"
				href={`/movie/${movie?.id}-${convertToSlug(movie.title)}`}
			>
				<Image
					src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
					alt={movie?.title || "Title"}
					sizes="220"
					width={220}
					height={320}
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
			</Link>
			<div className="flex flex-1 flex-col justify-between text-gray-700 dark:text-white text-left p-4 lg:p-5">
				<div className="movie-title relative mb-3">
					<h3 className="text-lg font-semibold line-clamp-2 lg:text-2xl">
						<Link
							className="text-gray-700 dark:text-gray-200"
							href={`/movie/${movie.id}`}
							title={movie?.original_title}
						>
							{movie.title}
						</Link>
					</h3>
					<CircularProgress
						className="absolute z-10 -top-1 right-[100%] mr-5 md:right-0 md:mr-0  bg-white rounded-full box-border"
						classNames={{
							svg: "w-16 h-16 drop-shadow-md",
							track: "stroke-white",
							value: "text-[18px] font-bold text-primary-600",
						}}
						size="lg"
						strokeWidth={5}
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
					<p>
						<strong className="release-date flex gap-1 font-semibold text-gray-500 dark:text-gray-300">
							<span className="hidden md:block">Release Date:</span>
							<span className="italic">{movie?.release_date.toLocaleString()}</span>
						</strong>
					</p>
				</div>

				<p
					className="text-gray-500 dark:text-gray-200 line-clamp-3 text-sm
          md:line-clamp-4 md:text-base "
					title={movie.overview}
				>
					{movie.overview}
				</p>

				<div className="movie-footer flex-wrap flex justify-between align-middle items-center mt-2">
					<div className="genre-list hidden md:flex gap-2 flex-wrap">
						{genreList &&
							movie?.genre_ids.length > 0 &&
							movie?.genre_ids.map((item, index) => (
								<Link
									className="movie-genre bg-primary-500 text-white dark:bg-primary-700 dark:border dark:hover:bg-primary-500
                  rounded-md py-1 px-3 cursor-pointer whitespace-nowrap hover:bg-blue-500 hover:text-white"
									key={index}
									href={`/genre/${item}`}
								>
									{
										//genreList.find((genre) => genre.id === item.toString())?.name
										findGenre(genreList, item.toString())
									}
								</Link>
							))}
					</div>
					<div className="movie-rating flex gap-2 justify-between items-center">
						<div className="vote w-24">Votes: {movie?.vote_count}</div>
						<Rating rating={Math.ceil(vote / 2)} />
					</div>
				</div>
			</div>
		</div>
	);
}
