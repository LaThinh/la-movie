"use client";

import { GalleryIcon } from "@/app/icons/GalleryIcon";
import { Server, TagUser } from "@/app/icons/Icons";
import { getTVImages } from "@/app/lib/fetchTv";
import { ITV, ITVImages } from "@/app/lib/interfaces";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { VideoIcon } from "@radix-ui/react-icons";
import React, { memo, useEffect, useState } from "react";
import { TvTabPhotos } from "./TvTabPhotos";
import TVInfo from "./TVInfo";
import TvTabVideos from "./TvTabVideos";
import MovieTabCredits from "../movie/MovieTabCredits";

export function TvTabs({ tvId, tv, lang }: { tvId: string; tv: ITV; lang: string }) {
	const [tabSelected, setTabSelected] = useState<string>("photos");

	useEffect(() => {
		if (tabSelected) window.history.replaceState({}, "", "?tab=" + tabSelected);
	}, [tabSelected]);

	// console.log(tv);

	const hasTabImages =
		tv?.images &&
		tv.images.posters.length + tv.images.backdrops.length + tv.images.logos.length > 0;

	const hasTabVideos = tv?.videos && tv?.videos.results.length > 0;
	const hasTabCredits = tv?.credits && tv.credits?.cast && tv.credits.cast.length > 0;

	return (
		<div className="flex w-full flex-col max-w-screen-2xl mx-auto my-5 lg:my-10 ">
			<Tabs
				aria-label="Options"
				id="movie-tab"
				size="lg"
				color="primary"
				radius="full"
				variant="underlined"
				classNames={{
					tabList:
						"gap-2 lg:gap-6 w-full h-16 relative rounded-none p-0 border-b border-divider",
					cursor: "w-full bg-primary",
					tab: "max-w-fit h-10 text-sm font-semibold md:text-lg lg:text-xl",
					tabContent: "group-data-[selected=true]:text-primary p-2 md:p-3 lg:p-4",
				}}
				defaultSelectedKey={"photos"}
				selectedKey={tabSelected}
				className="sticky top-[65px] z-30 pt-2 bg-white dark:bg-background"
				// selectedKey={selected}
				onSelectionChange={(key: React.Key) => setTabSelected(key.toString())}
			>
				{hasTabImages && tv?.images && (
					<Tab
						key="photos"
						title={
							<div className="flex items-center gap-2">
								<GalleryIcon />
								<span>Photos</span>
							</div>
						}
						id="tab-photos"
						aria-label="Photos"
					>
						<Card>
							<CardBody>{<TvTabPhotos tvImages={tv.images} lang={lang} />}</CardBody>
						</Card>
					</Tab>
				)}

				{hasTabVideos && tv?.videos && (
					<Tab
						key="videos"
						title={
							<div className="flex items-center space-x-2">
								<VideoIcon />
								<span>Videos</span>
							</div>
						}
						id="tab-videos"
						aria-label="All Videos"
					>
						<Card>
							<CardBody>
								<TvTabVideos videos={tv.videos} />
							</CardBody>
						</Card>
					</Tab>
				)}

				{hasTabCredits && tv?.credits && (
					<Tab
						key="credits"
						title={
							<div className="flex items-center space-x-2">
								<TagUser />
								<span>Credits</span>
							</div>
						}
						id="tab-credits"
						aria-label={`Credits`}
					>
						<Card>
							<CardBody>
								<MovieTabCredits movieCredits={tv.credits} />
							</CardBody>
						</Card>
					</Tab>
				)}

				{/*movieReviews && movieReviews.results && movieReviews.results.length > 0 && (
					<Tab
						key="reviews"
						title={
							<div className="flex items-center space-x-2">
								<TagUser />
								<span>Reviews</span>
							</div>
						}
						id="tab-reviews"
						aria-label={`Reviews`}
					>
						<Card>
							<CardBody>
								<MovieTabReview reviews={movieReviews} movie={movie} />
							</CardBody>
						</Card>
					</Tab>
				)} */}

				<Tab
					aria-label="Information"
					id="tab-info"
					key="info"
					title={
						<div className="flex items-center space-x-2">
							<Server />
							<span>Information</span>
						</div>
					}
				>
					<Card>
						<CardBody className="p-0">
							<TVInfo tv={tv} />
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}

export default memo(TvTabs);
