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
import CreateProduct from "./components/sections/CreateProduct"
import UpdateProduct from "./components/sections/UpdateProduct"
import UserContext from "./components/Context/UserContext"
import { useEffect, useState } from "react"
import ErrorPage from "./components/pages/ErrorPage"




function App() {

 const [currentUser, setCurrentUser] = useState(undefined);
  const SaveAuth = (auth) => {
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };

  const GetAuth = () => {
     return JSON.parse(sessionStorage.getItem("auth"));
  };

  const RemoveAuth = () =>{
      sessionStorage.removeItem('auth')
  }

  useEffect(()=>{
    const sesion=GetAuth();
    if (sesion) {
      setCurrentUser(sesion)
    }
    return()=>{
      setCurrentUser(undefined)
    }
  },[])
  
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, SaveAuth, GetAuth, RemoveAuth}}>
    <BrowserRouter>
    <header>
      <NavBar/>
    </header>
    <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          {(currentUser!==undefined&&currentUser.role==="Admin")&&<Route path="/Administration" element={<Administration/>}/>}
          <Route path="/CreateProduct" element={<CreateProduct/>}/>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct/>}/>
          <Route path="/*" element={<ErrorPage/>}/>
        </Routes>
    </main>
    <footer>
      <Footer/>
    </footer>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
