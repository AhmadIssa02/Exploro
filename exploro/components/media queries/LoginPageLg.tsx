import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Router from "next/router";
import { setTokenCookie } from "@/utils/cookieUtils";
import jwt from 'jsonwebtoken';


const LoginPageLg = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

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
        <>
            <div className="w-1/2 bg-tertiary-500 flex justify-center items-center">
                {/* Form Container */}
                <Image
                    src="/images/plane.svg"
                    alt="logo"
                    width={150}
                    height={150}
                    className='absolute top-4 left-24'
                    style={{
                        maxWidth: "100%",
                        height: "auto"
                    }}
                />

                <form
                    className="flex flex-col justify-center items-center space-y-3 bg-primary-500 rounded-2xl w-1/2 h-2/3 shadow-sm shadow-primary-700"
                    onSubmit={handleSubmit}
                >
                    {/* Email Input */}
                    <div className="relative w-5/6 mt-12 mb-4">
                        <label htmlFor="email-address" className="text-sm font-medium text-white absolute -top-6 left-0">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password Input */}
                    <div className="relative w-5/6 items-center">
                        <label htmlFor="password" className="text-sm font-medium text-white absolute -top-6 left-0">
                            Password
                        </label>
                        <div className="flex items-center relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                            >
                                {showPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                            </button>
                        </div>
                        <button
                            type="button"
                            className="text-white poppins-semibold ml-2 text-[10px] hover:underline "
                        >
                            <Link href="/auth/forget-password">
                                Forgot Password?
                            </Link>
                        </button>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 text-lg rounded-md text-black bg-secondary-500 hover:bg-secondary-700 "
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="poppins-semibold text-white">
                        Don`t have an account? <Link href="/auth/signup" className="text-secondary-500 hover:underline">Sign Up</Link>
                    </div>
                    <Image
                        src="/images/ticket.svg"
                        alt="ticket"
                        width={70}
                        height={70}
                        className='absolute bottom-10 left-96'
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}
                    />
                </form>
            </div>
            <div className="w-1/2 bg-primary-500 flex items-center h-screen">
                <div className="w-full">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={80}
                        height={80}
                        className='absolute top-4 right-8'
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}
                    />
                    {/* Icon Container */}
                    <div className="absolute right-[300px] top-16 flex space-x-2">
                        <Image
                            src="/images/Vector.svg"
                            alt="chat icon"
                            width={50}
                            height={50}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                        <Image
                            src="/images/Heart.svg"
                            alt="heart icon"
                            width={50}
                            height={50}
                            className="mb-4"
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                        <Image
                            src="/images/Vector-1.svg"
                            alt="thumb icon"
                            width={50}
                            height={50}
                            className="rotate-12"
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}
                        />
                    </div>
                    {/* Text Section */}
                    <div className="flex flex-col ml-12">
                        <h1 className='poppins-semibold text-6xl text-secondary-500'>Exploro.</h1>
                        <p className="text-4xl italic poppins-medium text-white mt-4">
                            Unveiling the World, <br /> One Journey at a Time.
                        </p>
                    </div>

                    <button
                        className="shadow-sm shadow-secondary-700 absolute bottom-16 right-4 font-semibold p-3 rounded-xl text-2xl text-black bg-secondary-500 hover:bg-secondary-700 "
                    >
                        <Link href="/">
                            Explore our story
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
};
export default LoginPageLg;



