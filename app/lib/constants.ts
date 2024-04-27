// export const BASE_URL = "https://movie.laquocthinh.com";

export const fetchBaseURL = "https://api.themoviedb.org/3";
export const fetchOptions: RequestInit = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
	},
	next: {
		revalidate: 7200,
	},
	// cache: "force-cache",
};

export const fetchHeader = {
	accept: "application/json",
	Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
};

export const dataLanguage = [
	{
		iso_639_1: "en",
		english_name: "English",
		name: "English",
	},
	{
		iso_639_1: "fr",
		english_name: "French",
		name: "Français",
	},
	{
		iso_639_1: "de",
		english_name: "German",
		name: "Deutsch",
	},
	{
		iso_639_1: "vi",
		english_name: "Vietnamese",
		name: "Tiếng Việt",
	},
	{
		iso_639_1: "ja",
		english_name: "Japanese",
		name: "日本語",
	},
	{
		iso_639_1: "th",
		english_name: "Thai",
		name: "ภาษาไทย",
	},
	{
		iso_639_1: "zh",
		english_name: "Mandarin",
		name: "普通话",
	},
];
