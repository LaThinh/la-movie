import { fetchBaseURL, fetchHeader } from "@/app/lib/constants";
import { NextRequest } from "next/server";

// Function get MOvie Trending
export async function GET(request: NextRequest) {
	const lang = request.nextUrl.searchParams.get("lang") || "en";
	const time = request.nextUrl.searchParams.get("time") || "day";
	const page = request.nextUrl.searchParams.get("page") || "1";

	const url = fetchBaseURL + "/trending/movie/" + time + "&language=" + lang;

	const res = await fetch(url, {
		headers: fetchHeader,
		cache: "force-cache",
		next: { revalidate: 7200 },
	});
	const data = await res.json();

	return Response.json({ data });
}
