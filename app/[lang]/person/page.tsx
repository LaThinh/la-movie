import PeoplePopular from "@/app/components/person/PeoplePopular";
import { IPeople } from "@/app/lib/interfaces";
import { getPeoplePopular } from "@/app/lib/fetchPeople";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Top Ranking Popular People 2024 - La Movie",
	description: "Top Ranking Popular People - La Movie 2024",
};

export default async function PersonPage({ params }: { params: { lang: string } }) {
	const peoplePopular = await getPeoplePopular({ lang: params.lang });
	const dataPeople: IPeople[] = await peoplePopular?.results;

	return (
		<div
			className="person-page bg-gradient-to-bl from-amber-200 to-yellow-400bg-gradient-to-r from-amber-200 to-yellow-400 py-10
		dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-700 min-h-[100vh]
		"
		>
			<h1 className="page-title !m-0 pt-4 pb-10 font-bold lg:text-6xl">
				Top Ranking Popular People
			</h1>
			<PeoplePopular dataPeople={dataPeople} lang={params.lang} />
		</div>
	);
}
