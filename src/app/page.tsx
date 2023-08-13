'use client'

import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Posts from "@/components/Posts"

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Header/>
      <Posts posts={[]}/>
    </main>
  )
}