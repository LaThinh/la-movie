// "use client";
import React, { Suspense } from "react";
import { getPersonDetails, getPersonMovies } from "@/app/api/FetchMovieDB";
import { IMovie, IMovieItem, IPerson } from "@/app/interfaces";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import Socials from "@/app/components/Socials";
import { SocialIcon } from "react-social-icons";
import PersonInfo from "@/app/components/person/PersonInfo";
import MovieGrid from "@/app/components/movie/MovieGrid";
import MovieSlider from "@/app/components/movie/MovieSlider";

export function NewlineText(props: string) {
  const newText = props.split("\n").map((str, id) => <p key={id}>{str}</p>);

  return newText;
}

type IMovieCredits = {
  id: string;
  cast: IMovieItem[];
  crew: IMovieItem[];
};

export async function PersonDetailPage({
  params: { person_id },
}: {
  params: { person_id: string };
}) {
  console.log("Person Detail Page");
  console.log(person_id);

  const personId = person_id.split("-")[0];

  const person: IPerson = await getPersonDetails({ personId: personId });

  const movieCredits: IMovieCredits = await getPersonMovies({
    personId: personId,
  });

  //console.log(movieCredits.cast[0]);

  return (
    <>
      <Suspense fallback={<Loading text="Loading Person..." />}>
        <div className="person-detail-page mx-auto w-full overflow-hidden min-h-[90vh] max-w-screen-2xl p-5 xl:p-10 flex flex-col lg:flex-row gap-10">
          <div className="person-sidebar flex flex-none gap-10 lg:flex-col lg:w-[28%] lg:min-w-[320px] basic-full @container">
            <div className="flex flex-col items-center w-full @xl:flex-row @xl:items-start gap-6">
              <div className="person-image w-full max-w-[400px] ">
                <Image
                  src={`https://image.tmdb.org/t/p/w400/${person.profile_path}`}
                  alt={person.name}
                  sizes={"320"}
                  width="400"
                  height="500"
                  style={{ objectFit: "cover" }}
                  className="max-w-full border overflow-hidden rounded-xl shadow-lg"
                />
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
              </div>
              <div className="w-full">
                <h1 className="person-name text-2xl my-5 lg:hidden font-bold @xl:text-left">
                  {person.name}
                </h1>

                <PersonInfo person={person} />
              </div>
            </div>
          </div>

          <div className="person-main flex flex-col lg:w-[68%] lg:max-w-[calc(100%-360px)]">
            <h1 className="person-name hidden lg:text-3xl lg:block font-bold">
              {person.name}
            </h1>
            <div className="person-desc text-justify [&>p]:mt-3">
              {person?.biography && (
                <>
                  <h2 className="text-xl font-semibold lg:text-2xl">
                    Biography
                  </h2>
                  {NewlineText(person.biography)}
                </>
              )}
            </div>

            <div>
              {movieCredits?.cast && movieCredits.cast.length > 0 && (
                <div className="top-movie-cast  mt-5 lg:mt-10">
                  <h4 className="my-3 pb-2 text-left text-lg lg:text-2xl border-b">
                    Top Movie Cast
                  </h4>
                  <MovieSlider movieList={movieCredits.cast} />
                </div>
              )}

              {movieCredits?.crew && movieCredits.crew.length > 0 && (
                <div className="top-movie-crew mt-5 lg:mt-10">
                  <h4 className="my-3 pb-2 text-left text-lg lg:text-2xl border-b">
                    Top Movie Crew
                  </h4>
                  <MovieSlider movieList={movieCredits.crew} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default PersonDetailPage;
