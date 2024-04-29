import { baseUrl, fetchHeader } from "@/app/lib/fetchData";

//Get People Popular
export async function getPeoplePopular({ lang, page }: { lang?: string; page?: string }) {
	const language = lang || "en";
	const pageCurrent: string = page || "1";
	// const isCached = Number(pageCurrent) < 2;

	const url = `${baseUrl}/person/popular?language=${language}&page=${pageCurrent}`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			revalidate: 7200,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch getTvGenre. URL Link: " + url);
	}

	const data = await res.json();
	// console.log(data);
	return data;
}
