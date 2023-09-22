import { getMovieReviews } from "@/app/api/FetchMovieDB";
import { IMovie, IMovieReviews } from "@/app/interfaces";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "swiper/modules";
import Rating from "./Rating";

export default function MovieTabReview({
  reviews,
  movie,
}: {
  reviews: IMovieReviews;
  movie: IMovie;
}) {
  return (
    <div className="tab-reviews flex flex-col lg:flex-row gap-5 m-auto max-w-screen-xl xl:gap-10 lg:p-5 relative">
      <div className="tab-movie-sidebar hidden lg:w-1/4 lg:flex lg:max-w-[300px] sticky top-[200px]">
        <div className="movie-poster-image w-full aspect-[2/3] flex flex-col gap-5 pt-20">
          <Image
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            loading="eager"
            radius="none"
            removeWrapper
            className="w-full rounded-lg shadow-xl bg-slate-300"
          />
          <h4 className="text-xl text-center">{movie.original_title}</h4>
        </div>
      </div>

      {reviews?.results && reviews.results.length > 0 && (
        <div className="tab-movie-content lg:flex-1">
          <h3 className="text-primary-500 my-3 lg:mb-5 lg:text-xl">
            Reviews Movie: {movie.title}
          </h3>
          <div className="flex flex-col gap-5 lg:gap-10 m-auto">
            {reviews.results.map((review, index) => (
              <div key={index}>
                <Card>
                  <CardHeader className="card-header px-5 flex gap-5 align-middle justify-between bg-gray-200 dark:bg-slate-700">
                    <div className="flex gap-4 align-middle items-center">
                      <Avatar
                        isBordered
                        src={`${
                          review.author_details?.avatar_path
                            ? "https://image.tmdb.org/t/p/w45_and_h45_face" +
                              review.author_details.avatar_path
                            : ""
                        }`}
                        name={review.author}
                      />
                      <h4>{review.author}</h4>
                    </div>
                    <Rating rating={review.author_details.rating / 2} />
                  </CardHeader>
                  <CardBody className="p-0">
                    <ScrollShadow className="review-content p-3 lg:p-5w-full max-h-[300px]">
                      {review.content}
                      <Link href={review.url} target="_blank">
                        The Movie BD Link
                      </Link>
                    </ScrollShadow>
                  </CardBody>
                  <CardFooter>
                    <div>{review?.created_at.toString()}</div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
