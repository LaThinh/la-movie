import React from "react";
import SliderVideos from "../SliderVideos";
import Trailer from "@/app/components/movie/Trailer";

export default function MovieTabVideo({ movieId }: { movieId: string }) {
  return (
    <div>
      <SliderVideos movieId={movieId} limitDefault={100} />
      <div className="video-trailer block w-full">
        <Trailer movieId={movieId} limitDefault={100} />
      </div>
    </div>
  );
}
