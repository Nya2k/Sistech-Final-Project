'use client'
import NavbarUser from "@/components/NavbarUser"
import Header from "@/components/Header"
import WriteForm from "@/components/WriteForm"
import YourArticles from "@/components/YourArticles"

export default function Write({params}:{params:{slug:string}}) {
  return (
    <main>
      <NavbarUser/>
      <Header/>
      <WriteForm/>
      <YourArticles/>
    </main>
  )
}