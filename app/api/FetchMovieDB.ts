import { ISearchParams } from "@/app/interfaces";
import next from "next/types";
import { optionCache, optionNoCache } from "@/app/lib/fetchData";

const baseUrl = "https://api.themoviedb.org/3";
// const options: RequestInit = {
// 	method: "GET",
// 	headers: {
// 		accept: "application/json",
// 		Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
// 	},
// 	next: {
// 		revalidate: 18000,
// 	},
// };

const fetchHeader = {
	accept: "application/json",
	Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
};

let language = "en-EN";
//language = "vi-VN";

if (typeof window !== "undefined") {
	language = localStorage.getItem("language") || "en-US" || "vi-VN";
}

export const fetchBaseUrl = baseUrl;
export const fetchLanguage = language;

export async function getTrending(page?: number) {
	const pageCurrent: number = page || 1;
	const url = `${baseUrl}/trending/movie/day?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, optionNoCache);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getPopular({ page, lang }: { page?: number; lang?: string }) {
	const pageCurrent: number = page || 1;
	const language = lang || "en";
	const url = `${baseUrl}/movie/popular?page=${pageCurrent}&language=${language}`;
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getRecommendations(movieId: string) {
	const isCached = Number(movieId) > 1000000;

	const url = `${baseUrl}/movie/${movieId}/recommendations?language=${language}&page=1`;
	const res = await fetch(url, isCached ? optionCache : optionNoCache);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getVideosTrailer({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/videos?language=${language}`;
	console.log("Get Videos Trailer " + url);
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		throw new Error("Failed to fetch data trailer. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieVideos({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/videos?language=${language}`;
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		throw new Error("Failed to fetch data trailer. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieDetails({
	movieId,
	language,
	append_to_response,
}: {
	movieId: string;
	language?: string;
	append_to_response?: string | undefined;
}) {
	language = language || "en";
	const isCached = Number(movieId) > 1000000;

	const appendResponse = append_to_response
		? `append_to_response=${append_to_response}&`
		: "";
	const url = `${baseUrl}/movie/${movieId}?${appendResponse}language=${language}`;
	const res = await fetch(url, isCached ? optionCache : optionNoCache);

	//console.log(options);
	console.log(url);

	if (!res.ok) {
		throw new Error("Failed to fetch data Movie Detail. URL Link: " + url);
	}

	return res.json();
}

export async function getAllGenres() {
	const url = `${baseUrl}/genre/movie/list?language=${language}`;
	const res = await fetch(url, optionCache);
	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	return res.json();
}

export async function getKeywords(movieId: string) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/keywords`;
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		throw new Error("Failed to fetch data trailer. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieListQuery({
	genreId,
	page,
	sort_by,
}: {
	genreId: string;
	page: string;
	sort_by?: string;
}) {
	const url = `${baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&language=${language}`;
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	// console.log("Fetch Genre. Url = " + url);
	// const data = await res.json();
	// console.log(data);

	return res.json();
}

export async function searchMovies({
	query,
	page,
	language,
}: {
	query: string;
	page: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/search/movie?query=${query}&page=${page}&language=${language}`;
	const res = await fetch(url, optionNoCache);
	if (!res.ok) {
		throw new Error("Failed to fetch getGenreList. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieImages({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/images`;
	console.log(url);

	const res = await fetch(url, {
		method: "GET",
		headers: fetchHeader,
		//cache: "force-cache",
		next: {
			revalidate: 18000,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data trailer. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieReviews({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/reviews`;
	const res = await fetch(url, {
		method: "GET",
		headers: fetchHeader,
		//cache: "force-cache",
		next: {
			revalidate: 3000,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data review. URL Link: " + url);
	}

	return res.json();
}

export async function getMovieCredits({
	movieId,
	language,
}: {
	movieId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/movie/${movieId}/credits?language=${language}`;
	const res = await fetch(url, {
		method: "GET",
		headers: fetchHeader,
		//cache: "force-cache",
		next: {
			revalidate: 3000,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data review. URL Link: " + url);
	}

	return res.json();
}

//Get Person
export async function getPersonDetails({
	personId,
	language,
}: {
	personId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/person/${personId}?append_to_response=external_ids%2Cimages&language=${language}`;
	const res = await fetch(url, optionCache);

	console.log(url);

	if (!res.ok) {
		throw new Error("Failed to fetch data Person Detail. URL Link: " + url);
	}

	return res.json();
}

export async function getPersonMovies({
	personId,
	language,
}: {
	personId: string;
	language?: string;
}) {
	language = language || "en";
	const url = `${baseUrl}/person/${personId}/movie_credits?language=${language}`;

	const res = await fetch(url, {
		method: "GET",
		headers: fetchHeader,
		//cache: "force-cache",
		next: {
			revalidate: 18000,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data Person Movies. URL Link: " + url);
	}

	return res.json();
}
