/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/

import {  BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import NavBar from "./components/NavBar/NavBar"
import Home from "./components/pages/Home"
import AboutUs from "./components/pages/AboutUs"
import Administration from "./components/pages/Administration"




function App() {
 

  return (
    <BrowserRouter>
    <header>
      <NavBar/>
    </header>
    <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/Administration" element={<Administration/>}/>
          
        </Routes>
    </main>
    <footer>
      <Footer/>
    </footer>
    </BrowserRouter>
  )
}

export default App
