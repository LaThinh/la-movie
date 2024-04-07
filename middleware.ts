import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export const config = {
	matcher: ["/about:path*", "/en/about/:path*"],
};

// export default function middleware(request: NextRequest) {
// 	console.log(request.nextUrl.pathname);

// 	// if (request.nextUrl.pathname.startsWith("/about")) {
// 	// 	return NextResponse.rewrite(new URL("/en/about", request.url));
// 	// }

// 	// if (request.nextUrl.pathname.startsWith("/dashboard")) {
// 	// 	return NextResponse.rewrite(new URL("/dashboard/user", request.url));
// 	// }
// }

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
	const { pathname } = request.nextUrl;

	// Lấy ngôn ngữ mặc định từ storeLocation
	const lang = "en"; // Thay thế "en" bằng biến lấy từ storeLocation

	console.log("pathname: " + pathname);
	// Chuyển hướng đến URL mới với ngôn ngữ mặc định
	if (pathname === "/about") {
		console.log("pathname: " + pathname);
		return NextResponse.rewrite(new URL(`/${lang}/about`, request.url));
	}

	return NextResponse.next();
}
