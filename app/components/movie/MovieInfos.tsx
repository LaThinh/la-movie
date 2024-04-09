import { IMovie } from "@/app/interfaces";
import { CircularProgress, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import ModalVideos from "../ModalVideos";
import Rating from "./Rating";
import { minifySync } from "next/dist/build/swc";
import { formatNumberCurrency, minutesToHoursMinutes } from "@/app/lib/utils";

export default function MovieInfos({ movie }: { movie: IMovie }) {
	let vote = movie?.vote_average ? movie.vote_average : 0;

	//console.log(movie);

	return (
		<div className="tv-info p-5 lg:p-10 flex gap-5 flex-col md:flex-row md:gap-10">
			<div
				className="movie-poster-image w-full hidden 
				sm:flex flex-col gap-5 justify-center items-center
				md:w-72 xl:w-80 md:aspect-[2/3]  "
			>
				<Image
					src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
					alt={movie.title}
					width={300}
					height={450}
					loading="eager"
					radius="none"
					removeWrapper
					className="w-full max-w-xs lg:max-w-md rounded-lg shadow-xl bg-slate-300"
				/>

				{movie?.homepage && (
					<h4 className="home-page text-xl text-center hidden md:block">
						<Link
							href={movie.homepage}
							target="_blank"
							rel="noopener"
							className="text-white"
						>
							{movie.title}
						</Link>
					</h4>
				)}
			</div>

			<div className="movie-info-right flex flex-1 flex-col gap-4 text-left">
				<h1 className="tv-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex gap-2">
					{movie.title}
					<span className="year text-gray-400">
						({new Date(movie.release_date).getFullYear()})
					</span>
				</h1>

				<div className="flex gap-3 flex-wrap items-center">
					{movie?.videos && movie.videos.results.length > 0 && (
						<ModalVideos
							type="icon"
							video={movie.videos.results[0]}
							videos={movie.videos.results}
							title="Play Trailer"
						/>
					)}

					{movie?.genres.map((item) => (
						<Link
							key={item.id}
							href={`./genre/${item.id}`}
							className="genre h-9 bg-primary-500 py-1 px-5 !text-inherit	 border border-inherit rounded-full
							bg-transparent cursor-pointer whitespace-nowrap
							hover:bg-gray-500/30  dark:hover:bg-yellow-500"
							prefetch={false}
						>
							{item?.name}
						</Link>
					))}
				</div>

				<div className="movie-infos flex gap-3 flex-wrap">
					<div className="movie-status">
						<strong>Status: </strong> <span>{movie.status}</span>
					</div>
					<div className="release-date">
						<strong>Date: </strong>
						{movie.release_date}
					</div>
					{movie?.runtime && (
						<div className="movie-time">
							<strong>Time: </strong>
							{minutesToHoursMinutes(movie.runtime)}
						</div>
					)}
				</div>

				<div className="movie-static">
					<div className="movie-vote flex gap-2 items-center">
						<CircularProgress
							className=" bg-slate-700 rounded-full box-border"
							classNames={{
								svg: "w-16 h-16 drop-shadow-md",
								track: "stroke-white/10",
								value: "text-[18px] font-bold text-white",
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

						<div className="vote-count">{movie.vote_count} Votes</div>

						<Tooltip
							content={
								<div className="tooltip-content flex flex-col justify-center items-center">
									<div className="text-semibold">{`Vote Count: ${movie?.vote_count}`}</div>
									<div className="text-gray-500">Point: {vote.toFixed(2)} / 10</div>
								</div>
							}
							placement="right"
							showArrow={true}
						>
							<div className="rating ">
								<Rating rating={Math.round(vote / 2)} size="small" />
							</div>
						</Tooltip>
					</div>
				</div>

				<div className="movie-tag-line italic">{movie.tagline}</div>
				{movie.overview.length > 0 && (
					<div className="tv-overview flex flex-col items-start text-left">
						<h5>Overview</h5>
						<p className="line-clamp-5 max-w-4xl lg:line-clamp-7">{movie.overview}</p>
					</div>
				)}

				<div className="movie-language max-w-2xl flex gap-2 flex-wrap justify-between">
					<div className="tv-language flex gap-1">
						<strong>Languages: </strong>

						{movie.spoken_languages.map((language, index) => (
							<span key={language.iso_639_1}>
								{language.english_name}
								{index < movie.spoken_languages.length - 1 ? ", " : "."}
							</span>
						))}
					</div>

					<div className="tv-country flex gap-2">
						<strong>Countries:</strong>
						{movie.production_countries.map((country, index) => (
							<div key={index} className="country">
								{country.name}
							</div>
						))}
					</div>
				</div>

				<div className="max-w-2xl flex gap-2 flex-wrap justify-between">
					{movie.budget > 0 && (
						<div className="movie-budget flex gap-1">
							<strong>Budget: </strong>{" "}
							<span className="budget-value font-bold">
								{formatNumberCurrency(movie.budget)}
							</span>
						</div>
					)}

					{movie.revenue > 0 && (
						<div className="movie-revenue flex gap-1">
							<strong>Revenue: </strong>
							<span
								className={`revenue-value font-bold ${
									movie.revenue > movie.budget ? "text-green-400" : "text-orange-600"
								}`}
							>
								{formatNumberCurrency(movie.revenue)}
							</span>
						</div>
					)}
				</div>

				{movie.production_companies.length > 0 && (
					<div className="movie-companies w-auto flex items-center gap-2">
						<h5>Production Companies:</h5>
						<div className="companies flex overflow-x-auto lg:flex-wrap gap-4 items-center ">
							{movie.production_companies.map((company) => (
								<div
									key={company.id}
									className="company flex flex-col gap-1 justify-between"
								>
									<div
										className="company-logo bg-white dark:bg-slate-600 px-2 h-10
									rounded-full flex min-w-[96px] items-center border justify-center"
									>
										{company.logo_path ? (
											<Image
												src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
												alt={company.name}
												title={company.name}
												className="company-logo max-h-10"
											/>
										) : (
											<div
												title={company.name}
												className="company-name font-semibold text-sm whitespace-nowrap text-black dark:text-white"
											>
												{company.name}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
