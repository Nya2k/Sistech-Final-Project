import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleUsername = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('https://sistech-finpro.vercel.app/api/v1/users/signin', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data.token);
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', username);
            router.push("/articles")
        })
        console.log('sign in success')
    }

  return (
    <div className="flex items-center justify-center py-5">
         <div className="w-full max-w-md border border-slate-200 rounded bg-white p-5 shadow-md">
            <form className="font-sans text-gray-700 text-lg font-semibold">
                <div className="pb-6 text-xl text-slate-900">SIGN IN</div>
                <div>
                    <label className="block mb-2" htmlFor="email">Username</label>
                    <input 
                        value = {username}
                        onChange = {handleUsername}
                        className ="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        value = {password}
                        onChange={handlePassword}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"></input>
                </div>
                <button className="bg-slate-700 text-white p-3 mt-6 rounded w-full" onClick={handleSignIn}>SIGN IN</button>
                <div className="flex items-center justify-center text-sm mt-4">
                    <div className="">
                        Doesn't have an account?
                    </div>
                    <a href="/users/signup" className="text-amber-700 ml-1.5">Sign Up</a>
                </div>
                <div className="flex justify-end text-sm mt-7 text-slate-500 font-normal">
                    <a href="/articles">Start reading without an account 🡪</a>
                </div>
            </form>
        </div>
    </div>
  )
}
