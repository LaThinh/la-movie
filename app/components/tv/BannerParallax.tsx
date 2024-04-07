"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ITV } from "@/app/lib/interfaces";
import TVInfo from "@/app/components/tv/TVInfo";

BannerParallax.propTypes = {};

function BannerParallax({ tv }: { tv: ITV }) {
	let ref = useRef(null);

	let { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 50px", "end 200px"],
	});

	let y = useTransform(scrollYProgress, [0, 1], ["0%", "400px"]);
	let opacity = useTransform(scrollYProgress, [0, 1], ["100%", "50%"]);

	return (
		<>
			<div
				ref={ref}
				className={`banner w-full m-auto relative overflow-hidden
				h-[80vh] min-h-[500px] max-h-[900px]
				aspect-square lg:aspect-[24/7] max-w-[2800px] 
        `}
			>
				<motion.div style={{ y }} className="w-full h-full relative">
					<Image
						alt={tv?.name || "Banner parallax"}
						src={`https://image.tmdb.org/t/p/original/${tv?.backdrop_path}`}
						priority={true}
						className="object-cover !relative w-auto min-w-[100%] max-w-none z-10"
						fill
					/>
					<div
						className="banner-overlay absolute top-0 left-0 right-0 bottom-0 z-20 
					bg-stone-700/50 "
					></div>
					<div
						className="tv-info-box w-[98%] max-w-screen-2xl
						absolute z-30 top-1/2 left-1/2 rounded-xl 
						border border-gray-400 
						translate-x-[-50%] translate-y-[-50%] shadow-2xl
						backdrop-blur-none bg-slate-800/80 text-white"
					>
						<TVInfo tv={tv} />
					</div>
				</motion.div>
			</div>

			{/* <motion.div
        style={{ width: y }}
        className="h-2 bg-primary-500 fixed z-50 bottom-0 left-0"
      ></motion.div> */}
		</>
	);
}

export default BannerParallax;
