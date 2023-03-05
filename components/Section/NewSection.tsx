import { MovieModelBase } from "@/models/MovieModelBase";
import { SunIcon } from "@heroicons/react/24/outline";
import React from "react";
import MovieCard from "../Cards/MovieCard";

interface Props {
  movieData?: MovieModelBase;
}

export default function NewSection(props: Props) {
  return (
    <div className="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 mt-5">
      <div className="flex pb-5">
        <SunIcon
          className="block h-6 w-6 text-yellow-400"
          aria-hidden="true"
        />
        <p className="lg:text-xl pl-2 text-gray-900 dark:text-white">
          New Movies
        </p>
      </div>
      <div className="grid lg:grid-cols-6 grid-cols-3 gap-4 content-center">
        {props.movieData?._embedded.movieList
          .slice(0, 6)
          .map((data, _index) => (
            <MovieCard
              key={_index}
              image={data.posterPath}
              title={data.title}
              overview={data.overview}
              vote_average={data.voteAverage}
              voteCount = {data.voteCount}
            />
          ))}
      </div>
    </div>
  );
}
