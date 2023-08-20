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
      console.log(data);
      //const listMovie = data?.results;
      setListMovie(data?.results);
    }

    getData();
  }, []);

  return (
    <div className="movie-recommend">
      {listMovie && listMovie.length > 0 && (
        <>
          <h3 className="text-3xl my-10 text-gray-700 text-left">
            Recommendations
          </h3>

          <Swiper
            className="mySwiper"
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              // when window width is >= 640px
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              // when window width is >= 480px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {listMovie.map((movie: IMovieItem) => (
              <SwiperSlide key={movie.id} className="w-[240px]">
                {/* {movie?.overview} */}
                <CardMovie movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
