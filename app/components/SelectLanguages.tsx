"use client";

import { ILanguage } from "@/app/lib/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getLanguages } from "../lib/fetchData";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";

export default function SelectLanguages({ languages }: { languages?: ILanguage[] }) {
	const params = useParams();
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const [languageData, setLanguageData] = useState<ILanguage[]>([]);
	const showLang = ["en", "fr", "de", "vi", "ja", "th", "zh"];

	let langs: ILanguage[] = [];
	showLang.forEach((item) => {
		const itemLang = languageData.find((lang) => lang.iso_639_1 == item);
		if (itemLang) langs.push(itemLang);
	});

	useEffect(() => {
		const getData = async () => {
			const data = await getLanguages();
			setLanguageData(data);
			return data;
		};

		if (languages) {
			setLanguageData(languages);
		} else {
			getData();
		}
	}, [languages]);

	const getLangParam = () => {
		const paramStore = params?.lang ? params.lang : "en";
		if (!paramStore) return null;

		let langParam = Array.isArray(paramStore) ? paramStore[0] : paramStore;
		return langParam;
	};

	let currentLang = getLangParam() || localStorage.getItem("lang") || "en";

	const handleChangeLanguage = (e: any) => {
		const value = e.target.value;
		if (pathName && currentLang && currentLang != value) {
			localStorage.setItem("lang", value);
			let newUrl = pathName.toString().replace(currentLang, value);
			if (searchParams) {
				newUrl = newUrl + "?" + searchParams.toString();
			}
			router.replace(newUrl, { scroll: false });
		}
	};

	return (
		<div className="select-language">
			{langs.length > 0 && (
				<Select
					label="Select Language"
					className="w-48 bg-white  rounded-lg"
					onChange={handleChangeLanguage}
					defaultSelectedKeys={[currentLang]}
					size="sm"
					color="primary"
					variant="bordered"
				>
					{langs.map((lang) => (
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
