import { useState } from "react"
import { useEffect } from "react";

interface Post{
  id: number;
  title: string;
  content: string;
  creator: {
    username: string;
  };
  tag: string[];
}

let usertoken = '';
let username = '';
const defaultContentDetail : {[key: number]: boolean} = {};
 
export default function YourPosts() {
  const [contentDetail, setContentDetail] = useState(defaultContentDetail);
  const [posts, setPosts] = useState<Post[]>([]);
  
  const handleContentDetail = (postId: number) => {
    setContentDetail((contentDetail) => ({
      ...contentDetail,
      [postId]: !contentDetail[postId]
    }));
  };

  useEffect (() => {
    usertoken = localStorage.getItem('userToken') || '';
    username = localStorage.getItem('userName') || '';
    const fetchData = async () => {
      try {
        const res = await fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${username}`, {
        method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': `JWT ${usertoken}`
        },
        });
        if (res.ok){
          const posts = await res.json()
          setPosts(posts);
        }
      } catch(err){
          console.log(err)
      }
    };
    fetchData();
  }, []) 

  

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.id} className="px-20 py-4">
        <div className="border w-full border-slate-500 cursor-pointer" onClick={(e) => handleContentDetail(post.id)}>
          <div className="p-6">
            <h1 className="text-2xl font-bold font-serif">{post.title}</h1>
            <div className={`text-lg text-slate-600 ${contentDetail ? 'mb-5' : ''}`}>
              <h2>{post.creator.username}</h2>
            </div>
            <div className={`max-h-0 overflow-auto transition-max-h duration-[60ms] ease-in-out ${contentDetail ? 'max-h-screen mb-2' : ''}`}>
              <p className="text-justify whitespace-pre-line">{post.content}</p>
            </div>
          </div>
          <div className="p-2 whitespace-normal max-w-full">
            <p className="text-right pr-3 ml-auto text-slate-500 whitespace-normal break-words">
              {Array.isArray(post.tag) &&
              post.tag.map((eachTag: string, index: number) => (
                <span key={index} className="pr-1">{eachTag}</span>
              ))}
            </p>
          </div>
          <div className={` text-slate-500 pl-6 font-semibold font-sans transition-max-h overflow-auto ${contentDetail ? 'transition-opacity opacity-100 duration-300 pb-4' : 'transition-opacity opacity-0 duration-300 p-0 -pb-2'}`}>
            <a className="pr-5">edit</a>
            <a>delete</a>
          </div>
        </div>
    </div>
      ))}
    </div>
  )
}
