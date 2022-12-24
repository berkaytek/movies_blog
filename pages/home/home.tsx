import React from "react";
import service from "../../api/service";
import { MovieModelBase } from "../../models/MovieModelBase";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MovieBasicCard from "../../components/MovieBasicCard/MovieBasicCard";
import MovieBasicCarousel from "../../components/MovieBasicCarousel/MovieBasicCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Home() {
  const [movieData, setMovieData] = React.useState<Array<MovieModelBase>>([]);
  const [CarouselData, setCarouselData] = React.useState<Array<MovieModelBase>>(
    []
  );
  const [totalMovieCount, setTotalMovieCount] = React.useState<number>(0);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async function getInitialData() {
    var initialMovieData: Array<MovieModelBase> =
      await service.getItems<MovieModelBase>(
        "/api/Movies/GetMoviesByStartAndEndIndex?startIndex=70000&endIndex=70025"
      );
    setMovieData(initialMovieData);
  }

  async function getTotalMovieCount() {
    var movieCount: number = await service.getSingleItem<number>(
      "/api/Movies/GetMoviesTotalCount"
    );
    setTotalMovieCount(movieCount);
    return movieCount;
  }

  async function getInitialCorouselData(maxCount: number) {
    var endIndex = Math.floor(Math.random() * maxCount);
    var startIndex = endIndex - 5;
    var initialCarouselData: Array<MovieModelBase> =
      await service.getItems<MovieModelBase>(
        `/api/Movies/GetMoviesByStartAndEndIndex?startIndex=${startIndex.toString()}&endIndex=${endIndex.toString()}`
      );
    setCarouselData(initialCarouselData);
    return initialCarouselData;
  }

  React.useEffect(() => {
    getTotalMovieCount().then((result) => {
      getInitialCorouselData(result);
    });
    getInitialData()
    .then(()=>delay(1000))
    .then(() => setLoading(false));
  }, []);

  return (
    <Container style={{ maxWidth: "100%" }}>
      {isLoading ? <LoadingSpinner /> :
      <>
      <Grid container style={{ justifyContent: "center", marginBottom:50 }}>
        <Grid item xs={12} sm={12} md={6}>
          <MovieBasicCarousel movies={CarouselData} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {movieData.map((data, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <MovieBasicCard image={data.posterPath} title={data.title} />
          </Grid>
        ))}
      </Grid>
      </>
      }
    </Container>
  );
}
