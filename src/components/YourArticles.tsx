import { use, useState } from "react"
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
let postid = 0;
 
export default function YourArticles() {
  const [contentDetail, setContentDetail] = useState<{[postId: number]: boolean}>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [deleteButton, setDeleteButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  const handleContentDetail = (postId: number) => {
    setContentDetail((prevContentDetail) => ({
      [postId]: !prevContentDetail[postId]
    }));
  };

  const handleEditPost = (postId: number) => {
    localStorage.setItem('postId', postId.toString());
    // masukin value ke writeForm
    setEditButton(true);
  }

  const handleDeletePost = (postId: number) => {
    localStorage.setItem('postId', postId.toString());
    setDeleteButton(true);
  }

  const handleRefreshPage = () => {
    setRefresh((prevRefreshState) => (!prevRefreshState))
  }

  // POST FUNCTION
  useEffect (() => {
    usertoken = localStorage.getItem('userToken') || '';
    username = localStorage.getItem('userName') || '';
    console.log('masuk post')
    const fetchData = async () => {
      try {
        const res = await fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${username}`, {
        method: 'GET',
        headers : { 
          'Content-Type': 'application/json',
          'Authorization': `JWT ${usertoken}`
        },
          body: JSON.stringify({
            title: 'bingung',
            content: 'oke',
          })
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
  }, [refresh]) 

  // DELETE FUNCTION
  useEffect ( ()=> {
    if (deleteButton){
      postid = parseInt(localStorage.getItem('postId') || '', 0);
      const deletePost = async () => {
        try{
          const res = await fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${postid}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${usertoken}`
            },
          });
        } catch (err) {
          console.log(err)
        }
      };
      deletePost();
      handleRefreshPage();
      console.log('delete success')
    }
  }, [deleteButton])

  // EDIT FUNCTION
  useEffect(() => {
    if (editButton) {
      postid = parseInt(localStorage.getItem('postId') || '', 0);
      const editPost = async () => {
        try{
          const res = await fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${postid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${usertoken}`
            },
          })
        } catch (err) {
          console.log(err)
        }
      };
      editPost();
      handleRefreshPage();
      console.log('edit success')
    }
  }, [editButton])

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.id} className="px-20 py-4">
        <div className="border w-full border-slate-500 cursor-pointer">
          <div className="p-6 pt-4" onClick={() => handleContentDetail(post.id)}>
            <h1 className="text-2xl font-bold font-serif">{post.title}</h1>
            <div className={`text-lg text-slate-600 ${contentDetail[post.id] ? 'mb-5' : ''}`}>
              <h2>{post.creator.username}</h2>
            </div>
            <div className={`max-h-0 overflow-auto transition-max-h duration-[60ms] ease-in-out ${contentDetail[post.id] ? 'max-h-screen mb-2' : ''}`}>
              <p className="text-justify whitespace-pre-line">{post.content}</p>
            </div>
          </div>
          <div className="p-2 whitespace-normal max-w-full">
            <p className="text-right pr-3 ml-auto text-slate-500 whitespace-normal break-words">
              {post.tag.map((eachTag: string, index: number) => (
                <span key={index} className="pr-1">#{eachTag}</span>
              ))}
            </p>
          </div>
          <div className={` text-slate-500 pl-6 font-semibold font-sans transition-max-h overflow-auto ${contentDetail[post.id] ? 'transition-opacity opacity-100 duration-300 pb-4' : 'transition-opacity opacity-0 duration-300 p-0 -pb-2'}`}>
            <a className="pr-5" type="submit" onClick={() => handleEditPost(post.id)}>edit</a>
            <a type="submit" onClick={() => handleDeletePost(post.id)}>delete</a>
          </div>
        </div>
    </div>
      ))}
    </div>
  )
}
