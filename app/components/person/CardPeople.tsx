import React from "react";

import {
	Badge,
	Button,
	Card,
	CardBody,
	CircularProgress,
	Image,
	Link,
} from "@nextui-org/react";
import { convertToSlug } from "@/app/lib/utils";
import { IPeople } from "@/app/lib/interfaces";
import MovieSlider from "../movie/MovieSlider";

function CardPeople({
	people,
	type,
	ranking,
}: {
	people: IPeople;
	type: "Grid" | "List";
	ranking?: number;
}) {
	return (
		<>
			{type === "Grid" ? (
				<div
					className="card-person rounded-lg overflow-hidden shadow-md border 
    hover:bg-gray-200 dark:hover:bg-slate-700"
				>
					<div className="flex flex-col">
						<div className="card-profile ">
							<Link
								href={`/person/${people.id}-${convertToSlug(people.name)}`}
								title={people.name}
							>
								<Image
									src={`https://image.tmdb.org/t/p/w185/${people.profile_path}`}
									alt={people.original_name}
									title={people.original_name}
									radius="none"
								/>
							</Link>
						</div>
						<div className="card-info p-2 lg:p-3">
							<h4 className="text-base">{people.name}</h4>
							<h5>popularity: {people.popularity}</h5>
							<p className="text-sm">
								{people?.character ? people.character : people.job}
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className={`card-person @container person-${people.id}`}>
					<div className="list-info flex flex-wrap gap-5 rounded-xl shadow-lg bg-white dark:bg-slate-700 overflow-hidden">
						<div className="card-profile relative w-full @3xl:w-[400px] @2xl:max-w-1/3">
							<Link
								href={`/person/${people.id}-${convertToSlug(people.name)}`}
								title={people.name}
								className="flex items-center justify-center aspect-[2/3] bg-gray-200"
							>
								{people?.profile_path ? (
									<Image
										src={`https://image.tmdb.org/t/p/w400/${people.profile_path}`}
										alt={people.original_name}
										title={people.original_name}
										className="p-image rounded-none w-full"
										// isZoomed
									/>
								) : (
									<h4 className="text-2xl text-gray-400">{people.name}</h4>
								)}

								{/* <h3>{people.original_name}</h3> */}
							</Link>
						</div>

						<div className="card-info @3xl:p-5 @container flex flex-1 flex-col gap-3 items-center @3xl:items-start">
							<div className="flex items-center gap-5">
								<div
									className="text-3xl font-bold rounded-full shadow-lg
								bg-yellow-500 w-20 aspect-square flex justify-center items-center"
								>
									#{ranking}
								</div>
								<h2 className="text-2xl font-bold @lg:text-3xl @xl:text-4xl">
									{people.name}
								</h2>
								<span className="text-xl mt-3 text-gray-500 dark:text-gray-400 ">
									({people.known_for_department})
								</span>
							</div>

							<div className="w-full flex gap-5 items-center @3xl:pl-[100px] px-4">
								<span className="text-lg @3xl:text-2xl text-green-600 font-bold">
									Popularity: {people.popularity}
								</span>

								<Button
									radius="full"
									as={Link}
									size="lg"
									href={`/person/${people.id}-${convertToSlug(people.name)}`}
									className="bg-gradient-to-tr from-pink-500 to-yellow-500 !text-white shadow-lg"
								>
									View More
								</Button>
							</div>

							<div className="card-movies m-auto flex flex-col justify-center gap-3 max-w-full overflow-hidden ">
								{/* <h5 className="text-xl">Top Movies</h5> */}
								<MovieSlider movieList={people.known_for} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default CardPeople;
