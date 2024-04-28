"use client";

import { ILanguage } from "@/app/lib/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getLanguages } from "../lib/fetchData";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { dataLanguage } from "@/app/lib/constants";

export default function SelectLanguages({
	size,
}: {
	size?: "small" | "normal" | "large";
}) {
	const params = useParams();
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	let languages: ILanguage[] = dataLanguage;

	const getCurrentLang = () => {
		let currentLang = "en";
		const paramStore = params?.lang;
		// 1: get From Param URL
		if (paramStore) {
			currentLang = Array.isArray(paramStore) ? paramStore[0] : paramStore;
		}
		// 2: get from localStorage
		else if (typeof window !== "undefined") {
			const localLang = localStorage.getItem("lang");
			if (localLang) currentLang = localLang;
		}
		// 3: return Default
		return currentLang;
	};

	const currentLang = getCurrentLang();

	const handleChangeLanguage = (e: any) => {
		const value = e.target.value;
		if (pathName && currentLang && currentLang != value) {
			if (typeof window !== "undefined") {
				localStorage.setItem("lang", value);
			}
			let newUrl = pathName.toString().replace(currentLang, value);
			if (searchParams) {
				newUrl = newUrl + "?" + searchParams.toString();
			}
			router.replace(newUrl, { scroll: false });
		}
	};

	return (
		<div className="select-language">
			{size && size === "small" ? (
				<Select
					className={`w-14 rounded`}
					onChange={handleChangeLanguage}
					defaultSelectedKeys={[currentLang]}
					size="sm"
					color="primary"
					variant="bordered"
					classNames={{
						// listboxWrapper: "w-24",
						trigger: "px-1 rounded border",
						base: "bg-white uppercase text-xl !border-none",
						innerWrapper: "",
						selectorIcon: "text-gray-700",
						popoverContent: "popoverContent -ml-12 w-40",
					}}
				>
					{languages.map((lang) => (
						<SelectItem
							aria-label={lang.iso_639_1.toUpperCase()}
							key={lang.iso_639_1}
							value={lang.iso_639_1}
							// title={`${lang.iso_639_1} ${lang.english_name} ${lang?.name}`}
						>
							{lang.iso_639_1.toUpperCase()}
							<span> - {lang?.name}</span>
						</SelectItem>
					))}
				</Select>
			) : (
				<Select
					label="Select Language"
					className={`w-48 bg-white  rounded-lg `}
					onChange={handleChangeLanguage}
					defaultSelectedKeys={[currentLang]}
					size="sm"
					color="primary"
					variant="bordered"
				>
					{languages.map((lang) => (
						<SelectItem
							aria-label={lang.english_name}
							key={lang.iso_639_1}
							value={lang.iso_639_1}
						>
							{lang?.name ? lang.name + " - " : ""}
							{lang.english_name}
						</SelectItem>
					))}
				</Select>
			)}
		</div>
	);
}
