"use client";

import React from "react";
import { IMovieItem } from "@/app/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { convertToSlug } from "./CardMovie";

function MovieSlider({
  movieList,
  size,
}: {
  movieList: IMovieItem[];
  size?: "small" | "normal" | "large";
}) {
  const movies: IMovieItem[] = movieList.filter((movie) => {
    return movie.poster_path != null;
  });

  return (
    <div className="movie-slider max-w-full mb-5">
      {movies?.length && movies.length > 0 && (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          freeMode={true}
          //   pagination={{
          //     clickable: true,
          //   }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            //pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, FreeMode]}
          className="mySwiper pb-10 px-2"
        >
          {movies.map((movie, index) => (
            <SwiperSlide
              key={index}
              className="!w-[180px] rounded-lg border shadow-md overflow-hidden my-2"
            >
              <Link
                className="group relative block bg-gray-300 h-[270px]"
                href={`/movie/${movie?.id}-${convertToSlug(movie.title)}`}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
                  alt={movie?.title || "Title"}
                  sizes="100"
                  width={180}
                  height={270}
                  loading="eager"
                  radius="none"
                  isZoomed
                  //removeWrapper
                  // style={{ objectFit: "cover" }}
                  className="w-full object-cover m-auto h-[270px]"
                  //className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
                />
              </Link>
              <div className="card-info p-3 h-20 bg-white dark:bg-slate-800 text-left">
                <strong
                  className="font-semibold text-sm line-clamp-2 max-h-10 mb-1"
                  title={movie.title}
                >
                  {movie.title}
                </strong>
                {movie?.character && (
                  <p className="text-xs line-clamp-1" title={movie.character}>
                    {movie.character}
                  </p>
                )}
                {movie?.department && (
                  <p className="text-xs line-clamp-1" title={movie.department}>
                    {movie.department}
                  </p>
                )}
                <p className="text-sm hidden">
                  {movie.release_date.toString()}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default MovieSlider;
