import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import service from '../../api/service';
import { MovieModelBase } from '../../models/MovieModelBase';
import { InferGetStaticPropsType } from 'next';
import { Grid, makeStyles } from '@mui/material';
import MovieBasicCard from '../../components/layouts/MovieBasicCard/MovieBasicCard';


export default function Home() {
  const [movieData,setMovieData] = React.useState<Array<MovieModelBase>>([]);


  async function getInitialData(){
    var initialMovieData:Array<MovieModelBase> = await service.getItems<MovieModelBase>("/api/Movies/GetMoviesByStartAndEndIndex?startIndex=0&endIndex=25")
    setMovieData(initialMovieData);
  }

  React.useEffect(()=>{
    getInitialData();
  },[])



  return (
    <Grid container spacing={3}>
        {movieData.map((data,index)=>
        <Grid key={index} item xs={12} sm={6} md={2}>
          <MovieBasicCard image={data.posterPath} title={data.title} />
        </Grid>
          )}
    </Grid>
  )
}
