import { IGenre } from "@/app/interfaces";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import React from "react";

export default function GenreFilter({ genres }: { genres: IGenre[] }) {
  return (
    <div>
      {genres.length > 0 && (
        <div className="genre-list flex flex-col gap-2 align-top p-3 ">
          <CheckboxGroup label="Genres"></CheckboxGroup>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="border border-primary-500 rounded text-left px-3 py-2 "
            >
              <Checkbox key={genre.id} size="lg" value={genre.id}>
                {genre.name}
              </Checkbox>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
