"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  Variants,
  useAnimationControls,
  useScroll,
  motion,
} from "framer-motion";
import { useEffect } from "react";

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, visibility: "hidden" },
  show: { opacity: 1, visibility: "visible" },
};

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ScrollToTopButton() {
  const { scrollY } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    return scrollY.on("change", (latestValue) => {
      if (
        latestValue > 1200 ||
        (scrollY.getVelocity() < 0 && latestValue > 700)
      ) {
        controls.start("show");
      } else {
        controls.start("hide");
      }
    });
  });

  return (
    <motion.button
      className="fixed bottom-10 z-100 right-5 p-1 w-12 h-12 flex justify-center items-center text-white rounded-full bg-primary-600/90 hover:bg-primary-500 text-lg"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
    >
      <ArrowUpIcon width={24} height={24} />
    </motion.button>
  );
}

export default ScrollToTopButton;
