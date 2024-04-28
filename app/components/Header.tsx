import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import SelectLanguages from "./SelectLanguages";
import NavMenu from "./NavMenu";

export default function Header() {
	return (
		<header
			className={`flex w-full sticky top-0 z-50 
			justify-between items-center px-3 lg:px-10 py-1 
			bg-primary/90 backdrop-blur-md shadow-lg
			bg-gradient-to-tr from-blue-600 to-sky-400 					
			dark:bg-gradient-to-bl dark:from-gray-700 dark:via-gray-900 dark:to-black
			`}
		>
			<div className="header-container max-w-screen-2xl flex justify-between items-center w-full m-auto">
				<NavMenu />

				<div className="settings flex gap-3 justify-end items-center ">
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
}
