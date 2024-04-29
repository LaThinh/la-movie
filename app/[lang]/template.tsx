"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0.5, y: 5, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ ease: "easeInOut", duration: 0.7 }}
			className="w-full flex-1"
		>
			{children}
		</motion.div>
	);
}
