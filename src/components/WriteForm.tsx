import { useState } from "react";

export default function WriteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  let username = localStorage.getItem('username')

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: any) => {
    setContent(event.target.value);
  };

  const handleTags = (event: any) => {
    setTags(event.target.value);
  };

  const handlePost = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('mau post')
    
    fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tags
      })
    })
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      // renderPosts(dataArr);
      console.log("post created");
    })
  }

  return (
    <div className="flex items-center justify-center px-20 py-4">
        <div className="w-full max-w-screen border border-slate-200 rounded bg-gray-300 p-5 shadow-md">
            <form className="font-sans text-gray-700 text-lg font-semibold p-6 flex flex-col">
                <div className="text-2xl font-semibold font-serif pb-4 text-slate-900">TITLE</div>
                <input
                  value = {title}
                  onChange = {handleTitle}
                  className ="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="articleTitle" type="text" placeholder="The Article's Title"></input>
                <div className="text-2xl font-semibold font-serif pb-4 text-slate-900">CONTENT</div>
                <textarea 
                  rows={10} 
                  value = {content}
                  onChange= {handleContent}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="articleContent" placeholder="Write the content of The Article here"></textarea>
                <div className="text-2xl font-semibold font-serif pb-4 text-slate-900">TAGS</div>
                <input
                  value ={tags}
                  onChange={handleTags}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="articleTags" type="text" placeholder="The Article's Tags"></input>
                <button type="submit" className="bg-gray-500 text-white ml-auto px-5 py-2 mt-4 rounded" onClick={handlePost}>POST</button>
            </form>
        </div>
    </div>
  )
}