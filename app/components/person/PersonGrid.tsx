import React from "react";
import { IPeople } from "@/app/interfaces";
import CardPerson from "./CardPerson";

function PersonGrid({ peoples }: { peoples: IPeople[] }) {
  const peopleList: IPeople[] = peoples.filter((people) => {
    return people.profile_path != null;
  });

  return (
    <div className="person-container @container">
      {!peopleList || (peopleList.length === 0 && <div>No peoples</div>)}
      {peopleList?.length && peopleList.length > 0 && (
        <div
          className="person-grid grid grid-cols-2 gap-2 @xs:gap-4
        @lg:grid-cols-3 @lg:gap-5
        @2xl:grid-cols-4 @2xl:gap-6
        @4xl:grid-cols-5 @3xl:gap-8
        @5xl:grid-cols-6 @7xl:grid-cols-7"
        >
          {peopleList.map((people, index) => (
            <CardPerson person={people} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

PersonGrid.propTypes = {};

export default PersonGrid;
