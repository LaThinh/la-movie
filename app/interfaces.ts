export interface Trending {
  results: {
    id: number;
    title: string;
    original_title: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
    release_date: Date;
  }[];
  total_results: number;
  total_pages: number;
}

export interface Movie {
  id: string;
  title: string;
  homepage: string;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  tagline: string;
  status: string;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
}
