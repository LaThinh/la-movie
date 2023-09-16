import React from "react";
import SliderVideos from "../SliderVideos";

export default function MovieTabVideo({ movieId }: { movieId: string }) {
  return (
    <div>
      <SliderVideos movieId={movieId} limitDefault={100} />
    </div>
  );
}
