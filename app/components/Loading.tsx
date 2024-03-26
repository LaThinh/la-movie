"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";

function Loading({ text }: { text?: string }) {
	const loadingText = text || "Loading...";
	return (
		<div className="loading text-primary-500 p-5 text-center text-xl">
			{loadingText} <Spinner />
		</div>
	);
}

export default Loading;
