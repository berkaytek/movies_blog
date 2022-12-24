import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { MovieModelBase } from "../../models/MovieModelBase";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IMovieBasicCarouselProps {
  movies: Array<MovieModelBase>;
}
//props:IMovieBasicCarouselProps
function MovieBasicCarousel(props: IMovieBasicCarouselProps) {
  return (
    <Carousel>
      {props.movies.map((movie) => (
        <Card sx={{ display: "flex" }}>
          <CardMedia
            style={{ maxWidth: 345, aspectRatio: 3 / 5 }}
            component="img"
            height="500"
            width="300"
            key={movie.id}
            src={
              movie.posterPath == null
                ? ""
                : "https://image.tmdb.org/t/p/w500" + movie.posterPath
            }
            alt={movie.title}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: "center" }}
              >
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.overview}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Carousel>
  );
}

export default MovieBasicCarousel;
