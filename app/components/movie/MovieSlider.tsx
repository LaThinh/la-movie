"use client";

import React from "react";
import { IMovieItem } from "@/app/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { convertToSlug } from "@/app/lib/utils";
import { useParams } from "next/navigation";

function MovieSlider({
	movieList,
	size,
	autoPlay,
	loop,
}: {
	movieList: IMovieItem[];
	size?: "small" | "normal" | "large";
	autoPlay?: boolean;
	loop?: boolean;
}) {
	const movies: IMovieItem[] = movieList.filter((movie) => {
		return movie.poster_path != null;
	});

	const params = useParams();
	const lang = params?.lang?.toString() || "en";
	const classSize = size && size === "small" ? "!w-[162px]" : "!w-[180px]";

	return (
		<div className="movie-slider max-w-full">
			{movies?.length && movies.length > 0 && (
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
					{movies.map((movie, index) => (
						<SwiperSlide
							key={index}
							className={` rounded-lg border shadow-md overflow-hidden my-2 ${classSize}`}
						>
							<Link
								className="group relative block bg-gray-300 h-[270px]"
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
									className="w-full aspect-[2/3] object-cover m-auto h-[270px]"
									//className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
								/>
							</Link>
							<div className="card-info p-2 max-h-24 flex flex-col gap-2 justify-between bg-white dark:bg-slate-800 text-left">
								<strong
									className="font-semibold text-sm line-clamp-2 inline-block w-full align-bottom"
									title={movie.title}
								>
									<span className="inline align-bottom leading-4">
										{movie.title || movie?.name || "Title"}
									</span>
									{movie?.character && (
										<span
											className="inline align-bottom text-xs line-clamp-1 leading-[14px] ml-1 text-gray-500"
											title={movie.character}
										>
											- {movie.character}
										</span>
									)}
								</strong>

								{movie?.department && (
									<p className="text-xs line-clamp-1" title={movie.department}>
										{movie.department}
									</p>
								)}

								<div className="bottom-info flex justify-between gap-1 items-end">
									<p className="text-sm" title="Release Date">
										{movie?.release_date?.toString() || "Release Date"}
									</p>
									<div className="vote-average font-bold" title="Vote Average">
										{movie.vote_average?.toFixed(1)}
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}

export default MovieSlider;
