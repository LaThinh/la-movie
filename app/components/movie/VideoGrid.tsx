import { IVideoItem } from "@/app/interfaces";
import React from "react";
import ModalVideos from "../ModalVideos";

export default function VideoGrid({ videos }: { videos: IVideoItem[] }) {
	return (
		<div className="@container">
			<h3 className="video-title text-2xl lg:text-3xl mx-auto my-8">{`All ${videos.length} videos`}</h3>
			<div
				className="grid grid-cols-1 gap-3
          @2xl:grid-cols-2 @2xl:gap-5 @4xl:grid-cols-3 @4xl:gap-8"
			>
				{videos.map((video, index) => (
					<div className="movie-trailer-item flex gap-2" key={video.id}>
						{/* <ModalVideo video={video} videos={videos} /> */}
						<ModalVideos type={"item"} video={video} videos={videos} />
					</div>
				))}
			</div>
		</div>
	);
}
