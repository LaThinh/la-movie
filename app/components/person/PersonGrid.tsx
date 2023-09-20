import React from "react";
import { IPeople } from "@/app/interfaces";
import CardPerson from "./CardPerson";

function PersonGrid({ peoples }: { peoples: IPeople[] }) {
  return (
    <div className="person-container @container">
      {!peoples || (peoples.length === 0 && <div>No peoples</div>)}
      {peoples?.length && peoples.length > 0 && (
        <div
          className="person-grid grid grid-cols-2 gap-2 @xs:gap-4
        @lg:grid-cols-3 @lg:gap-5
        @2xl:grid-cols-4 @xl:gap-6
        @4xl:grid-cols-5 @3xl:gap-8
        @5xl:grid-cols-6 @7xl:grid-cols-7"
        >
          {peoples.map((people, index) => (
            <>
              {people.profile_path != null && (
                <CardPerson person={people} key={index} />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

PersonGrid.propTypes = {};

export default PersonGrid;
