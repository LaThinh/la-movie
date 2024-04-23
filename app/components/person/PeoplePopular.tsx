"use client";

import { getPeoplePopular } from "@/app/lib/fetchPeople";
import { IPeople } from "@/app/lib/interfaces";
import React, { useEffect, useState } from "react";
import CardPerson from "./CardPerson";
import CardPeople from "./CardPeople";
import { Button } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

export default function PeoplePopular({ lang }: { lang?: string }) {
	const language = lang || "en";
	const [page, setPage] = useState(1);
	const [peopleList, setPeopleList] = useState<IPeople[]>([]);
	const [loading, setLoading] = useState(false);
	const searchParams = useSearchParams();

	// const fromPage = searchParams.get("page")
	// 	? Number(searchParams.get("page"))
	// 	: props.fromPage;
	// const toPage = props.toPage;
	const maxPage = 2;

	const { ref } = useInView({
		onChange(inView, entry) {
			if (inView && !loading && page < maxPage) {
				setPage(page + 1);
			}
		},
	});

	const getPopularData = async (page: number) => {
		console.log("getPopularData page " + page);
		setLoading(true);

		const cPage = page.toString();
		const dataPeoplePopular = await getPeoplePopular({ lang, page: cPage });
		// console.log(dataPeoplePopular);
		if (peopleList.length < 1) {
			setPeopleList(dataPeoplePopular?.results);
		} else {
			setPeopleList((prevList) => [...prevList, ...dataPeoplePopular?.results]);
		}
		setLoading(false);
	};

	useEffect(() => {
		getPopularData(page);
	}, [page]);

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	return (
		<div className="people-popular-list w-full m-auto max-w-screen-xl flex flex-col gap-3 pb-20 items-center">
			{peopleList && peopleList.length > 0 && (
				<div className="w-full flex flex-col gap-12 p-2">
					{peopleList.map((people, index) => (
						<div key={people.id}>
							<CardPeople type="List" ranking={index + 1} people={people} />
						</div>
					))}
				</div>
			)}

			<Button
				className="load-more mt-10 mb-5 px-8 py-2 w-auto rounded-full"
				ref={ref}
				size="lg"
				color="primary"
				radius="lg"
				onClick={handleLoadMore}
				disabled={loading}
				isLoading={loading}
				spinnerPlacement="end"
			>
				{loading ? `Loading movie page ${page}` : `Load more page ${page + 1}`}
			</Button>
		</div>
	);
}
