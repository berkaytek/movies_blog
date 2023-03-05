import service from "@/api/service";
import MovieCard from "@/components/Cards/MovieCard";
import MovieCarousel from "@/components/Carousel/MovieCarousel";
import MovieCarouselCard from "@/components/Carousel/MovieCarouselCard";
import NewSection from "@/components/Section/NewSection";
import TopRatedSection from "@/components/Section/TopRatedSection";
import { MovieCount } from "@/models/MovieCount";
import { MovieModelBase } from "@/models/MovieModelBase";
import React from "react";


export default function Home() {
  const [movieData, setMovieData] = React.useState<MovieModelBase>();
  const [CarouselData, setCarouselData] = React.useState<MovieModelBase>();
  const [topRatedMovies, setTopRatedMovies] = React.useState<MovieModelBase>();
  const [newMovies, setNewMovies] = React.useState<MovieModelBase>();
  const [totalMovieCount, setTotalMovieCount] = React.useState<number>(0);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [pageCount, setPageCount] = React.useState<number>(25);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function getInitialData() {
    const initialMovieData: MovieModelBase =
      await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=revenue&direction=descending"
      );
    setMovieData(initialMovieData);
  }
  async function getTopRatedMovies() {
    const initialMovieData: MovieModelBase =
      await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=revenue&direction=descending"
      );
      setTopRatedMovies(initialMovieData);
  }
  async function getNewMovies() {
    const initialMovieData: MovieModelBase =
      await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=releaseDate&direction=descending"
      );
      setNewMovies(initialMovieData);
  }

  async function getTotalMovieCount() {
    const movieCount: MovieCount = await service.getSingleItem<MovieCount>(
      "/movies/count"
    );
    setTotalMovieCount(movieCount.count);
    return movieCount;
  }

  async function getInitialCorouselData(maxCount: number) {
    const pageNumber = Math.floor(Math.random() * maxCount) / pageCount;
    const initialCarouselData: MovieModelBase =
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
    getTopRatedMovies();
    getNewMovies();
    getInitialData()
      .then(() => delay(1000))
      .then(() => setLoading(false));
  }, []);
  return (
    <div className="container mx-auto pt-5">
      <MovieCarouselCard movieData={movieData!} />
      <TopRatedSection movieData={topRatedMovies}/>
      <NewSection movieData={newMovies}/>
      
    </div>
  );
}
