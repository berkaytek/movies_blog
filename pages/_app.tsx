import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";


export default function App({ Component, pageProps }: AppProps) {
  return( 
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}
