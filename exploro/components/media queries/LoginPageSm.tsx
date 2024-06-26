import { useState } from "react";
import Image from "next/image";
import axios from 'axios';
import Link from "next/link";
import Router from "next/router";
import { setTokenCookie } from "@/utils/cookieUtils";
import jwt from 'jsonwebtoken';

const LoginPageSm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { email, password });
            const token = response.data.token;
            setTokenCookie(token);
            const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
            const userId = decoded.id;
            const user = await axios.get(`http://localhost:3000/users/${userId}`);
            if (user.data.verifyEmailToken === null) {
                Router.push('/feed');
            }
            else {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Unauthorized access! Please check your verification code.';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            if (error.response && error.response.status === 401) {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Invalid email or password.Please try again..';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="h-max w-full flex flex-col  items-center bg-primary-500  text-white poppins-semibold ">
            <Image src="/images/logo.svg" alt="logo" width={100} height={120}
                className="mt-16 md:mt-24 w-28 h-28 sm:w-32 sm:h-40 md:w-40 "
                style={{ maxWidth: "100%", height: "auto" }} />
            <div className="text-4xl md:text-5xl text-white mt-16 mb-8">
                Login
            </div>
            <div className=" w-full flex justify-center items-center py-2 mt-2  font-poppins">
                <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center text-2xl md:text-3xl text-black p-4 bg-primary-500 rounded-3xl gap-y-8">

                    <div className="mb-4 w-full">
                        <input type="email" required placeholder="Email" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80  " value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center relative">
                            <input type={showPassword ? "password" : "text"} required placeholder="Password" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-1/2 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                            >
                                {showPassword ? (<Image src="/images/hide2.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show2.png" alt="eye icon" width={20} height={20} />)}
                            </button>
                        </div>
                        <Link href="/auth/forget-password">
                            <div className="text-white hover:underline text-sm mt-2">Forget Password?</div>
                        </Link>
                    </div>
                    <button type="submit" className=" p-4 mt-8 rounded-md bg-secondary-500 text-white font-bold  hover:bg-secondary-600 transition duration-300 ease-in-out">
                        Login
                    </button>
                </form>

            </div>
            <div className="text-white my-4 p-4 text-xl md:text-3xl">
                <span>Don`t have an account?</span>
                <a href="/auth/signup" className="text-secondary-500"> Sign Up</a>
            </div>
        </div>
    );
};

export default LoginPageSm;
