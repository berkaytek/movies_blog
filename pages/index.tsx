import service from "@/api/service";
import MovieCard from "@/components/Cards/MovieCard";
import { MovieCount } from "@/models/MovieCount";
import { MovieModelBase } from "@/models/MovieModelBase";
import React from "react";

const testArray: Array<number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];

export default function Home() {
  const [movieData, setMovieData] = React.useState<MovieModelBase>();
  const [CarouselData, setCarouselData] = React.useState<MovieModelBase>();
  const [totalMovieCount, setTotalMovieCount] = React.useState<number>(0);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [pageCount, setPageCount] = React.useState<number>(25);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function getInitialData() {
    var initialMovieData: MovieModelBase =
      await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=revenue&direction=descending"
      );
    setMovieData(initialMovieData);
  }

  async function getTotalMovieCount() {
    var movieCount: MovieCount = await service.getSingleItem<MovieCount>(
      "/movies/count"
    );
    setTotalMovieCount(movieCount.count);
    return movieCount;
  }

  async function getInitialCorouselData(maxCount: number) {
    var pageNumber = Math.floor(Math.random() * maxCount) / pageCount;
    var initialCarouselData: MovieModelBase =
      await service.getItems<MovieModelBase>(
        `/movies/get?pageNumber=0&itemPerPage=25&sortBy=id&direction=descending`
      );
    setCarouselData(initialCarouselData);
    return initialCarouselData;
  }

  React.useEffect(() => {
    getTotalMovieCount().then((result) => {
      getInitialCorouselData(result.count);
    });
    getInitialData()
      .then(() => delay(1000))
      .then(() => setLoading(false));
  }, []);
  return (
    <div className="container mx-auto pt-5">
        <div className="grid grid-cols-6 gap-4 content-center">
          {movieData?._embedded.movieList.slice(0, 6).map((data, index) => (
            <MovieCard
              image={data.poster_path}
              title={data.title}
              overview={data.overview}
              vote_average={data.vote_average}
            />
          ))}
        </div>
    </div>
  );
}
