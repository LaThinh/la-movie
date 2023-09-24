import React from "react";
import { IPerson } from "@/app/interfaces";
import { NewlineText } from "@/app/person/[person_id]/page";
import Link from "next/link";

function PersonInfo({ person }: { person: IPerson }) {
  return (
    <div className="person-info text-left @container">
      <h3 className="text-xl lg:text-2xl mb-5">Personal Info</h3>
      <ul
        className="person-infos flex flex-col gap-3 
        [&>li]:flex [&>li]:gap-1 [&>li]:items-center
        [&>li>strong]:text-lg [&>li>p3]:text-base"
      >
        <li>
          <strong>Name: </strong>
          <strong>
            {person.homepage ? (
              <Link href={person.homepage} target="_blank" prefetch={false}>
                {person.name}
              </Link>
            ) : (
              <p>{person.name}</p>
            )}
          </strong>
        </li>
        <li>
          <strong>Birthday: </strong>
          <p>{person.birthday}</p>
        </li>
        <li className="flex-col !items-start ">
          <strong>Place of Birth: </strong>
          <span>{person.place_of_birth}</span>
        </li>
        <li>
          <strong>Gender: </strong>
          <p>
            {person.gender === 1
              ? "Female"
              : person.gender === 2
              ? "Male"
              : person.gender === 3
              ? "Non-binary"
              : "Not Set"}
          </p>
        </li>
        {person.homepage && (
          <li className="flex flex-wrap">
            <strong>Website:</strong>
            <Link href={person.homepage} target="_blank" prefetch={false}>
              {person.homepage}
            </Link>
          </li>
        )}
        <li>
          <strong>Know For: </strong>
          <p>{person.known_for_department}</p>
        </li>
        <li>
          <strong>Popularity: </strong>
          <span>{person.popularity}</span>
        </li>
        <li className="flex-col !items-start !gap-1">
          <strong>Also Known As</strong>
          <div className="flex flex-col gap-1">
            {person?.also_known_as &&
              person.also_known_as.map((str, index) => (
                <p key={index}>{str}</p>
              ))}
          </div>
        </li>
      </ul>
    </div>
  );
}

PersonInfo.propTypes = {};

export default PersonInfo;
