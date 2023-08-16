import { useEffect } from "react";
let username = '';

export default function NavbarUser() {

  useEffect(() => {
    username = localStorage.getItem('userName') || '';
    console.log(username)
  },[])

  return (
    <nav className="bg-white text-slate-500 h-12 pr-5 text-lg font-sans font-semibold drop-shadow-md flex flex-row justify-between items-center">
      <a href="/articles" className="ml-auto px-5 hover:text-slate-950">HOME</a>
      <a href={`/articles/${username}`} className="px-5 hover:text-slate-950">YOUR ARTICLES</a>
      <a href="/users/signup" className="px-5 hover:text-slate-950">YOUR ACCOUNT</a>
    </nav>
  );
}
