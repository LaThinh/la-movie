import getConfig from "next/config";

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

let language = "en-EN" || "vi-VN";
//language = "vi-VN";

export async function getTrending(page?: number) {
  const pageCurrent: number = page || 1;
  const url = `https://api.themoviedb.org/3/trending/movie/day?page=${pageCurrent}&language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPopular(page?: number) {
  const pageCurrent: number = page || 1;
  const url = `https://api.themoviedb.org/3/movie/popular?page=${pageCurrent}&language=${language}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendations(movieId: string) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=${language}&page=1`;
  console.log(url);
  const res = await fetch(url, options);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
