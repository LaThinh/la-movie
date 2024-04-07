import { ITV } from "@/app/lib/interfaces";
import { CircularProgress, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Rating from "../movie/Rating";
import ModalVideos from "../ModalVideos";

export default function TVInfo({ tv }: { tv: ITV }) {
	let vote = tv?.vote_average ? tv.vote_average : 0;

	return (
		<div className="tv-info p-5 lg:p-10 flex gap-5 flex-col md:flex-row md:gap-10">
			<div
				className="movie-poster-image w-full hidden 
				sm:flex flex-col gap-5 justify-center items-center
				md:w-72 xl:w-80 md:aspect-[2/3]  "
			>
				<Image
					src={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
					alt={tv.name}
					width={300}
					height={450}
					loading="eager"
					radius="none"
					removeWrapper
					className="w-full max-w-xs lg:max-w-md rounded-lg shadow-xl bg-slate-300"
				/>

				{tv?.homepage && (
					<h4 className="home-page text-xl text-center hidden md:block">
						<Link
							href={tv.homepage}
							target="_blank"
							rel="noopener"
							className="text-white"
						>
							{tv.name}
						</Link>
					</h4>
				)}
			</div>

			<div className="movie-info-right flex flex-1 flex-col gap-4 text-left">
				<h1 className="tv-title text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex gap-2">
					{tv.name}
					<span className="year text-gray-400">
						({new Date(tv.first_air_date).getFullYear()})
					</span>
				</h1>

				<div className="flex gap-3 flex-wrap items-center">
					{tv?.videos && tv.videos.results.length > 0 && (
						<ModalVideos
							type="icon"
							video={tv.videos.results[0]}
							videos={tv.videos.results}
							title="Play Trailer"
						/>
					)}

					{tv?.genres.map((item) => (
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

				<div className="tv-static">
					<div className="tv-vote flex gap-2 items-center">
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

						<div className="vote-count">{tv.vote_count} Votes</div>

						<Tooltip
							content={
								<div className="tooltip-content flex flex-col justify-center items-center">
									<div className="text-semibold">{`Vote Count: ${tv?.vote_count}`}</div>
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

				{tv.overview.length > 0 && (
					<div className="tv-overview flex flex-col items-start text-left">
						<h5>Overview</h5>
						<p className="line-clamp-3 max-w-4xl lg:line-clamp-5">{tv.overview}</p>
					</div>
				)}

				<div className="tv-type max-w-3xl flex gap-2 flex-wrap justify-between">
					<div className="tv-type">
						<strong>Type: </strong> <span>{tv.type}</span>
					</div>
					<div className="tv-status">
						<strong>Status: </strong> <span>{tv.status}</span>
					</div>
				</div>

				<div className="tv-language max-w-3xl flex gap-2 flex-wrap justify-between">
					<div className="tv-language">
						<strong>Languages: </strong>
						{tv.spoken_languages.map((language) => (
							<span key={language.iso_639_1}>{language.english_name}</span>
						))}
					</div>

					<div className="tv-country flex gap-2">
						<strong>Countries:</strong>
						{tv.production_countries.map((country) => (
							<div key={country.iso_3166_1} className="country">
								{country.name}
							</div>
						))}
					</div>
				</div>

				{tv.networks.length > 0 && (
					<div className="tv-networks flex gap-2 items-center">
						<h5>Networks: </h5>
						<div className="networks flex gap-4 items-center">
							{tv.networks.map((item) => (
								<div
									key={item.id}
									className="network flex flex-col gap-1 justify-between "
								>
									<div className="network-logo bg-white dark:bg-slate-300 p-2 rounded-full flex items-center h-9">
										{item.logo_path ? (
											<Image
												src={`https://image.tmdb.org/t/p/w92${item.logo_path}`}
												alt={item.name}
												title={item.name}
												className="company-logo max-h-8"
											/>
										) : (
											<div
												title={item.name}
												className="network-name text-sm text-center text-gray-700"
											>
												{item.name}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{tv.created_by.length > 0 && (
					<div className="tv-created flex flex-wrap gap-2">
						<h5>Created By: </h5>
						{tv.created_by.map((creator) => (
							<div className="creator" key={creator.id}>
								<Link
									href={`../person/${creator.id}`}
									className="creator text-inherit hover:text-inherit hover:underline"
								>
									{creator.name}
								</Link>
							</div>
						))}
					</div>
				)}

				{tv.production_companies.length > 0 && (
					<div className="tv-companies flex items-center gap-2">
						<h5>Production Companies:</h5>
						<div className="companies flex overflow-x-auto lg:flex-wrap gap-4 items-center ">
							{tv.production_companies.map((company) => (
								<div
									key={company.id}
									className="company flex flex-col gap-1 justify-between"
								>
									<div
										className="company-logo bg-white dark:bg-slate-300 p-2 h-9
									rounded-full flex  items-center border"
									>
										{company.logo_path ? (
											<Image
												src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
												alt={company.name}
												title={company.name}
												className="company-logo max-w-24 max-h-9"
											/>
										) : (
											<div
												title={company.name}
												className="company-name text-sm font-bold whitespace-nowrap	 text-gray-700 dark:text-white px-4"
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
