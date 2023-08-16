'use client'
import { useEffect } from "react"
import Navbar from "@/components/Navbar"
import NavbarUser from "@/components/NavbarUser"
import Header from "@/components/Header"
import AllArticles from "@/components/AllArticles"

let usertoken = '';

export default function Home() {
  useEffect (() => {
    usertoken = localStorage.getItem('userToken') || '';
    console.log('hai')
    console.log(usertoken)
  }, [])

  if (usertoken == ''){
    return (
      // for general user
      <main>
        <Navbar/>
        <Header/>
        <AllArticles/>
      </main>
    )
  } else{
    // for signed user
    return (
      <main>
        <NavbarUser/>
        <Header/>
        <AllArticles/>
      </main>
    )
  }
}