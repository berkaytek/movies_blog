import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

interface IMovieCard {
  image?: string;
  title?: string;
  overview?: string;
  vote_average?: string;
}

export default function MovieCard(props: IMovieCard) {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg h-300 hover:scale-105 cur  ">
        <img
          className="w-full"
          src={
            props.image == null
              ? ""
              : "https://image.tmdb.org/t/p/w300" + props.image
          }
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="flex">
            <StarIcon className="block h-6 w-6 text-yellow-400" aria-hidden="true" />
            <div className="ml-1">
              {parseFloat(props.vote_average!).toPrecision(2)}
            </div>
          </div>
          <div className="font-bold text-xl mb-2 mt-1">{props.title}</div>
        </div>
      </div>
    </>
  );
}

/*
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-300 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300/${props.image})` }}
      ></div>
      {props.title}
      
    </div>
    */
