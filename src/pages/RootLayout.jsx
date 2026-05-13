import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

const RootLayout = () => {
  return (
    <>
    <Header/>
        <main>
            <Outlet/>
        </main>
    <Footer/>
    </>
  )
}

export default RootLayout