// const baseUrl = "https://api.themoviedb.org/3";
// const options: RequestInit = {
// 	method: "GET",
// 	headers: {
// 		accept: "application/json",
// 		Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
// 	},
// 	next: {
// 		revalidate: 300,
// 	},
// 	cache: "force-cache",
// };

import { baseUrl, fetchHeader, options } from "@/app/lib/fetchData";

// const fetchHeader = {
// 	accept: "application/json",
// 	Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
// };

const defaultLanguage = "en";

//Get getMovieGenre
export async function getMovieGenre(language?: string) {
	const lang = language || "en";
	const url = `${baseUrl}/genre/movie/list?language=${language}`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			revalidate: 1200,
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

	const url = `${baseUrl}/discover/movie?with_genres=${genreId}&page=${p}&language=${lang}`;
	const res = await fetch(url, options);
	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	// console.log("Fetch Genre. Url = " + url);
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
	const url = `${baseUrl}/movie/${movieId}/recommendations?language=${lang}&page=1`;
	const res = await fetch(url, options);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data url " + url);
	}

	return res.json();
}

export async function getMovieTrending(page?: number, lang?: string) {
	const language = lang || defaultLanguage;
	const pageCurrent: number = page || 1;
	const url = `${baseUrl}/trending/movie/day?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, options);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
