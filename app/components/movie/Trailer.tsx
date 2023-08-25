"use client";
import { getVideosTrailer } from "@/app/api/FetchMovieDB";
import { IVideoItem, IVideos } from "@/app/interfaces";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { VideoIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

export function ModalVideo({
  video,
  videos,
}: {
  video: IVideoItem;
  videos?: IVideoItem[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currentVideo, setCurrentVideo] = useState(video);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handlePrevVideo = () => {
    if (videos?.length && videos.length > 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentVideo(videos[currentIndex - 1]);
    }
  };

  const handleNextVideo = () => {
    if (videos?.length && videos.length > currentIndex + 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentVideo(videos[currentIndex + 1]);
    }
  };

  video = currentVideo;

  // useEffect(() => {
  //   console.log(video.key);
  //   console.log("Set current index = " + currentIndex);
  // }, [currentVideo]);

  const handleSetCurrent = () => {
    const indexArray = videos?.findIndex((v) => v.key == video.key);
    setCurrentIndex(indexArray ? indexArray : 0);
    console.log("Set current index = " + indexArray);
  };

  return (
    <>
      <Button
        className="w-full flex flex-1 "
        onPress={onOpen}
        radius="none"
        title={video?.name}
        onClick={handleSetCurrent}
        startContent={<VideoIcon width={32} height={32} />}
        color={video?.site === "YouTube" ? "danger" : "primary"}
      >
        <span className="text-ellipsis overflow-hidden truncate text-left w-full">
          {video?.name}
        </span>
      </Button>
      <Modal
        backdrop="opaque"
        size="5xl"
        isOpen={isOpen}
        placement="center"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          closeButton: "top-3 right-3",
        }}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row flex-wrap gap-1 justify-center lg:justify-between items-center pr-12">
                <div className="video-title line-clamp-2 lg:whitespace-nowrap lg:truncate pr-8 lg:flex-1">
                  {video.site} | {video.name} | {video?.type}
                </div>

                {videos && videos.length > 1 && (
                  <div className="modal-control flex gap-2 w-36mr-5 items-center">
                    <Link
                      href="#"
                      onClick={handlePrevVideo}
                      isDisabled={currentIndex < 1}
                    >
                      Prev
                    </Link>
                    <div className="current-page text-sm">
                      {currentIndex + 1} / {videos?.length}
                    </div>
                    <Link
                      href="#"
                      onClick={handleNextVideo}
                      isDisabled={currentIndex > videos?.length - 2}
                    >
                      Next
                    </Link>
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="p-0">
                <iframe
                  className="w-full aspect-video"
                  allow="autoplay"
                  src={`https://www.youtube.com/embed/${video.key}?&autoplay=1`}
                ></iframe>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Trailer({
  movieId,
  limitDefault,
}: {
  movieId: string;
  limitDefault?: number;
}) {
  const [videos, setVideos] = useState<IVideoItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const limit = limitDefault || 6;

  useEffect(() => {
    async function getData() {
      const data = await getVideosTrailer(movieId);
      // console.log("Fetch Data Trailer");
      // console.log(data);
      setVideos(data?.results);
      setTotal(data?.results.length);
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

  return (
    <div className="movie-trailer @container my-10">
      <div className="flex justify-between item-center">
        <h4 className="text-xl my-5">Video Trailer: Total: {total} videos</h4>
        {total > limit && (
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
        )}
      </div>

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
                    <ModalVideo video={video} videos={videos} />
                  </div>
                )
            )}
          </div>
        </ScrollShadow>
      )}
    </div>
  );
}
