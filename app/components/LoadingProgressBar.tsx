"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LoadingProgressBar() {
  return (
    <ProgressBar
      height="3px"
      color="#FACC15"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}

export default LoadingProgressBar;
