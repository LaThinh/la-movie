"use client";
import React, { useEffect, useState } from "react";
import { IVideoItem } from "../interfaces";
import {
	Button,
	Image,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { PlayIcon, VideoIcon } from "@radix-ui/react-icons";

export default function ModalVideos({
	type,
	video,
	videos,
	title,
}: {
	type: "button" | "slider" | "icon" | "item";
	video: IVideoItem;
	videos?: IVideoItem[];
	title?: string;
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
			{type === "button" && (
				<Button
					className="w-full flex flex-1 font-semibold rounded-md bg-[#B4361B]"
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
			)}

			{type === "icon" && (
				<Button
					className="h-9 text-inherit border border-inherit"
					onPress={onOpen}
					radius="full"
					title={currentVideo?.name}
					startContent={<PlayIcon width={32} height={32} />}
					variant="light"
					// color={currentVideo?.site === "YouTube" ? "danger" : "primary"}
				>
					<span className="text-ellipsis overflow-hidden truncate text-left ">
						{title || currentVideo?.name}
					</span>
				</Button>
			)}

			{type === "slider" && (
				<div
					className="video-slider w-80 flex flex-col gap-2 border 
        bg-white dark:bg-primary-700 rounded-lg overflow-hidden border-gray-300 shadow-lg"
				>
					<Link
						className="video-link-image relative"
						onClick={onOpen}
						onPress={handleSetCurrent}
						title={video.name}
					>
						<Image
							width={320}
							height={220}
							alt={video.name}
							radius="none"
							loading="eager"
							isZoomed
							className="w-full aspect-video cursor-pointer"
							src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
						/>
						<div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
							<VideoIcon width={48} height={48} className="text-white" />
						</div>
					</Link>
					<div className="video-info py-2 px-3">
						<h3 className="video-title line-clamp-1 text-gray-700 dark:text-white">
							{video.name}
						</h3>
					</div>
				</div>
			)}

			{type === "item" && (
				<div
					className="video-item w-full flex flex-col gap-2 border rounded-lg overflow-hidden
        						bg-white dark:bg-primary-700  border-gray-300 shadow-lg"
				>
					<Link
						className="video-link-image relative w-full"
						onClick={onOpen}
						onPress={handleSetCurrent}
					>
						<Image
							width={640}
							height={360}
							alt={video.name}
							radius="none"
							loading="eager"
							isZoomed
							className=" aspect-video cursor-pointer"
							src={`https://img.youtube.com/vi/${video.key}/sddefault.jpg`}
						/>
						<div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
							<VideoIcon width={48} height={48} className="text-white" />
						</div>
					</Link>
					<div className="video-info py-2 px-3">
						<h3 className="video-title line-clamp-1 text-gray-700 dark:text-white">
							{video.name} - {video.type}
						</h3>
					</div>
				</div>
			)}

			<Modal
				backdrop="opaque"
				size="5xl"
				radius="lg"
				className="w-[96%] !rounded-sm lg:max-w-screen-2xl lg:w-[90%] lg:!rounded-xl overflow-hidden xl:max-w-[2048px] h-auto"
				isOpen={isOpen}
				placement="center"
				classNames={{
					backdrop: "bg-gradient-to-t from-zinc-700 to-zinc-900/50 backdrop-opacity-30",
					closeButton: "top-3 right-3 text-xl",
				}}
				scrollBehavior={"outside"}
				onOpenChange={onOpenChange}
				isDismissable={false}
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
								<div className="video-title line-clamp-1 lg:whitespace-nowrap truncate pr-8 lg:flex-1">
									{currentVideo.site} | {currentVideo.name} | {currentVideo?.type}
								</div>
								{videos && videos.length > 1 && (
									<div className="modal-control flex gap-2 w-36 mr-5 items-center">
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
