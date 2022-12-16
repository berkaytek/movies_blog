import React from 'react'
import Navbar from './Navbar'

// Since the children will be ReactNode
export interface props {
    children?: React.ReactNode;
 }

export default function Layout({ children }:props) {
  return (
    <>
      <Navbar>
        <main>{children}</main>
      </Navbar>
    </>
  )
}
