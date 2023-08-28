import { IGenre } from "@/app/interfaces";
import { Button, Link, CheckboxGroup } from "@nextui-org/react";
import React from "react";

export default function GenreList({
  genres,
  currentId,
}: {
  genres: IGenre[];
  currentId?: string;
}) {
  const classNameActive = "active-item text-white bg-primary-500";
  return (
    <>
      {genres.length > 0 && (
        <div className="genre-list sticky top-20 flex flex-wrap gap-4 align-top p-3 ">
          {genres.map((genre) => (
            <div key={genre.id} className="">
              <Link
                href={`/genre/${genre.id}`}
                className={`rounded-md px-3 py-1 text-md text-left
                text-primary-500 bg-transparent border border-primary-500
                lg:text-xl md:border-2 md:gap-3 xl:w-full xl:py-2
                hover:bg-primary-500 hover:text-white
                ${genre.id == currentId ? classNameActive : "normal"}
                `}
              >
                {genre.name}
              </Link>
              <Button
                radius="full"
                as={Link}
                href={`/genre/${genre.id}`}
                className=" hidden bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                {genre.name}
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
