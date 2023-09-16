"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { memo } from "react";
import MovieTabInfo from "@/app/components/movie/MovieTabInfo";
import MovieTabVideo from "@/app/components/movie/MovieTabVideo";
import MovieTabPhotos from "@/app/components/movie/MovieTabPhotos";
import { IMovie } from "@/app/interfaces";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryIcon } from "@/app/icons/GalleryIcon";
import { VideoIcon } from "@/app/icons/VideoIcon";
import { Server, TagUser } from "@/app/icons/Icons";
import MovieTabReview from "@/app/components/movie/MovieTabReview";

export function MovieTabs({
  movieId,
  movie,
}: {
  movieId: string;
  movie: IMovie;
}) {
  return (
    <div className="flex w-full flex-col max-w-screen-2xl mx-auto my-10">
      <Tabs
        aria-label="Options"
        id="movie-tab"
        size="lg"
        color="primary"
        radius="full"
        variant="underlined"
        classNames={{
          tabList:
            "gap-2 lg:gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-2 py-2 h-12 text-sm font-semibold md:text-lg lg:text-2xl lg:px-6",
          tabContent:
            "group-data-[selected=true]:text-primary p-2 md:p-3 lg:p-5",
        }}
        defaultSelectedKey="photo"
      >
        <Tab
          key="photo"
          title={
            <div className="flex items-center space-x-2">
              <GalleryIcon />
              <span>Photos</span>
            </div>
          }
          id="tab-photo"
          aria-controls="tab-photos"
        >
          <Card>
            <CardBody>
              <MovieTabPhotos movieId={movieId} />
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="info"
          title={
            <div className="flex items-center space-x-2">
              <Server />
              <span>Information</span>
            </div>
          }
          id="tab-info"
          aria-controls="tab-infos"
        >
          <Card>
            <CardBody>
              <MovieTabInfo movie={movie} />
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="review"
          title={
            <div className="flex items-center space-x-2">
              <TagUser />
              <span>Reviews</span>
            </div>
          }
          id="tab-review"
          aria-controls="tab-reviews"
        >
          <Card>
            <CardBody>
              <MovieTabReview movieId={movieId} movie={movie} />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <VideoIcon />
              <span>All Videos</span>
            </div>
          }
          id="tab-videos"
          aria-controls="tab-videos"
        >
          <Card>
            <CardBody>
              Movie Video
              <MovieTabVideo movieId={movieId} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default memo(MovieTabs);
