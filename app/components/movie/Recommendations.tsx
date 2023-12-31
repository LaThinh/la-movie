"use client";
import { getRecommendations } from "@/app/api/FetchMovieDB";
import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";
import { IMovieItem } from "@/app/interfaces";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Recommendations({ movieId }: { movieId: string }) {
  const [listMovie, setListMovie] = useState<IMovieItem[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getRecommendations(movieId);
      setListMovie(data?.results);
    }

    getData();
  }, [movieId]);

  return (
    <div className="movie-recommend">
      {listMovie && listMovie.length > 0 && (
        <>
          <h3 className="pb-5 mb-5 border-b text-left text-lg lg:text-2xl">
            Recommendations Movies
          </h3>

          <Swiper
            className="mySwiper "
            spaceBetween={10}
            slidesPerView={1}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              // when window width is >= 480px
              360: {
                slidesPerView: 1.5,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              // when window width is >= 768px
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 18,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {listMovie.map((movie: IMovieItem) => (
              <SwiperSlide key={movie.id} className="w-[240px]">
                <CardMovie movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
