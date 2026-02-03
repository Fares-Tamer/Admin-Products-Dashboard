import {  useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductPage from "./ProductPage";
import { ToastContainer } from "react-toastify";





export default function App() {
   
  const [theme,setTheme] = useState(localStorage.getItem("theme")||'light')  

  

  useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add("dark") 
      localStorage.setItem("theme",'dark')

    }else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme","light")
    }
    
  },[theme]) 
  return <> 
    <Navbar theme={theme} setTheme={setTheme}/>   
    <ProductPage/> 
    <ToastContainer 
      position="top-center"
      autoClose={2500}
      hideProgressBar
      closeOnClick
      pauseOnHover={true}
      theme="dark"
    />
  </> 
}

