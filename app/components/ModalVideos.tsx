"use client";
import React, { useEffect, useState } from "react";
import { IVideoItem } from "../interfaces";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { VideoIcon } from "@radix-ui/react-icons";

export default function ModalVideos({
  video,
  videos,
}: {
  video: IVideoItem;
  videos?: IVideoItem[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentVideo, setCurrentVideo] = useState(video);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  //video = currentVideo;

  //   useEffect(() => {
  //     console.log(video.key);
  //     //setCurrentVideo(video);
  //     console.log("Set current index = " + currentIndex);
  //   }, [currentVideo]);

  const handleSetCurrent = () => {
    const indexArray = videos?.findIndex((v) => v.key == video.key);
    setCurrentIndex(indexArray ? indexArray : 0);
    console.log("Set current index = " + indexArray);
  };

  if (!currentVideo) {
    return <div>No Videos</div>;
  }

  return (
    <>
      <Button
        className="w-full flex flex-1 "
        onPress={onOpen}
        radius="none"
        title={currentVideo?.name}
        onClick={handleSetCurrent}
        startContent={<VideoIcon width={32} height={32} />}
        color={currentVideo?.site === "YouTube" ? "danger" : "primary"}
      >
        <span className="text-ellipsis overflow-hidden truncate text-left w-full">
          {currentVideo?.name}
        </span>
      </Button>
      <Modal
        backdrop="opaque"
        size="full"
        radius="lg"
        className="w-[96%] max-h-[90%] !rounded-sm lg:max-w-7xl lg:w-[90%] lg:!rounded-xl overflow-hidden xl:max-w-screen-2xl h-auto"
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
              <ModalHeader className="flex flex-row flex-wrap gap-1 justify-center lg:justify-between items-center lg:pr-12">
                <div className="video-title line-clamp-2 lg:whitespace-nowrap lg:truncate pr-8 lg:flex-1">
                  {currentVideo.site} | {currentVideo.name} |{" "}
                  {currentVideo?.type}
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
                  src={`https://www.youtube.com/embed/${currentVideo.key}?&autoplay=1`}
                ></iframe>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
