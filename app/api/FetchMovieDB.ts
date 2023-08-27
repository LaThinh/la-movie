const baseUrl = "https://api.themoviedb.org/3";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      process.env.THE_MOVIE_DATABASE_API?.toString() ||
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzQxODJmN2Y4M2U1MTMwZmE2ZjRiOTRlMGM2OGE3NyIsInN1YiI6IjY0YjYwN2VlMzc4MDYyMDBmZjNhMmNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nv6BfKpMo2TI6mBuoJaOcXGOdKmZEd2F7E7Q01RkaGY",
  },
  next: {
    revalidate: 10,
  },
};

let language = "en-EN";
//language = "vi-VN";

if (typeof window !== "undefined") {
  language = localStorage.getItem("language") || "en-US" || "vi-VN";
}

export const fetchBaseUrl = baseUrl;
export const fetchOptions = options;
export const fetchLanguage = language;

export async function getTrending(page?: number) {
  const pageCurrent: number = page || 1;
  const url = `${baseUrl}/trending/movie/day?page=${pageCurrent}&language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPopular(page?: number) {
  const pageCurrent: number = page || 1;
  const url = `${baseUrl}/movie/popular?page=${pageCurrent}&language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendations(movieId: string) {
  const url = `${baseUrl}/movie/${movieId}/recommendations?language=${language}&page=1`;
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getVideosTrailer(movieId: string) {
  const url = `${baseUrl}/movie/${movieId}/videos?language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data trailer. URL Link: " + url);
  }

  return res.json();
}

export async function getMovieDetails(movieId: string) {
  const url = `${baseUrl}/movie/${movieId}?language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data Movie Detail. URL Link: " + url);
  }

  return res.json();
}

export async function getAllGenres() {
  const url = `${baseUrl}/genre/movie/list?language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch getGenreList. URL Link: " + url);
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
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch getGenreList. URL Link: " + url);
  }

  // console.log("Fetch Genre. Url = " + url);
  // const data = await res.json();
  // console.log(data);

  return await res.json();
}
