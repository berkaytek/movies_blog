import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import service from '../../api/service';
import { MovieModelBase } from '../../models/MovieModelBase';
import { InferGetStaticPropsType } from 'next';

interface IHomeProps{
    movieBaseData:Array<MovieModelBase>
}

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
    <div>
        {movieData.map(data=>
          <div> {data.title} </div>
          )}
    </div>
  )
}
