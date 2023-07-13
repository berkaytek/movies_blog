import { useEffect, useState } from "react";
import service from "@/api/service";
import { MovieCount } from "@/models/MovieCount";
import { MovieModelBase } from "@/models/MovieModelBase";

export function useContainer() {
  const [movieData, setMovieData] = useState<MovieModelBase | undefined>(undefined);
  const [carouselData, setCarouselData] = useState<MovieModelBase | undefined>(undefined);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieModelBase | undefined>(undefined);
  const [newMovies, setNewMovies] = useState<MovieModelBase | undefined>(undefined);
  const [totalMovieCount, setTotalMovieCount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(25);

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchInitialData(): Promise<void> {
    try {
      const initialMovieData: MovieModelBase = await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=revenue&direction=descending"
      );
      setMovieData(initialMovieData);
    } catch (error) {
      console.error("Failed to fetch initial movie data:", error);
    }
  }

  async function fetchTopRatedMovies(): Promise<void> {
    try {
      const topRatedMovieData: MovieModelBase = await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=revenue&direction=descending"
      );
      setTopRatedMovies(topRatedMovieData);
    } catch (error) {
      console.error("Failed to fetch top rated movie data:", error);
    }
  }

  async function fetchNewMovies(): Promise<void> {
    try {
      const newMovieData: MovieModelBase = await service.getItems<MovieModelBase>(
        "/movies/get?pageNumber=0&itemPerPage=50&sortBy=releaseDate&direction=descending"
      );
      setNewMovies(newMovieData);
    } catch (error) {
      console.error("Failed to fetch new movie data:", error);
    }
  }

  async function fetchTotalMovieCount(): Promise<void> {
    try {
      const movieCount: MovieCount = await service.getSingleItem<MovieCount>("/movies/count");
      setTotalMovieCount(movieCount.count);
    } catch (error) {
      console.error("Failed to fetch total movie count:", error);
    }
  }

  async function fetchCarouselData(): Promise<void> {
    try {
      await fetchTotalMovieCount();
      const pageNumber = Math.floor(Math.random() * totalMovieCount) / pageCount;
      const initialCarouselData: MovieModelBase = await service.getItems<MovieModelBase>(
        `/movies/get?pageNumber=${pageNumber}&itemPerPage=${pageCount}&sortBy=id&direction=descending`
      );
      setCarouselData(initialCarouselData);
    } catch (error) {
      console.error("Failed to fetch initial carousel data:", error);
    }
  }

  async function fetchData(): Promise<void> {
    try {
      await fetchInitialData();
      await fetchCarouselData();
      await fetchTopRatedMovies();
      await fetchNewMovies();
      await delay(1000);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    movieData,
    carouselData,
    topRatedMovies,
    newMovies,
    isLoading,
    fetchData,
  };
}
