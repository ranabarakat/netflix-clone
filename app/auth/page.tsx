"use client";


import Input from "../../components/Input";
import { useCallback, useState } from "react";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
// import { setCookie } from 'nookies';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [variant, setVariant] = useState('login')


    const toggleVariant = useCallback(() => {
        setVariant((currVariant) => currVariant === 'login' ? 'register' : 'login');
    }, [])

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked)
    };


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/',

            });

            router.push('/')
            // if (rememberMe) {
            //     // Set a cookie to remember the user
            //     setCookie(null, 'rememberMe', 'true', {
            //         maxAge: 30 * 24 * 60 * 60, // 30 days
            //         path: '/',
            //     });
            // } else {
            //     // Remove the cookie if not remembering
            //     setCookie(null, 'rememberMe', 'false', {
            //         maxAge: -1,
            //         path: '/',
            //     });
            // }
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);


    const register = useCallback(async () => {
        try {
            await axios.post('../api/register', { name, email, password });
            login();
        } catch (error) {
            console.log(error)
        }
    }, [name, email, password, login]);



    return (
        <div className="relative h-full w-full bg-[url('/images/wallpaper.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black h-full w-full bg-opacity-40">
                <nav className="px-12 py-5">
                    <img src="/images/logo2.png" alt="Logo" className="h-12" />
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 mt-2 self-center lg:w-2/5 lg:max-w-md w-full rounded-md  ">
                            <h2 className="text-white font-bold text-3xl mb-8">
                                {variant === 'login' ? 'Sign In' : 'Create an account'}
                            </h2>
                            <div className="flex flex-col gap-5">
                                {variant === 'register' && (<Input id="name" label="Username" value={name} onChange={(ev: any) => setName(ev.target.value)} type="" />)}
                                <Input id="email" label="Email or mobile number" value={email} onChange={(ev: any) => setEmail(ev.target.value)} type="email" />
                                <Input id="password" label="Password" value={password} onChange={(ev: any) => setPassword(ev.target.value)} type="password" />

                            </div>
                            <button onClick={variant === 'login' ? login : register} className="bg-custom-red w-full py-3 text-white font-semibold rounded-md mt-10 hover:bg-red-700 transition">
                                {variant === 'login' ? 'Sign In' : 'Get Started'}
                            </button>
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div onClick={() => signIn('google', { callbackUrl: '/', })} className=" w-14 h-14 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition" >
                                    <FcGoogle size={38} />
                                </div>
                                <div onClick={() => signIn('github', { callbackUrl: '/', })} className=" w-14 h-14 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition" >
                                    <FaGithub size={38} />
                                </div>
                            </div>
                            <div className="flex items-center mt-12 text-white">
                                {variant === 'login' && (
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            className="mr-2 h-4 w-4 accent-white "
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                        />
                                        <label htmlFor="rememberMe" className="text-white font-normal">Remember me</label>
                                    </div>)}

                            </div>
                            <p className="text-neutral-500 mt-4">
                                {variant == 'login' ? 'New to Netflix?' : 'Already have an account?'}
                                <span onClick={toggleVariant} className="text-white hover:underline ml-1 cursor-pointer font-semibold">
                                    {variant === 'login' ? 'Sign up now.' : 'Sign in.'}
                                </span>
                            </p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}


export default Auth;