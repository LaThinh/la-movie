import { getVideosTrailer } from "@/app/api/FetchMovieDB";
import { IVideos } from "@/app/interfaces";
import React, { useState, useEffect } from "react";

export default async function Trailer({ movieId }: { movieId: string }) {
  //   const [videos, setVideos] = useState<IVideos>();

  //   useEffect(() => {
  //     async function getData() {
  //       const data = await getVideosTrailer(movieId);
  //       console.log(data);
  //       //const listMovie = data?.results;
  //       setVideos(data?.results);
  //     }

  //     getData();
  //   }, []);

  const dataVideo: IVideos = await getVideosTrailer(movieId);
  const videos = dataVideo.results;

  console.log(videos);

  return (
    <div className="movie-trailer flex flex-col">
      {videos.length > 0 &&
        videos.map((video) => (
          <div className="movie-trailer-item flex gap-2" key={video.id}>
            <span>
              Size: {video?.site}
              key: {video?.key}
            </span>
            <span>{video?.name}</span>
          </div>
        ))}
    </div>
  );
}
