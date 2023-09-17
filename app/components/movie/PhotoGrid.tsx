import { IPhoto } from "@/app/interfaces";
import { Image } from "@nextui-org/react";

import Link from "next/link";

export const PhotoBackdrops = ({
  photoList,
}: {
  photoList: IPhoto[] | undefined;
}) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-6 lg:grid-cols-2">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center 
                max-w-[780px] m-auto rounded-lg
              bg-gray-200 dark:bg-slate-800 "
            >
              <Link
                href={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                target="_blank"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  alt={`Image BackDrops ${index} ${image?.file_path}`}
                  sizes="780"
                  width={780}
                  loading="eager"
                  radius="none"
                  isZoomed
                  removeWrapper
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export const PhotoLogos = (photoList: IPhoto[]) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center rounded
              bg-gray-500 dark:bg-slate-800 p-4"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w400/${image.file_path}`}
                alt={`Image BackDrops ${index} ${image?.file_path}`}
                sizes="400"
                width={400}
                height={240}
                loading="eager"
                radius="none"
                isZoomed
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export const PhotoPosters = (photoList: IPhoto[]) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center rounded
              bg-gray-300 dark:bg-slate-800 "
            >
              <Image
                src={`https://image.tmdb.org/t/p/w400/${image.file_path}`}
                alt={`Image BackDrops ${index} ${image?.file_path}`}
                sizes="400"
                width={400}
                height={240}
                loading="eager"
                radius="none"
                isZoomed
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
