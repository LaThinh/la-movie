"use client";

import { IMediaItem } from "@/app/lib/interfaces";
import { Button, CircularProgress, Image } from "@nextui-org/react";
// import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getMovieNowPlaying } from "@/app/lib/fetchMovie";

function CircularPoint({ vote }: { vote: number }) {
	return (
		<>
			<CircularProgress
				className="absolute z-10 top-2 right-2 bg-white rounded-full box-border"
				classNames={{
					svg: "w-16 h-16 drop-shadow-md",
					track: "stroke-white/10",
					value: "text-[18px] font-bold text-primary-500",
				}}
				size="lg"
				maxValue={10}
				strokeWidth={3}
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

export default function MovieNowPlaying({
	dataMovie,
	lang,
}: {
	dataMovie?: IMediaItem[];
	lang: string;
}) {
	const [data, setData] = useState<IMediaItem[]>(dataMovie || []);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getMovieNowPlaying({ lang });
			const results: IMediaItem[] = await res?.results;
			if (results) {
				setData(results.splice(0, 8));
			}
		};
		fetchData();
	}, [lang]);

	return (
		<div className="movie-now-playing">
			<div className="max-w-full aspect-[2/3] md:aspect-[16/7] bg-gray-200 overflow-hidden">
				<Swiper
					className="mySwiper"
					slidesPerView={1}
					spaceBetween={0}
					grabCursor={true}
					centeredSlides={true}
					autoplay={{
						delay: 7000,
						disableOnInteraction: false,
					}}
					// effect={"crossFade"}
					// coverflowEffect={{
					// 	rotate: 50,
					// 	stretch: 0,
					// 	depth: 100,
					// 	modifier: 1,
					// 	slideShadows: true,
					// }}
					pagination={true}
					navigation={true}
					loop={true}
					modules={[Autoplay, Navigation, Pagination]}
				>
					{data.map((movie: IMediaItem, index) => {
						const linkDetail = `/${lang}/movie/${movie.id}`;
						const ReleaseDate = new Date(movie.release_date).getFullYear();

						return (
							<SwiperSlide
								key={movie.id}
								className={`slider-item flex flex-col w-8/12 rounded overflow-hidden`}
							>
								<div className="movie-banner relative overflow-hidden">
									<Image
										src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
										alt={movie?.title || "Title"}
										width={800}
										height={1200}
										className={`banner-mobile md:hidden object-cover aspect-[2/3] rounded-none`}
									/>

									<Image
										src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
										alt={movie?.title || "Title"}
										width={3200}
										height={1800}
										loading="lazy"
										className={`banner-desktop hidden md:block object-cover aspect-[16/7] rounded-none`}
									/>

									<div
										className={`movie-info bg-slate-700/50 backdrop-blur-sm p-4 rounded-xl
                                        absolute left-[5%] w-[90%] max-w-screen-sm bottom-10 top-auto z-10
                                        text-left flex flex-col justify-center lg:items-start items-center gap-5
                                        lg:p-8 xl:p-10 xl:max-w-screen-lg`}
									>
										<h2 className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl">
											{movie?.title}
											<span className="ml-2 text-gray-300">({ReleaseDate})</span>
										</h2>
										{/* <CircularPoint vote={movie?.vote_average || 0} /> */}
										<p className="line-clamp-5 text-sm lg:text-medium xl:text-lg font-primary text-gray-200">
											{movie?.overview}
										</p>
										<Button
											as={Link}
											href={linkDetail}
											variant="shadow"
											color="primary"
											radius="full"
											size="lg"
											aria-label="View Movie"
											className="w-auto hover:text-white"
											endContent={<ArrowRightIcon />}
										>
											View Movie
										</Button>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
}
