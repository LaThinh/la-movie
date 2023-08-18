"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export interface IMovieProps {}

export default function Movie(props: IMovieProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  console.log(search);
  return (
    <div className="layout-movie flex gap-10 w-full max-w-7xl p-5 min-h-screen">
      <div className="sidebar movie-sidebar bg-gray-200 rounded-lg w-1/5">
        Sidebar
      </div>
      <div className="main-content w-4/5">
        <h1>This is Movie page</h1>
      </div>
    </div>
  );
}
