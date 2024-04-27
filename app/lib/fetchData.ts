export const baseUrl = "https://api.themoviedb.org/3";
export const options: RequestInit = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
	},
	next: {
		revalidate: 18000,
	},
	cache: "force-cache",
};

export const fetchHeader = {
	accept: "application/json",
	Authorization: "Bearer " + process.env.NEXT_PUBLIC_MOVIE_API,
};

let language = "en";

if (typeof window !== "undefined") {
	language = localStorage.getItem("language") || "en" || "vi";
}

export const getLanguageDefault = () => {
	language = "en";
	if (typeof window !== "undefined") {
		language = localStorage.getItem("language") || "en" || "vi";
	}

	return language;
};

//Get Languages
export async function getLanguages() {
	const url = `${baseUrl}/configuration/languages`;
	const res = await fetch(url, {
		headers: fetchHeader,
		next: {
			revalidate: 10000,
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch getLanguages. URL Link: " + url);
	}

	return res.json();
}
