"use client";
import React from "react";
import { IProfileImage } from "@/app/interfaces";
import { Button, Image, Link } from "@nextui-org/react";
import { DownloadIcon } from "@radix-ui/react-icons";

function PersonImageGallery({
  profileImages,
}: {
  profileImages: IProfileImage[];
}) {
  return (
    <>
      {profileImages.length > 0 && (
        <div className="profile-image-container @container">
          <h3 className="w-full text-left text-lg lg:text-2xl border-b my-5 pb-3">
            Profile Images
          </h3>
          <div
            className="profile-gallery grid grid-cols-1 gap-5 @md:grid-cols-2
            @3xl:grid-cols-3 @5xl:grid-cols-3 @5xl:gap-6 @6xl:grid-cols-4"
          >
            {profileImages.map((image, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg flex flex-col"
              >
                <div className="profile-image">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w300${image.file_path}`}
                    alt={`Image Size ${image.width} x ${image.height}`}
                    radius="none"
                    width={300}
                    height={450}
                    removeWrapper
                    className={`w-full m-auto aspect-[${image.aspect_ratio}]`}
                  />
                </div>
                <div className="profile-image-info text-left p-3 pb-4 relative">
                  <strong>Info</strong>
                  <p>Vote: {image.vote_count}</p>
                  <p>
                    Size: {image.width}x{image.height}
                  </p>
                  <Button
                    isIconOnly
                    href={`https://www.themoviedb.org/t/p/original${image.file_path}`}
                    as={Link}
                    size="sm"
                    variant="solid"
                    target="_blank"
                    aria-label="Download"
                    title="Download Photo"
                    className="absolute bottom-4 right-4 left-auto text-gray-600 bg-gray-300 hover:bg-green-600 hover:text-white py-1"
                  >
                    <DownloadIcon
                      width="20"
                      height="20"
                      className="text-base font-semibold"
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PersonImageGallery;
