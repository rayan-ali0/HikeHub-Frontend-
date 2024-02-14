import Navbar from '../Layout/Navbar/Navbar.js'
import Footer from '../Layout/Footer/Footer.js'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout =()=>{

    return (
        <>
        <Navbar/>
        <Outlet />
        <div style={{marginTop:"4rem"}}>
        <Footer />
        </div>
        </>
      )
}

export default Layout