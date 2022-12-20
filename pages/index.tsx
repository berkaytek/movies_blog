import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
export default function Home() {
  const [data,setData] = React.useState("");

  async function getData(){
    var result = await fetch("https://localhost:7071/WeatherForecast") 
    var response = await result.text();
    setData(response)
  }

  React.useEffect(()=>{
    getData()
  },[])



  return (
    <div>
        {data}
    </div>
  )
}
