import React from "react";

import { IVideos } from "@/app/interfaces";
import VideoSlider from "@/app/components/movie/VideoSlider";
import VideoGrid from "./VideoGrid";

export default function MovieTabVideo({
	videos,
	movieId,
}: {
	videos: IVideos;
	movieId: string;
}) {
	return (
		<div>
			{/* <VideoSlider videos={videos} limit={12} /> */}
			<div className="video-trailer block w-full">
				{/* <Trailer movieId={movieId} limitDefault={100} /> */}
				<VideoGrid videos={videos?.results} />
			</div>
		</div>
	);
}
