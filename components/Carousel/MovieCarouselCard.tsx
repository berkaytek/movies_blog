import { MovieModelBase } from "@/models/MovieModelBase";
import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import MovieCard from "../Cards/MovieCard";
import MovieCarousel from "./MovieCarousel";

interface Props {
  movieData?: MovieModelBase;
}

export default function MovieCarouselCard(props: Props) {
  return (
    <div className="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 mb-10">
      <div className="flex pb-5">
        <StarIcon
          className="block h-6 w-6 text-yellow-400"
          aria-hidden="true"
        />
        <p className="lg:text-xl pl-2 text-gray-900 dark:text-white">
          Featured
        </p>
      </div>
      <div className="grid lg:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-4 content-center">
        <MovieCarousel movieData={props.movieData!} />
      </div>
    </div>
  );
}
