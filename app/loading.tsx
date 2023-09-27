import React from "react";
import Loading from "@/app/components/Loading";

function LoadingPage() {
  return (
    <div className="flex min-h-[100vh] justify-center items-center">
      <Loading text="Loading Page" />
    </div>
  );
}

export default LoadingPage;
