"use client";
import { getVideosTrailer } from "@/app/api/FetchMovieDB";
import { IVideoItem, IVideos } from "@/app/interfaces";
import { Button, CircularProgress, ScrollShadow } from "@nextui-org/react";
import { VideoIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect, memo } from "react";
import ModalVideos from "@/app/components/ModalVideos";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const SliderVideos = ({
	movieId,
	language,
	limitDefault,
}: {
	movieId: string;
	language?: string;
	limitDefault?: number;
}) => {
	const [videos, setVideos] = useState<IVideoItem[]>([]);
	const [total, setTotal] = useState(-1);
	const [showAll, setShowAll] = useState(false);
	const [loading, setLoading] = useState(true);
	const limit = limitDefault || 6;

	useEffect(() => {
		async function getData() {
			const data = await getVideosTrailer({
				movieId: movieId,
				language: language,
			});
			setVideos(data?.results);
			setTotal(data?.results.length);
			setLoading(false);
		}
		getData();
	}, [movieId, language]);

	useEffect(() => {
		async function getVideoDefaultEN() {
			const data = await getVideosTrailer({
				movieId: movieId,
			});
			setVideos(data?.results);
			setTotal(data?.results.length);
			setLoading(false);
		}
		if (total == 0) {
			getVideoDefaultEN();
		}
	}, [movieId, total]);

	//const dataVideo: IVideos = await getVideosTrailer(movieId);
	//const videos = dataVideo.results;

	// useEffect(() => {
	//   console.log(showAll);
	// }, [showAll]);

	const handleLoadMore = () => {
		setShowAll(!showAll);
	};

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center p-10 m-5 min-h-[240px] color-primary-500 text-xl">
					Loading Trailer Videos...
				</div>
			) : (
				videos.length > 0 && (
					<div className="movie-trailer @container bg-gray-700 p-5">
						<h2 className="text-xl lg:text-2xl my-2 lg:my-5 text-white text-left">
							Video Trailer: Top: {Math.min(total, limit)} videos
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
									(index < limit || showAll) && (
										<SwiperSlide key={video.id} className="!w-80 max-w-[80%] flex">
											<div className="movie-trailer-item flex gap-2">
												{/* <ModalVideo video={video} videos={videos} /> */}
												<ModalVideos type="slider" video={video} videos={videos} />
											</div>
										</SwiperSlide>
									)
							)}
						</Swiper>
					</div>
				)
			)}
		</>
	);
};

export default memo(SliderVideos);
