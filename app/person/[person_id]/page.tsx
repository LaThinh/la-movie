// "use client";
import React, { Suspense } from "react";
import { getPersonDetails } from "@/app/api/FetchMovieDB";
import { IPerson } from "@/app/interfaces";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import Socials from "@/app/components/Socials";
import { SocialIcon } from "react-social-icons";
import PersonInfo from "@/app/components/person/PersonInfo";

export function NewlineText(props: string) {
  const newText = props.split("\n").map((str, id) => <p key={id}>{str}</p>);

  return newText;
}

export async function PersonDetailPage({
  params: { person_id },
}: {
  params: { person_id: string };
}) {
  console.log("Person Detail Page");
  console.log(person_id);

  const personId = person_id.split("-")[0];

  const person: IPerson = await getPersonDetails({ personId: personId });

  console.log(person);

  return (
    <>
      <Suspense fallback={<Loading text="Loading Person..." />}>
        <div className="person-detail-page mx-auto w-full min-h-[90vh] max-w-screen-xl p-5 lg:p-10 flex flex-col lg:flex-row gap-10">
          <div className="person-sidebar flex gap-10 lg:flex-col lg:basic-1/4 lg:min-w-[320px] basic-full @container">
            <div className="flex flex-col items-center w-full @xl:flex-row gap-10">
              <div className="person-image w-full max-w-[320px] border overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w400/${person.profile_path}`}
                  alt={person.name}
                  sizes={"320"}
                  width="400"
                  height="500"
                  style={{ objectFit: "cover" }}
                  className="max-w-full"
                />
              </div>
              <div className="w-full">
                <h1 className="person-name text-2xl lg:hidden font-bold">
                  {person.name}
                </h1>
                <div className="person-socials flex-1">
                  {person?.external_ids && (
                    <Socials socialIds={person.external_ids} />
                  )}
                  {person?.homepage && (
                    <div className="flex gap-3 items-center">
                      <strong>Homepage:</strong>
                      <SocialIcon
                        url={person.homepage}
                        target="_blank"
                        network="squarespace"
                      />
                    </div>
                  )}
                </div>
                <PersonInfo person={person} />
              </div>
            </div>
          </div>

          <div className="person-main flex-flex-col flex-1">
            <h1 className="person-name hidden lg:text-3xl lg:block font-bold">
              {person.name}
            </h1>
            <div className="person-desc text-justify [&>p]:mt-3">
              <h5 className="text-xl font-semibold lg:text-2xl">Biography</h5>
              {NewlineText(person.biography)}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default PersonDetailPage;
