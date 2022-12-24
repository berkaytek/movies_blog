import React from 'react';
import service from '../../api/service';
import { MovieModelBase } from '../../models/MovieModelBase';
import { Container, Grid } from '@mui/material';
import MovieBasicCard from '../../components/layouts/MovieBasicCard/MovieBasicCard';


export default function Home() {
  const [movieData,setMovieData] = React.useState<Array<MovieModelBase>>([]);
  const [Carousel, setCarouselData] = React.useState<Array<MovieModelBase>>([]);

  async function getInitialData(){
    var initialMovieData:Array<MovieModelBase> = await service.getItems<MovieModelBase>("/api/Movies/GetMoviesByStartAndEndIndex?startIndex=0&endIndex=25")
    setMovieData(initialMovieData);
  }

  async function getInitialCorouselData(){
    var startIndex = Math.floor(Math.random() * 100000);
    var endIndex = startIndex + 5;
    var initialCarouselData:Array<MovieModelBase> = await service.getItems<MovieModelBase>(`/api/Movies/GetMoviesByStartAndEndIndex?startIndex=${startIndex.toString()}&endIndex=${endIndex.toString()}`)
    setCarouselData(initialCarouselData);
  }

  React.useEffect(()=>{
    getInitialData();
  },[])



  return (
    <Container>
    <Grid container spacing={3}>
        {movieData.map((data,index)=>
        <Grid key={index} item xs={12} sm={6} md={2}>
          <MovieBasicCard image={data.posterPath} title={data.title} />
        </Grid>
          )}
    </Grid>
    </Container>
  )
}
