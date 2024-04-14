// import { BASE_URL } from "../lib/constants";
import { getServerSideSitemapIndex } from "next-sitemap";
import { ITVItem } from "../lib/interfaces";
import { getTVPopular } from "../lib/fetchTv";
import { IMovieItem } from "../interfaces";
import { getMovieTrending } from "../lib/fetchMovie";

export async function GET(request: Request) {
	// Method to source urls from cms
	// const urls = await fetch('https//example.com/api')

	const pageFrom = 1;
	const pageTo = 20;
	const lang = "en";

	const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://movie.laquocthinh.com";
	// let Movies: IMovieItem[] = [];
	// let TVs: ITVItem[] = [];
	// for (let page = pageFrom; page < pageTo; page++) {
	// 	const dataMovie = await getMovieTrending(page, "en");
	// 	const resultMovie = await dataMovie.results;
	// 	resultMovie.map((item: IMovieItem) => Movies.push(item));

	// 	const dataTv = await getTVPopular({ page: page, lang: "en" });
	// 	const resultTv = await dataTv.results;
	// 	resultTv.map((item: ITVItem) => TVs.push(item));
	// }

	let sitemaps: string[] = [];
	for (let i = pageFrom; i <= pageTo; i++) {
		sitemaps.push(`${BASE_URL}/${lang}/movie/sitemap/${i}.xml`);
	}

	for (let i = pageFrom; i <= pageTo; i++) {
		sitemaps.push(`${BASE_URL}/${lang}/tv/sitemap/${i}.xml`);
	}
	//TVs.map((tv) => sitemapTV.push(`${BASE_URL}/tv/${tv.id}`));

	return getServerSideSitemapIndex(sitemaps);
}
