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
 
export default function AllArticles() {
  const [contentDetail, setContentDetail] = useState<{[postId:number]: boolean}>({});
  const [posts, setPosts] = useState<Post[]>([]);

  const handleContentDetail = (postId: number) => {
    setContentDetail((prevContentDetail) => ({
      [postId]: !prevContentDetail[postId]
    }));
  };

  useEffect (() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://sistech-finpro.vercel.app/api/v1/articles', {
        method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
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
        <div className="border w-full border-slate-500 cursor-pointer" onClick={() => handleContentDetail(post.id)}>
          <div className="p-6 pt-4">
            <h1 className="text-2xl font-bold font-serif">{post.title}</h1>
            <div className={`text-lg text-slate-600 ${contentDetail[post.id] ? 'mb-5' : ''}`}>
              <h2>{post.creator.username}</h2>
            </div>
            <div className={`max-h-0 overflow-auto transition-max-h duration-[60ms] ease-in-out ${contentDetail[post.id] ? 'max-h-screen mb-2' : ''}`}>
              <p className="text-justify whitespace-pre-line">{post.content}</p>
            </div>
          </div>
          <div className="p-2 whitespace-normal max-w-full">
            <p className="text-right pr-3 pb-3 ml-auto text-slate-500 whitespace-normal break-words">
              {post.tag.map((eachTag: string, index: number) => (
                <span key={index} className="pr-1">#{eachTag}</span>
              ))}
            </p>
          </div>
        </div>
    </div>
      ))}
    </div>
  )
}
