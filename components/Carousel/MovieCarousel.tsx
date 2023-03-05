import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { MovieModelBase } from "@/models/MovieModelBase";
import { StarIcon } from "@heroicons/react/24/outline";

interface Props {
  movieData: MovieModelBase;
}

function MovieCarousel(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? props.movieData?._embedded.movieList.length - 1
        : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === props.movieData?._embedded.movieList.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!isMouseOver) {
      timerId = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === props.movieData?._embedded.movieList.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 5000);
    }

    return () => clearInterval(timerId);
  }, [activeIndex, isMouseOver, props.movieData?._embedded.movieList.length]);

  return (
    <div
      className="relative mb-5"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="overflow-hidden">
        <ul
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {props.movieData?._embedded.movieList.map((item, index) => (
            <li key={index} className="flex-shrink-0 w-full">
              <div className="mx-auto w-5/6 relative">
                <div className="flex w-full bg-gray-100">
                  <img
                    src={
                      item.posterPath == null
                        ? ""
                        : "https://image.tmdb.org/t/p/w300" + item.posterPath
                    }
                    alt={item.title}
                    className="w-300 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <div className="flex pb-2">
                      <StarIcon
                        className="block h-6 w-6 text-yellow-400"
                        aria-hidden="true"
                      />
                      <p className="lg:text-xl  text-gray-900 dark:text-white">
                        {parseFloat(item.voteAverage!).toPrecision(2)} (
                        {item.voteCount})
                      </p>
                    </div>
                    <div>
                      {item.genres?.split("-").map((genre, _index) => (
                        <button
                          key={_index}
                          className="text-xs rounded-full text-gray-500 hover:text-gray-900 border border-gray-500 hover:bg-gray-500 hover:border-transparent px-2 py-1 mr-2 mb-2"
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                    <p className="text-gray-500">{item.overview}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
        <button
          className={classNames(
            "text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-full p-2",
            {
              invisible: activeIndex === 0,
            }
          )}
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          className={classNames(
            "text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-full p-2",
            {
              invisible:
                activeIndex === props.movieData?._embedded.movieList.length - 1,
            }
          )}
          onClick={handleNextClick}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MovieCarousel;
