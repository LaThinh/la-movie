"use client";
import { IMovieItem, IMovieListPage } from "@/app/interfaces";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CardMovie from "./CardMovie";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function CarouselSlider2({ movieList }: { movieList: IMovieListPage }) {
	return (
		<div>
			<div className="movie-recommend  mb-20">
				{movieList.results && movieList.results.length > 0 && (
					<>
						<h3 className="text-3xl hidden my-2 text-gray-700 text-left">
							Polular Movie Type 2 Page {movieList?.page} Total {movieList?.total_results}
						</h3>
						<div className="max-w-full overflow-hidden py-4 rounded-2xl">
							<Swiper
								className="mySwiper swiper-carousel-movie !pt-5 !pb-5"
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
								pagination={false}
								navigation={true}
								loop={true}
								modules={[EffectCoverflow, Autoplay, Navigation]}
							>
								{movieList.results.map((movie: IMovieItem) => (
									<SwiperSlide
										key={movie.id}
										className={`slider-item flex flex-col max-w-[700px] overflow-hidden rounded-2xl `}
									>
										{/* {movie?.overview} */}
										<div className="movie-banner relative w-[700px] rounded-2xl overflow-hidden pb-24">
											<Link href={`/movie/${movie.id}`} title={movie?.original_title}>
												<Image
													src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
													// width={500}
													// height={300}
													alt={movie?.title || "Title"}
													width={700}
													height={500}
													className={`image-slider-shadow`}
													style={{ objectFit: "contain" }}
												/>
												<div className="movie-info absolute bottom-24 bg-white/80 p-3 text-left">
													<h3 className="text-gray-700 font-bold text-xl">
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
