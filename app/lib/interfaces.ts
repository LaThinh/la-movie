import { ICredits, IMovieItem, IVideos } from "@/app/interfaces";

export interface ILanguage {
	iso_639_1: string;
	english_name: string;
	name?: string;
}

export interface IGenre {
	id: string;
	name: string;
}

// TV
export interface ITVItem {
	id: number;
	name: string;
	original_name: string;
	original_language?: string;
	poster_path: string; // Image
	backdrop_path: string; //Image
	overview: string;
	genre_ids: number[];
	release_date: Date;
	popularity?: string;
	vote_average?: number;
	vote_count?: number;
	media_type?: string;
	adult?: boolean;
	origin_country?: string[];
	first_air_date?: Date;
	department?: string;
	character?: string;
}

export interface ITV {
	id: string;
	name: string;
	homepage: string;
	backdrop_path: string;
	original_title: string;
	overview: string;
	popularity: string;
	poster_path: string;
	release_date?: string;
	adult: false;
	created_by: ICreated[];
	first_air_date: Date;
	last_air_date: Date;
	in_production: true;
	episode_run_time: number[];
	languages: string[];
	last_episode_to_air: IEpisodeToAir;
	next_episode_to_air: IEpisodeToAir;
	networks: INetwork[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;

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
		iso_3166_1: string;
		name: string;
	}[];
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];

	seasons: ISeason[];
	status: string;
	tagline?: string;
	type: string;
	vote_average: number;
	vote_count: number;

	keywords?: {
		results: IKeyword[];
	};
	images?: ITVImages;
	videos?: IVideos;
	credits?: ICredits;
}

export interface ICreated {
	id: string;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
}

export interface IEpisodeToAir {
	id: string;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: Date;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
}

export interface ISeason {
	air_date: Date;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}
export interface INetwork {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ITVImages {
	backdrops: IPhoto[];
	logos: IPhoto[];
	posters: IPhoto[];
}

export interface IPhoto {
	aspect_ratio: number;
	file_path: string;
	width: number;
	height: number;
	vote_average: number;
	vote_count: number;
	iso_639_1?: string;
}

export interface IKeyword {
	id: number;
	name: string;
}

export interface ITvListPage {
	title?: string;
	page: number;
	results: ITVItem[];
	total_results: number;
	total_pages: number;
}

// People

export interface IPeople {
	id: number;
	adult: boolean;
	credit_id?: string;
	name: string;
	original_name: string;
	profile_path: string;
	gender: number;
	popularity: number;
	known_for_department: string;
	character?: string;
	job?: string;
	known_for: IMovieItem[];
}

export interface IMediaItem {
	id: number;
	title?: string;
	original_title?: string;
	name?: string;
	original_name?: string;
	original_language?: string;
	media_type: string;
	poster_path: string; // Image
	backdrop_path: string; //Image
	overview: string;
	genre_ids: number[];
	release_date: Date;
	popularity?: string;
	vote_average?: number;
	vote_count?: number;
	department?: string;
	character?: string;
}
