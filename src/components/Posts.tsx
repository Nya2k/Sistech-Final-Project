import { useState } from "react"

//   const handleDelete = (event: React.FormEvent) => {
//     event.preventDefault
//     fetch(`https://sistech-finpro.vercel.app/api/v1/articles/${post.id}`, {
//       method: 'DEL',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `${token}`
//       },
//       body: JSON.stringify({
//         // id:post.id
//       })
//     })
//     .then(res => res.json())
//     .then(() => location.reload())
//     console.log('post deleted')
//   }
//   }
  
//   const renderPosts = (posts: any) => {
//     posts.forEach((post: any) => {
//       output += `
        // <div className="px-20 py-4" post-id=${post.id}>
        //   <div className="border w-full border-slate-500 cursor-pointer" onClick={handleContentDetail}>
        //     <div className="p-6">
        //       <h1 className="text-2xl font-bold font-serif">${post.title}</h1>
        //       <div className={"text-lg text-slate-600 ${contentDetail ? 'mb-5' : ''}"}>
        //         <h2>Linnean Society</h2>
        //       </div>
        //       <div className={\`max-h-0 mb-0 overflow-auto transition-max-h duration-300 ease-in-out ${contentDetail ? 'max-h-screen mb-2' : ''}\`}>
        //         <p className="text-justify whitespace-pre-line">${post.content}</p>
        //       </div>
        //     </div>
        //     <div className="p-2 whitespace-normal max-w-full">
        //       <p className="text-right pr-4 ml-72 text-slate-500 whitespace-normal break-words">
        //         {post.tags.map((tag, tagIndex) => (
        //           <span key={tagIndex} className="mr-1">{tag}</span>
        //         ))}
        //       </p>
        //     </div>
        //     <div className={\` text-slate-500 pl-6 font-semibold font-sans transition-max-h overflow-auto ${contentDetail ? 'transition-opacity opacity-100 duration-300 pb-4' : 'transition-opacity opacity-0 duration-300 p-0 -pb-2'}\`}>
        //       <a className="pr-5">edit</a>
        //       <a>delete</a>
        //     </div>
        //   </div>
        // </div>
//     `;
//     });
//   }


interface Post {
  id: number;
  title: string;
  content: string;
  tag: string;
  creator: {username: string;};
}

interface PostsProps {
  posts: Post[];
}

// const token = localStorage.getItem('userToken')

export async function getPostsData() {
  const res = await fetch('https://sistech-finpro.vercel.app/api/v1/articles', {
    method: 'GET',
    headers : { 
      'Content-Type': 'application/json',
      'Authorization': `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImlhdCI6MTY5MTk0MDYzOSwiZXhwIjoxNjkxOTgzODM5fQ.Z5DsQkkWzKclgAMbyX3H4O40kAxw4JxvKS92uGH7W0Y`
    }
  })
  const posts = await res.json()
  // console.log(posts)
  // return { props: { posts } }
  return(<div>{`begin ${posts[0].content} end`}</div>)
}
 
export default function Posts({posts} : PostsProps) {
  const [contentDetail, setContentDetail] = useState(false);
  
  const handleContentDetail = () => {
    setContentDetail(contentDetail => !contentDetail)
  }

  getPostsData();
  console.log('hai')

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="px-20 py-4">
          <p>{post.id}</p>
        <div className="border w-full border-slate-500 cursor-pointer" onClick={handleContentDetail}>
          <div className="p-6">
            <h1 className="text-2xl font-bold font-serif">{post.title}</h1>
            <div className={`text-lg text-slate-600 ${contentDetail ? 'mb-5' : ''}`}>
              <h2>{post.creator.username}</h2>
            </div>
            <div className={`max-h-0 mb-0 overflow-auto transition-max-h duration-300 ease-in-out ${contentDetail ? 'max-h-screen mb-2' : ''}`}>
              <p className="text-justify whitespace-pre-line">{post.content}
              </p>
            </div>
          </div>
          <div className="p-2 whitespace-normal max-w-full">
            <p className="text-right pr-4 ml-auto text-slate-500 whitespace-normal break-words">
              {post.tag.split(',').map((eachTag, index) => (
                <span key={index}>
                  {eachTag}
                </span>
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



//   return (
//     <div className="px-20 py-4">
//       <div className="border w-full border-slate-500 cursor-pointer" onClick={handleContentDetail}>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold font-serif">Why publish your research with the Zoological Journal of the Linnean Society?</h1>
//           <div className={`text-lg text-slate-600 ${contentDetail ? 'mb-5' : ''}`}>
//             <h2>Linnean Society</h2>
//           </div>
//           <div className={`max-h-0 mb-0 overflow-auto transition-max-h duration-300 ease-in-out ${contentDetail ? 'max-h-screen mb-2' : ''}`}>
//             <p className="text-justify whitespace-pre-line">
//               The Zoological Journal of the Linnean Society publishes papers on systematic and evolutionary zoology and comparative, functional studies.
//               It has a wide circulation amongst zoologists and although narrowly specialized papers are not excluded, potential authors should bear that readership in mind. The Zoological Journal of the Linnean Society is published online-only.
//               Read on to learn more about why the journal is the perfect home for your research and submit today and join our prestigious author community.
//               Global readership and article-level impact
//               The Zoological Journal of the Linnean Society has a global readership demonstrating the international reach and impact that research published in the Journal has within systematic and evolutionary zoology.
//               Article-level metrics, including Altmetrics and Dimensions data, are available for all articles published in the Journal so you can see the impact of your work. Find out more here.
//               Reputation and journal metrics
//               A publication of the prestigious Linnean Society of London, the Journal has a well-earned tradition of publishing high quality research which supports the Society’s mission.
//               With a diverse and internationally renowned editorial board your work is supported by our Editors’ experience and reach; from submission to publication and beyond.
//               With a strong Impact Factor (ranking 12th in the Zoology category in the 2021 score), CiteScore, high article Alt-metric scores and more, the Journal offers an excellent home for your research to generate citations, influence, and impact in the community.
//               Browse some of the most highly cited research that has contributed to our continued success. By publishing in the Zoological Journal of the Linnean Society your work could be included in future collections like this.
//               Rapid and transparent editorial process
//               The Zoological Journal of the Linnean Society is a peer-reviewed journal supported by a rigorous editorial process to ensure it publishes only the highest quality research.
//               Clear author guidelines and wider support for authors is available via the Oxford University Press Author Resource Centre.
//             </p>
//           </div>
//         </div>
//         <div className="p-2 whitespace-normal max-w-full">
//           <p className="text-right pr-4 ml-auto text-slate-500 whitespace-normal break-words">#Tags #Tags</p>
//         </div>
//         <div className={` text-slate-500 pl-6 font-semibold font-sans transition-max-h overflow-auto ${contentDetail ? 'transition-opacity opacity-100 duration-300 pb-4' : 'transition-opacity opacity-0 duration-300 p-0 -pb-2'}`}>
//           <a className="pr-5">edit</a>
//           <a onClick={handleDelete}>delete</a>
//         </div>
//       </div>
//   </div>
//   )
// }