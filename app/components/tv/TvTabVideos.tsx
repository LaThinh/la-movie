import React from "react";
import { IVideos } from "@/app/interfaces";
import ModalVideos from "../ModalVideos";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import VideoSlider from "./VideoSlider";

export default function TvTabVideos({ videos }: { videos: IVideos }) {
	return (
		<div>
			<VideoSlider videos={videos} limit={9} />
		</div>
	);
}
