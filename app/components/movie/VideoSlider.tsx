"use client";

import { IVideoItem, IVideos } from "@/app/interfaces";
import React from "react";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ModalVideos from "../ModalVideos";

export default function VideoSlider({
	videos,
	limit,
}: {
	videos: IVideoItem[];
	limit?: number;
}) {
	const limitItems = limit || 9;
	const total = videos.length;
	return (
		<>
			{total > 0 && (
				<div className="movie-trailer @container bg-gray-700 p-5">
					<h2 className="text-xl lg:text-2xl my-2 lg:my-5 text-white text-left">
						Video Trailer: Top: {Math.min(total, limitItems)} videos
					</h2>
					<Swiper
						slidesPerView={"auto"}
						spaceBetween={30}
						freeMode={true}
						pagination={{
							clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						className="mySwiper !pb-10"
					>
						{videos.map(
							(video, index) =>
								index < limitItems && (
									<SwiperSlide key={video.id} className="!w-80 max-w-[80%] flex">
										<div className="movie-trailer-item flex gap-2">
											<ModalVideos type="slider" video={video} videos={videos} />
										</div>
									</SwiperSlide>
								)
						)}
					</Swiper>
				</div>
			)}
		</>
	);
}
