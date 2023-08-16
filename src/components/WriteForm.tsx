import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function WriteForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<String[]>([])
  const [button, setButton] = useState(false)
  
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  
  const handleContent = (e: any) => {
    setContent(e.target.value);
  };
  
  const handleTags = (e: any) => {
    const input = (e.target.value);
    const arr = input.split(',');
    setTags(arr);
  };

  useEffect (() => {
    if (button && title != '') {
    const handlePost = async () => {
      try {
        let usertoken = localStorage.getItem('userToken');
        const res = await fetch(`https://sistech-finpro.vercel.app/api/v1/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${usertoken}`
          },
          body: JSON.stringify({
            title: title,
            content: content,
            tags: tags
          })
        })
        setButton(false);
        console.log('post success')
      } catch (err) {
        console.log(err)
      }
    }
    handlePost();
  } 
  },[button, title, content, tags])

  const notify = () => {
    toast('hai');
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
                  onChange={handleTags}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-7 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="articleTags" type="text" placeholder="The Article's Tags"></input>
                <button type="submit" className="bg-gray-500 text-white ml-auto px-5 py-2 mt-4 rounded" onClick={notify}>POST</button>
            </form>
            <ToastContainer />
        </div>
    </div>
  )
}