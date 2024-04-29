import { baseUrl, fetchHeader, optionCache, optionNoCache } from "@/app/lib/fetchData";

const defaultLanguage = "en";

//Get getMovieGenre
export async function getMovieGenre(language?: string) {
	const lang = language || "en";
	const url = `${baseUrl}/genre/movie/list?language=${language}`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			tags: ["genre"],
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch getMovieGenre. URL Link: " + url);
	}

	const data = await res.json();

	return data?.genres;
}

export async function getDiscoverMovieGenres({
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

	const url = `${baseUrl}/discover/movie?with_genres=${genreId}&page=${p}&language=${lang}${shortBy}`;
	const res = await fetch(url, optionCache);
	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	console.log("Fetch Genre. Url = " + url);
	// const data = await res.json();
	// console.log(data);

	return res.json();
}

export async function getMovieRecommendations({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	const lang = language || defaultLanguage;
	const isCached = Number(movieId) > 1000000;

	const url = `${baseUrl}/movie/${movieId}/recommendations?language=${lang}&page=1`;
	const res = await fetch(url, isCached ? optionCache : optionNoCache);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data url " + url);
	}

	return res.json();
}

export async function getMovieTrending({
	time,
	page,
	lang,
}: {
	time?: "day" | "week";
	page?: number;
	lang?: string;
}) {
	const pTime = time || "day";
	const language = lang || defaultLanguage;
	const pageCurrent: number = page || 1;

	const url = `${baseUrl}/trending/movie/${pTime}?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, optionNoCache);

	console.log(url);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getMoviePopular({ page, lang }: { page?: number; lang?: string }) {
	const pageCurrent: number = page || 1;
	const language = lang || defaultLanguage;

	const url = `${baseUrl}/movie/popular?page=${pageCurrent}&language=${language}`;

	console.log(url);

	const res = await fetch(url, optionCache);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getMovieNowPlaying({
	page,
	lang,
}: {
	page?: number;
	lang?: string;
}) {
	const pageCurrent: number = page || 1;
	const language = lang || defaultLanguage;

	const url = `${baseUrl}/movie/now_playing?page=${pageCurrent}&language=${language}`;

	console.log(url);

	const res = await fetch(url, optionNoCache);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
