import { getTVPopular } from "@/app/lib/fetchTv";
import { ITVItem } from "@/app/lib/interfaces";
import { convertToSlug } from "@/app/lib/utils";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
	// Fetch the total number of products and calculate the number of sitemaps needed
	//return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

	const sitemaps = [];
	for (let i = 0; i < 50; i++) {
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
	const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
	let TVs: ITVItem[] = [];

	for (let page = pageFrom; page < pageTo; page++) {
		const dataTv = await getTVPopular({ page: page, lang: "en" });
		const result = await dataTv.results;

		result.map((item: ITVItem) => TVs.push(item));
	}

	return TVs.map((tv) => ({
		url: `${BASE_URL}/${lang}/tv/${tv.id}-${convertToSlug(tv.name)}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
	}));
}
