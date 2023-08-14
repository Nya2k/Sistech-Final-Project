'use client'
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import WriteForm from "@/components/WriteForm"
import YourPosts from "@/components/YourPosts"

export default function Write({params}:{params:{slug:string}}) {
  // const token = localStorage.getItem('userToken')
  
  // fetch('https://sistech-finpro.vercel.app/api/v1/articles', {
  //     method: 'GET',
  //     headers : {
  //       'Content-Type' : 'application/json',
  //       'Authorization': token
  //     }
  //   })
  //   .then(res => res.json())
  //   // .then(data => renderPosts(data))

  return (
    <main>
      <Navbar/>
      <Header/>
      <WriteForm/>
      <YourPosts/>
    </main>
  )
}