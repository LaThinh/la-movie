export interface ITrending {
  page: number;
  results: IMovieItem[];
  total_results: number;
  total_pages: number;
}

export interface IMovieListPage {
  title?: string;
  page: number;
  results: IMovieItem[];
  total_results: number;
  total_pages: number;
}

export interface IMovieItem {
  id: number;
  title: string;
  original_title: string;
  poster_path: string; // Image
  backdrop_path: string; //Image
  overview: string;
  genre_ids: number[];
  release_date: Date;
  popularity?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface IMovie {
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
  tagline?: string;
  status: string;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    name: string;
    iso_639_1: string;
  }[];
  production_countries: {
    name: string;
  }[];
}

export interface IVideos {
  id: number;
  results: IVideoItem[];
}

export interface IVideoItem {
  id: string;
  name: string;
  key: string;
  site: string;
  size: string;
  type: string;
  official: string;
  published_at: Date;
}

export interface IGenre {
  id: string;
  name: string;
}
