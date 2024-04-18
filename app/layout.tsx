import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "@/app/providers";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import PageLoading from "./components/LoadingProgressBar";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const interFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "La Movie App - The Movie DB",
	description: "La Movie Develop by Paul La | NextJs 14",
};

export async function generateStaticParams() {
	return [{ lang: "en-US" }, { lang: "vi-VN" }];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="light scroll-smooth focus:scroll-auto"
			suppressHydrationWarning
		>
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon_io/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon_io/favicon-16x16.png"
				/>
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/favicon_io/android-chrome-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="512x512"
					href="/favicon_io/android-chrome-512x512.png"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

				<meta
					name="google-site-verification"
					content="AEBdKA2ofkzRezhsUitEoSaRB3Emx5mVVRJspLyIIO8"
				/>
			</head>

			<GoogleTagManager gtmId="GTM-WZ4XMWS8" />
			<body className={`${interFont.className} min-h-screen`}>
				<Providers>
					<Header />
					<PageLoading />
					<main className="main flex flex-1 flex-col text-center items-start">
						<Suspense fallback={<Loading text="Loading Page" />}>{children}</Suspense>
					</main>
					<Footer />
					{/* <Analytics /> */}
					<GoogleAnalytics gaId="G-C6ZWMDMFNJ" />
				</Providers>
			</body>
		</html>
	);
}
