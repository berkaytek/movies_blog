import Image from 'next/image';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { MovieModelBase } from '../../models/MovieModelBase';

interface IMovieBasicCarouselProps {
    movies: Array<MovieModelBase>;
}
//props:IMovieBasicCarouselProps
function MovieBasicCarousel(props:IMovieBasicCarouselProps) {
  return (
    <Carousel>
    {props.movies.map(movie =>
       <img style={{width:'100%'}} key={movie.id} src={movie.posterPath == null ? "" : "https://image.tmdb.org/t/p/w500" + movie.posterPath } alt={movie.title} height="600" /> )
    }
    </Carousel>
  )
}

export default MovieBasicCarousel
