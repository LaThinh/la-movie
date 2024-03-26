import React from "react";
import { IPeople } from "@/app/interfaces";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import { convertToSlug } from "@/app/lib/utils";

function CardPerson({ person }: { person: IPeople }) {
	return (
		<div
			className="card-person rounded-lg overflow-hidden shadow-md border 
    hover:bg-gray-200 dark:hover:bg-slate-700"
		>
			<div className="flex flex-col">
				<div className="card-profile ">
					<Link
						href={`/person/${person.id}-${convertToSlug(person.name)}`}
						title={person.name}
					>
						<Image
							src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
							alt={person.original_name}
							radius="none"
						/>
					</Link>
				</div>
				<div className="card-info p-2 lg:p-3">
					<h4 className="text-base">{person.name}</h4>
					<p className="text-sm">{person?.character ? person.character : person.job}</p>
				</div>
			</div>
		</div>
	);
}

export default CardPerson;
