"use client";

import { getPeoplePopular } from "@/app/lib/fetchPeople";
import { IPeople } from "@/app/lib/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import CardPerson from "./CardPerson";
import CardPeople from "./CardPeople";
import { Button } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { usePathname, useSearchParams } from "next/navigation";

export default function PeoplePopular({
	dataPeople,
	lang,
}: {
	dataPeople: IPeople[];
	lang?: string;
}) {
	const language = lang || "en";

	const [peopleList, setPeopleList] = useState<IPeople[]>(dataPeople);
	const [loading, setLoading] = useState(false);
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [startPage, setStartPage] = useState(1);

	const fromPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
	const toPage = fromPage + 5;

	const [page, setPage] = useState(fromPage | 1);
	// const maxPage = toPage;

	const { ref } = useInView({
		onChange(inView, entry) {
			if (inView && !loading && page < startPage + 5) {
				setPage(page + 1);
			}
		},
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const getPopularDataPage = async (page: number) => {
		console.log("getPopularData page " + page);
		setLoading(true);

		const cPage = page.toString();
		const dataPeoplePopular = await getPeoplePopular({ lang: language, page: cPage });
		// console.log(dataPeoplePopular);
		if (peopleList.length < 1) {
			setPeopleList(dataPeoplePopular?.results);
		} else {
			setPeopleList((prevList) => [...prevList, ...dataPeoplePopular?.results]);
		}
		setLoading(false);
	};

	useEffect(() => {
		setStartPage(fromPage);
		//getPopularDataPage(page);
	}, []);

	useEffect(() => {
		if (page < 2) return;
		getPopularDataPage(page);
		const newPath = pathname + "?" + createQueryString("page", page.toString());
		// router.push(newPath);
		window.history.replaceState(null, "", newPath);
	}, [page]);

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	return (
		<div className="people-popular-list w-full m-auto max-w-[2000px] flex flex-col gap-3 pb-10 px-3 lg:px-5 items-center">
			{/* <div className="fixed text-4xl z-50">
				Is Loading {loading ? "true" : "false"} {fromPage} {startPage}
			</div> */}
			{peopleList && peopleList.length > 0 && (
				<div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-10 gap-y-14">
					{peopleList.map((people, index) => (
						<div key={index}>
							<CardPeople
								type="List"
								ranking={index + (startPage - 1) * 20 + 1}
								people={people}
							/>
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
				{loading
					? `Loading People Ranking page ${page}`
					: `Load more people page ${page + 1}`}
			</Button>
		</div>
	);
}
