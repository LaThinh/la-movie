"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";
import { CircularProgress, Image } from "@nextui-org/react";
import { convertToSlug } from "@/app/lib/utils";
import { useParams } from "next/navigation";
import { IMediaItem } from "@/app/lib/interfaces";

function CircularPoint({ vote }: { vote: number }) {
	return (
		<>
			<CircularProgress
				className="absolute z-10 -bottom-3 right-1 bg-white rounded-full box-border"
				classNames={{
					svg: "w-10 h-10 drop-shadow-md",
					track: "stroke-white/10",
					value: "text-[12px] font-bold text-primary-500",
				}}
				size="lg"
				maxValue={10}
				strokeWidth={2}
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
		</>
	);
}

export default function MediaSlider({
	movieList,
	size,
	autoPlay,
	loop,
}: {
	movieList: IMediaItem[];
	size?: "small" | "normal" | "large";
	autoPlay?: boolean;
	loop?: boolean;
}) {
	const movies: IMediaItem[] = movieList.filter((movie) => {
		return movie.poster_path != null;
	});

	const params = useParams();
	const lang = params?.lang?.toString() || "en";

	if (!movies || movies.length < 1) {
		return <div>No Media Item</div>;
	}

	const classSize = size && size === "small" ? "!w-[162px]" : "!w-[180px]";

	return (
		<div className="movie-slider max-w-full">
			<Swiper
				slidesPerView={"auto"}
				spaceBetween={20}
				//   pagination={{
				//     clickable: true,
				//   }}
				autoplay={{
					delay: autoPlay ? 5000 : 900000,
					disableOnInteraction: false,
					//pauseOnMouseEnter: true,
				}}
				loop={loop}
				freeMode={true}
				// navigation={true}
				// autoplay={false}
				modules={[Pagination, FreeMode, Autoplay]}
				className="mySwiper pb-10 px-2"
			>
				{movies.map((movie, index) => {
					let vote = movie?.vote_average ? movie.vote_average : 0;

					return (
						<SwiperSlide
							key={index}
							className={` rounded-lg border shadow-md overflow-hidden my-2 ${classSize}`}
						>
							<Link
								className="group relative block bg-gray-300 aspect-[2/3]"
								href={`/${lang}/movie/${movie?.id}-${convertToSlug(
									movie?.title || movie?.name || "title"
								)}`}
								prefetch={false}
							>
								<Image
									src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
									alt={movie?.title || "Title"}
									sizes="100"
									width={180}
									height={270}
									loading="eager"
									radius="none"
									isZoomed
									//removeWrapper
									// style={{ objectFit: "cover" }}
									className="w-full aspect-[2/3] object-cover m-auto"
									//className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
								/>
								<span
									className="absolute top-1 left-1 w-9 rounded-lg z-10 aspect-square 
									flex items-center justify-center bg-white/90 backdrop-blur-md font-bold text-lg text-black"
								>
									{index < 10 ? "#" + (index + 1) : index + 1}
								</span>
								<CircularPoint vote={vote} />
							</Link>
							<div className="card-info p-2 py-3 h-20 bg-white dark:bg-slate-800 text-left">
								<strong
									className="font-semibold text-sm line-clamp-2"
									title={movie.title}
								>
									{movie.title || movie?.name || "Title"}
								</strong>
								{movie?.character && (
									<p className="text-xs line-clamp-1" title={movie.character}>
										{movie.character}
									</p>
								)}
								{movie?.department && (
									<p className="text-xs line-clamp-1" title={movie.department}>
										{movie.department}
									</p>
								)}
								<p className="text-sm ">{movie?.release_date?.toString() || ""}</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
