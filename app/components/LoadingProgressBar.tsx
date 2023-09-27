"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { motion, useScroll, useTransform } from "framer-motion";

function LoadingProgressBar() {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <ProgressBar
        height="3px"
        color="#FACC15"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <motion.div
        style={{ width: y }}
        className="h-1 bg-gray-300 fixed z-50 top-16 left-0"
      ></motion.div>
    </>
  );
}

export default LoadingProgressBar;
