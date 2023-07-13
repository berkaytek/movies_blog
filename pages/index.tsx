import { useEffect } from "react";
import { useContainer } from "@/containers/Home/HomeContainer";
import MovieCarouselCard from "@/components/Carousel/MovieCarouselCard";
import TopRatedSection from "@/components/Section/TopRatedSection";
import NewSection from "@/components/Section/NewSection";
import { LoadingAnimation } from "@/components/Animations/Loading";
import React from "react";

export default function Home() {
  const {
    movieData,
    carouselData,
    topRatedMovies,
    newMovies,
    isLoading,
    fetchData,
  } = useContainer();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto pt-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <MovieCarouselCard movieData={carouselData} />
          <TopRatedSection movieData={topRatedMovies} />
          <NewSection movieData={newMovies} />
        </>
      )}
    </div>
  );
}
