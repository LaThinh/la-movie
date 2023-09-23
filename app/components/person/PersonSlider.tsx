"use client";

import React, { memo } from "react";
import PropTypes from "prop-types";
import { IPeople } from "@/app/interfaces";
import Loading from "@/app/components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Link from "next/link";
import { convertToSlug } from "@/app/utils/iString";
import { Image } from "@nextui-org/react";

PersonSlider.propTypes = {};

function PersonSlider({ personList }: { personList: IPeople[] }) {
  const isViewMore = personList.length > 10 ? true : false;
  personList = personList.slice(0, 10);

  return (
    <div>
      {!personList && <Loading text="Loading Casts" />}
      {personList?.length && personList.length > 0 && (
        <div className="px-3 lg:px-5">
          <h2 className="my-3 pb-2 text-left text-lg lg:text-2xl border-b">
            Top {personList.length} Billed Cast
          </h2>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={18}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              800: {
                spaceBetween: 22,
              },
              1400: {
                spaceBetween: 30,
              },
            }}
            className="mySwiper pb-10 px-2 lg:px-5"
          >
            {personList.map((person, index) => (
              <SwiperSlide
                key={index}
                id={`person-${person.id}`}
                className="!w-[110px] lg:!w-[187px] my-2 
                rounded-lg border shadow-md overflow-hidden "
              >
                <Link
                  className="group relative block bg-gray-300 aspect-[2/3] "
                  href={`/person/${person.id}-${convertToSlug(person.name)}`}
                  prefetch={false}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                    alt={person.name}
                    sizes="100"
                    width={185}
                    height={277}
                    loading="eager"
                    radius="none"
                    isZoomed
                    //removeWrapper
                    style={{ objectFit: "cover" }}
                    //className="w-full object-cover m-auto h-[270px]"
                    //className="!relative inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110"
                  />
                </Link>
                <div className="card-info p-3 h-20 bg-white dark:bg-slate-800 text-left">
                  <strong
                    className="font-semibold text-base line-clamp-2 max-h-10 mb-1"
                    title={person.original_name}
                  >
                    {person.original_name}
                  </strong>
                  <p className="text-sm">
                    {person?.character ? person.character : person.job}
                  </p>
                </div>
              </SwiperSlide>
            ))}

            {isViewMore && false && (
              <SwiperSlide className="flex justify-center items-center p-5 !h-[200px] max-w-[180px]">
                <div
                  className="text-lg text-primary-500"
                  onClick={() => {
                    //window.location.pushState({}, "", "?tab=credits");
                    window.location.replace(
                      window.location.pathname + "?tab=credits"
                    );
                  }}
                >
                  View more
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default memo(PersonSlider);
