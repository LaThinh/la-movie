"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0.2, y: 20, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ ease: "easeInOut", duration: 0.5 }}
			className="w-full flex flex-col"
		>
			{children}
		</motion.div>
	);
}
