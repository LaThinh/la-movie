import React from "react";
import { IPeople } from "@/app/interfaces";
import { Card, CardBody, Image } from "@nextui-org/react";

function CardPerson({ person }: { person: IPeople }) {
  return (
    <div
      className="card-person rounded-lg overflow-hidden shadow-md border 
    hover:bg-gray-200 dark:hover:bg-slate-700"
    >
      <div className="flex flex-col">
        <div className="card-profile ">
          <Image
            src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
            alt={person.original_name}
            radius="none"
          />
        </div>
        <div className="card-info p-3 lg:p-4">
          <h4>{person.name}</h4>
          <h5>{person?.character ? person.character : person.job}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardPerson;
