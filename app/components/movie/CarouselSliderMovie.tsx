"use client";
import { IMovieItem, IMovieListPage } from "@/app/interfaces";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardMovie from "./CardMovie";
import {
	Autoplay,
	EffectCoverflow,
	Navigation,
	Pagination,
	Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function CarouselSliderMovie({
	movieList,
	lang,
}: {
	movieList: IMovieListPage;
	lang?: string;
}) {
	const language = lang || "en";

	return (
		<div>
			<div className="movie-recommend  mb-20">
				{movieList.results && movieList.results.length > 0 && (
					<>
						<h3 className="text-3xl  hidden my-5 text-gray-700 text-left">
							Popular Movies
						</h3>
						<div
							className="swiper-casousel-container max-w-full overflow-hidden py-10 
                  bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900"
						>
							<Swiper
								className="mySwiper swiper-carousel-movie !pt-5 !pb-10"
								spaceBetween={0}
								effect={"coverflow"}
								grabCursor={true}
								centeredSlides={true}
								slidesPerView={"auto"}
								autoplay={{
									delay: 5000,
									disableOnInteraction: false,
								}}
								coverflowEffect={{
									rotate: 50,
									stretch: 0,
									depth: 100,
									modifier: 1,
									slideShadows: true,
								}}
								keyboard={{
									enabled: true,
								}}
								pagination={{ clickable: true }}
								navigation={true}
								loop={true}
								modules={[EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard]}
							>
								{movieList.results.map((movie: IMovieItem) => (
									<SwiperSlide
										key={movie.id}
										className={`slider-item flex flex-col !w-[70%] max-w-[320px] overflow-hidden rounded-2xl `}
									>
										{/* {movie?.overview} */}
										<div className="movie-banner relative w-320 rounded-2xl overflow-hidden pb-36">
											<Link
												href={`${language}/movie/${movie.id}`}
												title={movie?.original_title}
											>
												<Image
													src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
													// width={500}
													// height={300}
													alt={movie?.title || "Title"}
													width={320}
													height={500}
													className={`image-slider-shadow aspect-[320/500]`}
													style={{ objectFit: "cover" }}
												/>
												<div className="movie-info absolute bottom-36 bg-gradient-to-t from-white from-50% vie-white/50 vie-70% to-transparent p-3 pt-20 text-left">
													<h3 className="text-c-primary font-bold text-xl hover:text-c-primary-light">
														{movie?.title}
													</h3>
													<p className="line-clamp-2 text-gray-500">{movie?.overview}</p>
												</div>
											</Link>
										</div>

										{/* <CardMovie movie={movie} /> */}
									</SwiperSlide>
								))}
							</Swiper>
						</div>{" "}
						{/*End div Swiper container */}
					</>
				)}
			</div>
		</div>
	);
}
