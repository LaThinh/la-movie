"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

BannerParallax.propTypes = {};

function BannerParallax({
	imageUrl,
	imageTitle,
}: {
	imageUrl: string;
	imageTitle?: string;
}) {
	let ref = useRef(null);

	let { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 50px", "end -200px"],
	});

	let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	let opacity = useTransform(scrollYProgress, [0, 1], ["100%", "50%"]);

	return (
		<>
			<div
				ref={ref}
				className={`banner w-full m-auto relative overflow-hidden
				h-[63vh] min-h-[500px] max-h-[720px]
				aspect-square lg:aspect-[24/7] max-w-[2800px] 
        `}
			>
				<motion.div style={{ y }} className="w-full h-full">
					<Image
						alt={imageTitle ? imageTitle : "Banner parallax"}
						src={imageUrl}
						priority={true}
						className="object-cover !relative w-auto min-w-[100%] max-w-none z-10"
						fill
					/>
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
