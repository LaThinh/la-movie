import React from "react";
import PropTypes from "prop-types";
import { IPerson } from "@/app/interfaces";
import { NewlineText } from "@/app/person/[person_id]/page";

function PersonInfo({ person }: { person: IPerson }) {
  return (
    <div className="person-info text-left">
      <h3 className="text-xl lg:text-2xl mb-5">Personal Info</h3>
      <ul
        className="person-infos flex flex-col gap-3
      [&>li>strong]:text-lg [&>li>p]:text-base
      "
      >
        <li>
          <strong>Birthday</strong>
          <p>{person.birthday}</p>
        </li>
        <li>
          <strong>Place of Birth</strong>
          <p>{person.place_of_birth}</p>
        </li>
        <li>
          <strong>Gender</strong>
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
        <li>
          <strong>Also Known As</strong>
          <div className="flex flex-col gap-2">
            {person?.also_known_as &&
              person.also_known_as.map((str, index) => (
                <p key={index}>{str}</p>
              ))}
          </div>
        </li>
        <li className="flex gap-2">
          <strong>Popularity: </strong>
          <p>{person.popularity}</p>
        </li>
      </ul>
    </div>
  );
}

PersonInfo.propTypes = {};

export default PersonInfo;
