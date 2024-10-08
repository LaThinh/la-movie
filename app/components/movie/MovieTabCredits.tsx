import { ICredits } from "@/app/interfaces";
import PersonGrid from "../person/PersonGrid";

export function MovieTabCredits({ movieCredits }: { movieCredits: ICredits }) {
	return (
		<>
			<div className="flex w-full flex-col xl:grid xl:grid-cols-2 gap-14">
				{movieCredits?.cast && movieCredits.cast.length > 0 && (
					<div className="credit-group">
						<h3 className="text-xl my-4 lg:text-3xl lg:my-8 font-semibold">
							Top Movie Cast
							<span className="font-normal text-gray-400 ml-2">
								({movieCredits.cast.length})
							</span>
						</h3>
						<PersonGrid peoples={movieCredits.cast} />
					</div>
				)}

				{movieCredits?.crew && movieCredits.crew.length > 0 && (
					<div className="credit-group">
						<h3 className="text-xl my-4 lg:text-3xl lg:my-8 font-semibold">
							Top Movie Crew
							<span className="font-normal text-gray-400 ml-2">
								({movieCredits.crew.length})
							</span>
						</h3>
						<PersonGrid peoples={movieCredits.crew} />
					</div>
				)}
			</div>
		</>
	);
}

export default MovieTabCredits;
