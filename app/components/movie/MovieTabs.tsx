"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { memo, useEffect, useState } from "react";
import MovieTabInfo from "@/app/components/movie/MovieTabInfo";
import MovieTabVideo from "@/app/components/movie/MovieTabVideo";
import MovieTabPhotos from "@/app/components/movie/MovieTabPhotos";
import { ICredits, IMovie, IMovieImages, IMovieReviews } from "@/app/interfaces";
import { GalleryIcon } from "@/app/icons/GalleryIcon";
import { VideoIcon } from "@/app/icons/VideoIcon";
import { Server, TagUser } from "@/app/icons/Icons";
import MovieTabReview from "@/app/components/movie/MovieTabReview";
import MovieTabCredits from "./MovieTabCredits";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MovieTabs({ movieId, movie }: { movieId: string; movie: IMovie }) {
	// const searchParams = useSearchParams();
	const [tabSelected, setTabSelected] = useState<string>();

	useEffect(() => {
		if (tabSelected) window.history.replaceState({}, "", "?tab=" + tabSelected);
	}, [tabSelected]);

	const totalImages = movie?.images
		? movie.images.backdrops.length +
		  movie.images.posters.length +
		  movie.images.logos.length
		: 0;

	const hasTabImages = movie?.images && totalImages > 0;

	const hasTabVideos = movie?.videos && movie.videos.results.length > 0;
	const hasTabCredits =
		movie?.credits && movie.credits.cast && movie.credits.cast.length > 0;

	const tabSelectDefault = hasTabImages ? "photos" : hasTabVideos ? "videos" : "info";

	return (
		<div>
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
					defaultSelectedKey={tabSelectDefault}
					selectedKey={tabSelected}
					className="sticky top-[65px] z-30 pt-2 bg-white dark:bg-background"
					// selectedKey={selected}
					onSelectionChange={(key: React.Key) => setTabSelected(key.toString())}
				>
					{movie?.images && hasTabImages && (
						<Tab
							key="photos"
							title={
								<div className="flex items-center gap-2">
									<GalleryIcon />
									<span>Photos ({totalImages})</span>
								</div>
							}
							id="tab-photos"
							aria-label="Photos"
						>
							<Card>
								<CardBody>
									<MovieTabPhotos movieImages={movie.images} title={movie.title} />
								</CardBody>
							</Card>
						</Tab>
					)}

					{movie?.videos && hasTabVideos && (
						<Tab
							key="videos"
							title={
								<div className="flex items-center space-x-2">
									<VideoIcon />
									<span>Videos ({movie.videos.results.length})</span>
								</div>
							}
							id="tab-videos"
							aria-label="All Videos"
						>
							<Card>
								<CardBody>
									<MovieTabVideo videos={movie.videos} movieId={movieId} />
								</CardBody>
							</Card>
						</Tab>
					)}

					{movie?.credits && hasTabCredits && (
						<Tab
							key="credits"
							title={
								<div className="flex items-center space-x-2">
									<TagUser />
									<span>
										Credits ({movie.credits.cast.length + movie.credits.crew.length})
									</span>
								</div>
							}
							id="tab-credits"
							aria-label={`Credits`}
						>
							<Card>
								<CardBody>
									<MovieTabCredits movieCredits={movie.credits} />
								</CardBody>
							</Card>
						</Tab>
					)}

					{movie?.reviews && movie.reviews.results.length > 0 && (
						<Tab
							key="reviews"
							title={
								<div className="flex items-center space-x-2">
									<TagUser />
									<span>Reviews ({movie.reviews.results.length})</span>
								</div>
							}
							id="tab-reviews"
							aria-label={`Reviews`}
						>
							<Card>
								<CardBody>
									<MovieTabReview reviews={movie.reviews} movie={movie} />
								</CardBody>
							</Card>
						</Tab>
					)}

					<Tab
						key="info"
						title={
							<div className="flex items-center space-x-2">
								<Server />
								<span>Information</span>
							</div>
						}
						id="tab-info"
						aria-label="Information"
					>
						<Card>
							<CardBody>
								<MovieTabInfo movie={movie} />
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}

export default memo(MovieTabs);
