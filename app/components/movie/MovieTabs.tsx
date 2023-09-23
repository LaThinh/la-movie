"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import MovieTabInfo from "@/app/components/movie/MovieTabInfo";
import MovieTabVideo from "@/app/components/movie/MovieTabVideo";
import MovieTabPhotos from "@/app/components/movie/MovieTabPhotos";
import {
  ICredits,
  IMovie,
  IMovieImages,
  IMovieReviews,
} from "@/app/interfaces";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryIcon } from "@/app/icons/GalleryIcon";
import { VideoIcon } from "@/app/icons/VideoIcon";
import { Server, TagUser } from "@/app/icons/Icons";
import MovieTabReview from "@/app/components/movie/MovieTabReview";
import MovieTabCredits from "./MovieTabCredits";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getMovieCredits,
  getMovieImages,
  getMovieReviews,
} from "@/app/api/FetchMovieDB";

export function MovieTabs({
  movieId,
  movie,
}: {
  movieId: string;
  movie: IMovie;
}) {
  const searchParams = useSearchParams();
  const [tabSelected, setTabSelected] = useState<string>();
  const [movieImages, setMovieImages] = useState<IMovieImages>();
  const [movieCredits, setMovieCredits] = useState<ICredits>();
  const [movieReviews, setMovieReviews] = useState<IMovieReviews>();

  useEffect(() => {
    const getMovieTabsData = async () => {
      const dataReviews = await getMovieReviews({
        movieId: movieId,
        language: "en",
      });
      const dataImages = await getMovieImages({
        movieId: movieId,
        language: "en",
      });
      const dataCredits = await getMovieCredits({
        movieId: movieId,
        language: "en",
      });

      setMovieImages(dataImages);
      setMovieReviews(dataReviews);
      setMovieCredits(dataCredits);
    };

    getMovieTabsData();
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam.length > 0) {
      setTabSelected(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (tabSelected) window.history.pushState({}, "", "?tab=" + tabSelected);
  }, [tabSelected]);

  return (
    <div>
      <div className="flex w-full flex-col max-w-screen-2xl mx-auto my-10 ">
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
            tab: "max-w-fit px-2 py-2 h-10 text-sm font-semibold md:text-lg lg:text-2xl lg:px-4",
            tabContent:
              "group-data-[selected=true]:text-primary p-2 md:p-3 lg:p-5",
          }}
          defaultSelectedKey={"info"}
          selectedKey={tabSelected}
          className="sticky top-[65px] z-30 pt-2 bg-white dark:bg-background"
          // selectedKey={selected}
          onSelectionChange={(key: React.Key) => setTabSelected(key.toString())}
        >
          <Tab
            key="info"
            title={
              <div className="flex items-center space-x-2">
                <Server />
                <span>Information</span>
              </div>
            }
            id="tab-info"
            aria-controls="info"
            aria-label="Tab Info"
          >
            <Card>
              <CardBody>
                <MovieTabInfo movie={movie} />
              </CardBody>
            </Card>
          </Tab>

          {movieImages &&
            (movieImages?.posters ||
              movieImages?.backdrops ||
              movieImages?.logos) && (
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                    <GalleryIcon />
                    <span>Photos</span>
                    <span className="font-normal text-gray-400 hidden">
                      (
                      {movieImages.backdrops.length +
                        movieImages.logos.length +
                        movieImages.posters.length}
                      )
                    </span>
                  </div>
                }
                id="tab-photos"
                aria-controls="tab-photos"
                aria-label="Tab Photo"
              >
                <Card>
                  <CardBody>
                    <MovieTabPhotos movieImages={movieImages} />
                  </CardBody>
                </Card>
              </Tab>
            )}

          {movieCredits &&
            movieCredits?.cast &&
            movieCredits.cast.length > 0 && (
              <Tab
                key="credits"
                title={
                  <div className="flex items-center space-x-2">
                    <TagUser />
                    <span>Credits</span>
                    <span className="font-normal text-gray-400">
                      ({movieCredits.cast.length})
                    </span>
                  </div>
                }
                id="tab-credits"
                aria-controls="tab-credits"
                aria-label="Tab Credits"
              >
                <Card>
                  <CardBody>
                    {/* <MovieTabVideo movieId={movieId} /> */}
                    <MovieTabCredits movieCredits={movieCredits} />
                  </CardBody>
                </Card>
              </Tab>
            )}

          {movieReviews &&
            movieReviews.results &&
            movieReviews.results.length > 0 && (
              <Tab
                key="reviews"
                title={
                  <div className="flex items-center space-x-2">
                    <TagUser />
                    <span>Reviews</span>
                    <span className="font-normal text-gray-400">
                      ({movieReviews.results.length})
                    </span>
                  </div>
                }
                id="tab-reviews"
                aria-controls="tab-reviews"
                aria-label="Tab Reviews"
              >
                <Card>
                  <CardBody>
                    <MovieTabReview reviews={movieReviews} movie={movie} />
                  </CardBody>
                </Card>
              </Tab>
            )}

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
            aria-label="Tab Videos"
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
    </div>
  );
}

export default memo(MovieTabs);
