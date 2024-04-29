import { baseUrl, fetchHeader, optionCache, optionNoCache } from "@/app/lib/fetchData";
const defaultLanguage = "en";

//Get getMovieGenre
// export async function getMovieGenre(language?: string) {
// 	const lang = language || "en";
// 	const url = `${baseUrl}/genre/movie/list?language=${language}`;
// 	const res = await fetch(url, {
// 		headers: fetchHeader,
// 		next: {
// 			revalidate: 1200,
// 		},
// 	});
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch getMovieGenre. URL Link: " + url);
// 	}

// 	const data = await res.json();

// 	return data?.genres;
// }

// 	// console.log("Fetch Genre. Url = " + url);
// 	// const data = await res.json();
// 	// console.log(data);

// 	return res.json();
// }

// export async function getMovieRecommendations({
// 	movieId,
// 	language,
// }: {
// 	movieId: string;
// 	language?: string;
// }) {
// 	const lang = language || defaultLanguage;
// 	const url = `${baseUrl}/movie/${movieId}/recommendations?language=${lang}&page=1`;
// 	const res = await fetch(url, options);
// 	if (!res.ok) {
// 		// This will activate the closest `error.js` Error Boundary
// 		throw new Error("Failed to fetch data url " + url);
// 	}

// 	return res.json();
// }

//Get getTvGenre
export async function getTvGenre({ lang }: { lang?: string }) {
	const language = lang || "en";
	const url = `${baseUrl}/genre/tv/list?language=${language}`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			tags: ["genre"],
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch getTvGenre. URL Link: " + url);
	}

	const data = await res.json();

	return data?.genres;
}

//getDiscoverTvGenres
export async function getDiscoverTvGenres({
	genreId,
	language,
	page,
	sort_by,
}: {
	genreId: string;
	language?: string;
	page?: string;
	sort_by?: string;
}) {
	const lang = language || defaultLanguage;
	const p = page || "1";

	const shortBy = sort_by ? "&sort_by=" + sort_by : "";

	const url = `${baseUrl}/discover/tv?with_genres=${genreId}&page=${p}&language=${lang}${shortBy}`;
	const res = await fetch(url, optionCache);
	if (!res.ok) {
		throw new Error("Failed to fetch getDiscoverTvGenres. URL Link: " + url);
	}

	// console.log("Fetch Genre. Url = " + url);
	// const data = await res.json();
	// console.log(data);

	return res.json();
}

// Get TV Trending
export async function getTVTrending({
	page,
	time,
	lang,
}: {
	page?: number;
	time: "day" | "week";
	lang?: string;
}) {
	const language = lang || defaultLanguage;
	const pageCurrent: number = page || 1;

	const url = `${baseUrl}/trending/tv/${time}?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, optionNoCache);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data TV Trending");
	}

	return res.json();
}

// Get TV Popular
export async function getTVPopular({ page, lang }: { page?: number; lang?: string }) {
	const language = lang || defaultLanguage;
	const pageCurrent: number = page || 1;

	const url = `${baseUrl}/tv/popular?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, optionCache);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data TV Trending");
	}

	return res.json();
}

//Gte TV Details
export async function getTVDetails({
	tvId,
	language,
	append_to_response,
}: {
	tvId: string;
	language?: string;
	append_to_response?: string | undefined;
}) {
	language = language || "en";
	const isCached = Number(tvId) > 100000;

	console.log("Cache: " + isCached);

	const appendResponse = append_to_response
		? `append_to_response=${append_to_response}&`
		: "";
	const url = `${baseUrl}/tv/${tvId}?${appendResponse}language=${language}`;
	const res = await fetch(url, isCached ? optionNoCache : optionNoCache);

	if (!res.ok) {
		return res.json();
		//throw new Error("Failed to fetch data TV Detail. URL Link: " + url);
	}

	return res.json();
}

//Gte TV Images
export async function getTVImages({
	tvId,
	language,
}: {
	tvId: string;
	language?: string;
	append_to_response?: string | undefined;
}) {
	language = language || "en";
	const url = `${baseUrl}/tv/${tvId}/images?language=${language}`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			revalidate: 3600,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	return res.json();
}
