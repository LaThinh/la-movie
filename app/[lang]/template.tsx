"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			initial={{ opacity: 0.3, y: 10, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ ease: "easeInOut", duration: 0.7 }}
			className="w-full"
		>
			{children}
		</motion.div>
	);
}
