import { getMovieReviews } from "@/app/api/FetchMovieDB";
import { IMovie, IMovieReviews } from "@/app/interfaces";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "swiper/modules";
import Rating from "./Rating";

export default function MovieTabReview({
  movieId,
  movie,
}: {
  movieId: string;
  movie: IMovie;
}) {
  const [reviews, setReviews] = useState<IMovieReviews>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getMovieReviews({ movieId: movieId, language: "vi" });
      setReviews(data);
      setLoading(false);
    };

    getReviews();
  }, []);

  console.log(reviews);

  return (
    <div className="movie-reviews">
      {loading && (
        <div className="text-primary-500 p-5 text-center text-xl">
          Loading review <Spinner />
        </div>
      )}
      {reviews?.results && reviews.results.length > 0 && (
        <div>
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
