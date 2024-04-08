import { IMovieItem } from "@/app/interfaces";
import { getMovieTrending } from "@/app/lib/fetchMovie";
import { convertToSlug } from "@/app/lib/utils";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
	const sitemaps = [];

	for (let i = 0; i < 10; i++) {
		sitemaps.push({ id: i }); // Start IDs from 1 as requested
	}

	return sitemaps;
}

export default async function sitemap({
	id,
}: {
	id: number;
}): Promise<MetadataRoute.Sitemap> {
	// Google's limit is 50,000 URLs per sitemap
	const lang = "en";
	const pageFrom = id * 10;
	const pageTo = pageFrom + 10;
	let Movies: IMovieItem[] = [];
	const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
	for (let page = pageFrom; page < pageTo; page++) {
		const dataTv = await getMovieTrending(page, "en");
		const result = await dataTv.results;

		result.map((item: IMovieItem) => Movies.push(item));
	}

	return Movies.map((item) => ({
		url: `${BASE_URL}/${lang}/movie/${item.id}-${convertToSlug(item.title)}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 0.8,
	}));
}
