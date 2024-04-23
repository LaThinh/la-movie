import PeoplePopular from "@/app/components/person/PeoplePopular";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Top Ranking Popular People 2024 - La Movie",
	description: "Top Ranking Popular People - La Movie 2024",
};

export default function PersonPage({ params }: { params: { lang: string } }) {
	return (
		<div
			className="person-page bg-gradient-to-bl from-amber-200 to-yellow-400bg-gradient-to-r from-amber-200 to-yellow-400 py-10
		dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-700
		"
		>
			<h1 className="page-title !m-0 pb-6">Top Ranking Popular People</h1>
			<PeoplePopular lang={params.lang} />
		</div>
	);
}
