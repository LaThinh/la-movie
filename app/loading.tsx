import React from "react";
import Loading from "@/app/components/Loading";

function LoadingPage() {
	return (
		<div className="flex flex-1 w-full min-h-[100vh] justify-center items-center">
			<Loading text="Loading Page" />
		</div>
	);
}

export default LoadingPage;
