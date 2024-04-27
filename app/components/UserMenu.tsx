"use client";
import React, { useEffect, useState } from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
	Button,
	User,
	Link,
} from "@nextui-org/react";
// import useLocalStorage from "@/app/hooks/useLocalStorage ";

export default function UserMenu() {
	// const [language, setLanguage] = useLocalStorage("language", "en-US");
	const [language, setLanguage] = useState("en");

	const setLanguageStorage = (e: any) => {
		const value: string = e.target.value || "";
		if (value) {
			console.log(value);
			setLanguage(value);
		}
		//localStorage.setItem("language", value);
	};

	//console.log("Language from locator: " + language);

	return (
		<Dropdown
			showArrow
			radius="sm"
			classNames={{
				base: "p-0 border-small border-divider bg-background",
				arrow: "bg-default-200",
			}}
		>
			<DropdownTrigger>
				<Link className="whitespace-nowrap text-white hover:text-yellow-400" href="#">
					My Account
				</Link>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Custom item styles"
				disabledKeys={["profile"]}
				className="p-3"
				itemClasses={{
					base: [
						"rounded-md",
						"text-default-500",
						"transition-opacity",
						"data-[hover=true]:text-foreground",
						"data-[hover=true]:bg-default-100",
						"dark:data-[hover=true]:bg-default-50",
						"data-[selectable=true]:focus:bg-default-50",
						"data-[pressed=true]:opacity-70",
						"data-[focus-visible=true]:ring-default-500",
					],
				}}
			>
				<DropdownSection aria-label="Profile & Actions" showDivider>
					<DropdownItem isReadOnly key="profile" className="h-14 gap-2">
						<User
							name="Junior Garcia"
							description="@jrgarciadev"
							classNames={{
								name: "text-default-600",
								description: "text-default-500",
							}}
							avatarProps={{
								size: "sm",
								src: "https://avatars.githubusercontent.com/u/30373425?v=4",
							}}
						/>
					</DropdownItem>
					<DropdownItem key="dashboard">Dashboard</DropdownItem>
					<DropdownItem key="settings">Settings</DropdownItem>
				</DropdownSection>

				<DropdownSection aria-label="Preferences" showDivider>
					<DropdownItem key="quick_search" shortcut="⌘K">
						Quick search
					</DropdownItem>
					<DropdownItem
						isReadOnly
						key="theme"
						className="cursor-default"
						endContent={
							<select
								className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
								id="language"
								name="language"
								onChange={setLanguageStorage}
								value={language || "en-US"}
							>
								<option value="en-US">English</option>
								<option value="vi-VN">Viêt Nam</option>
							</select>
						}
					>
						Language
					</DropdownItem>
				</DropdownSection>

				<DropdownSection aria-label="Help & Feedback">
					<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
					<DropdownItem key="logout">Log Out</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
