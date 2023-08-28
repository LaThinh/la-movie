"use client";
import { getVideosTrailer } from "@/app/api/FetchMovieDB";
import { IVideoItem, IVideos } from "@/app/interfaces";
import { Button, CircularProgress, ScrollShadow } from "@nextui-org/react";
import { VideoIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect, useMemo, memo } from "react";
import ModalVideos from "../ModalVideos";

const Trailer = ({
  movieId,
  limitDefault,
}: {
  movieId: string;
  limitDefault?: number;
}) => {
  const [videos, setVideos] = useState<IVideoItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const limit = limitDefault || 6;

  useEffect(() => {
    async function getData() {
      const data = await getVideosTrailer(movieId);
      // console.log("Fetch Data Trailer");
      // console.log(data);
      setVideos(data?.results);
      setTotal(data?.results.length);
      setLoading(false);
    }
    getData();
  }, [limit]);

  //const dataVideo: IVideos = await getVideosTrailer(movieId);
  //const videos = dataVideo.results;

  // useEffect(() => {
  //   console.log(showAll);
  // }, [showAll]);

  const handleLoadMore = () => {
    setShowAll(!showAll);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10 m-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="movie-trailer @container my-10">
      {total > limit && (
        <div className="flex justify-between item-center">
          <h4 className="text-xl my-5">Video Trailer: Total: {total} videos</h4>

          <Button
            className="my-5 w-32 hover:bg-blue-500 hover:text-white"
            spinner
            color="primary"
            variant="bordered"
            spinnerPlacement="end"
            onClick={handleLoadMore}
          >
            {showAll ? "Show less" : "Show All"}
          </Button>
        </div>
      )}
      {videos.length > 0 && (
        <ScrollShadow
          hideScrollBar={true}
          className="scroll-list h-full max-h-[400px] pb-10"
        >
          <div
            className="grid grid-cols-2 gap-2 
          @sm:grid-cols-2 @sm:gap-3 
          @2xl:grid-cols-3 @xl:gap-4
          @4xl:grid-cols-4 @4xl:gap-5
          @6xl:grid-cols-5 @7xl:grid-cols-6
          "
          >
            {videos.map(
              (video, index) =>
                (index < limit || showAll) && (
                  <div className="movie-trailer-item flex gap-2" key={video.id}>
                    {/* <ModalVideo video={video} videos={videos} /> */}
                    <ModalVideos
                      type={"button"}
                      video={video}
                      videos={videos}
                    />
                  </div>
                )
            )}
          </div>
        </ScrollShadow>
      )}
    </div>
  );
};

export default memo(Trailer);
