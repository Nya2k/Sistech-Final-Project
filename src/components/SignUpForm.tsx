import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleFirstName = (event: any) => {
        setFirstName(event.target.value);
    };
    
    const handleLastName = (event: any) => {
        setLastName(event.target.value);
    };

    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleUsername = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSignUp = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('https://sistech-finpro.vercel.app/api/v1/users/signup', {
            method: 'POST',         
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
                firstName: firstName,
                lastName: lastName
            })
        })
        .then(res => res.json())
        .then((data) => {
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', username);
            router.push("/articles")
        })
        console.log('sign up success')
    }

  return (
    <div className="flex items-center justify-center py-5">
         <div className="sign-up-container w-full max-w-md border border-slate-200 rounded bg-white p-5 shadow-md">
            <form className="font-sans text-gray-700 text-lg font-semibold">
                <div className="pb-6 text-xl text-slate-900">SIGN UP</div>
                <div className="flex flex-row justify-center items-center">
                    <div className="pr-1">
                        <label className="block mb-2" htmlFor="firstName">First Name</label>
                        <input
                            value={firstName}
                            onChange={handleFirstName}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline"id="firstname" type="text" placeholder="First Name"></input>
                    </div>
                    <div className="pl-1">
                        <label className="block mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            value={lastName}
                            onChange={handleLastName}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Last Name"></input>
                    </div>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={handleEmail}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email"></input>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="username">Username</label>
                    <input
                        value={username}
                        onChange={handleUsername}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={handlePassword}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 font-normal focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"></input>
                </div>
                <button type="submit" className="bg-slate-700 text-white p-3 mt-6 rounded w-full" id="sign-up-button-id" onClick={handleSignUp}>SIGN UP</button>
                <div className="flex items-center justify-center text-sm mt-4">
                    <div>
                        Already have an account?
                    </div>
                    <a href="/users/signin" className="text-amber-700 ml-1.5">Sign In</a>
                </div>
                <div className="flex justify-end text-sm mt-7 text-slate-500 font-normal">
                    <a href="/articles">Start reading without an account 🡪</a>
                </div>
            </form>
        </div>
    </div>
  )
}
