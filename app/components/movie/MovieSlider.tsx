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
	const lang = params?.lang?.toString() || localStorage.getItem("lang") || "en";
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
							<div className="card-info p-3 h-20 bg-white dark:bg-slate-800 text-left">
								<strong
									className="font-semibold text-sm line-clamp-2 max-h-10 mb-1"
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
					))}
				</Swiper>
			)}
		</div>
	);
}

export default MovieSlider;
