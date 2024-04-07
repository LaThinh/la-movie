import BannerParallax from "@/app/components/tv/BannerParallax";
import Loading from "@/app/components/Loading";
import { getTVDetails, getTVImages } from "@/app/lib/fetchTv";
import { ITV } from "@/app/lib/interfaces";
import React, { Suspense } from "react";
import TvTabs from "@/app/components/tv/TvTabs";
import VideoSlider from "@/app/components/tv/VideoSlider";
import { Metadata, ResolvingMetadata } from "next";
import PersonSlider from "@/app/components/person/PersonSlider";

type TvDetailProps = {
	params: { lang: string; tvSlug: string };
	searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: TvDetailProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const slugs: string[] = params.tvSlug.split("-");
	const tvId = slugs[0];
	const tv: ITV = await getTVDetails({
		tvId: tvId,
		language: params.lang,
		append_to_response: "keywords",
	});

	let keywords: string[] = [];
	keywords.push(tv.name);
	tv?.keywords?.results.map((key) => keywords.push(key.name));
	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: tv.name,
		description: tv.overview,
		creator: tv?.created_by[0]?.name,
		keywords: keywords.join(", "),
		//publisher: tv.first_air_date.toDateString(),
		openGraph: {
			images: [
				`https://image.tmdb.org/t/p/original/${tv?.backdrop_path}`,
				...previousImages,
			],
		},
	};
}

export default async function TVDetailPage(props: TvDetailProps) {
	console.log(props.params);
	const slugs: string[] = props.params.tvSlug.split("-");
	const tvId = slugs[0];
	const tvTitle = props.params.tvSlug.replace(tvId, "").replaceAll("-", " ").trim();
	const tvJson = await getTVDetails({
		tvId: tvId,
		language: props.params.lang,
		append_to_response: "videos,images,credits,keywords",
	});

	if (tvJson.status_message && tvJson.success === false) {
		return (
			<div className="not-found min-h-[90vh] flex flex-col gap-10 justify-center items-center">
				<h2>Not Found TV Id = {tvId}</h2>
				{tvJson.status_message}
			</div>
		);
	}

	const tv: ITV = tvJson;
	// console.log(tv);

	return (
		<div className="tv-detail-page flex flex-1 flex-col">
			<Suspense fallback={<Loading text="Loading Banner" />}>
				{tv?.backdrop_path && <BannerParallax tv={tv} />}
			</Suspense>

			<div className="trailer-desktop m-auto w-full max-w-screen-2xl flex flex-col gap-5 pt-5">
				{/* <h1 className="page-title">TV {tvTitle}</h1> */}

				{tv?.credits?.cast && <PersonSlider personList={tv.credits.cast} />}
				{tv?.videos && tv.videos.results.length > 5 && <VideoSlider videos={tv.videos} />}
			</div>

			<TvTabs tvId={tvId} tv={tv} lang={props.params.lang} />

			{/* <div className="tv-info text-left w-3xl overflow-hidden">
				<pre>{JSON.stringify(tv, undefined, 2)}</pre>
			</div> */}
		</div>
	);
}
