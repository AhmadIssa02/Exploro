import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Router from "next/router";
import { setTokenCookie } from "@/utils/cookieUtils";

const SignUpPageLg = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const profilePicture = "http://localhost:9000/exploro/07ac74c0c91c329610b51adcc40c56ef.jpg";


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/;

        // Check if password meets complexity requirements
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match');
            return;
        }
        try {

            const name = `${firstName} ${lastName}`;
            const user = { name, email, password, profilePicture };
            const response = await axios.post('http://localhost:3000/auth/signup', user);
            const token = response.data.token;
            setTokenCookie(token);
            if (response) {
                Router.push('/auth/verify');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    alert('This email is already in use. Please use another email.');
                } else {
                    alert('Signup failed: ' + error.response.data.message);
                }
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };
    return (
        <>
            <div className="poppins-medium w-1/2 bg-tertiary-500 flex justify-center items-center">
                {/* Form Container */}
                <Image
                    src="/images/plane.svg"
                    alt="logo"
                    width={120}
                    height={120}
                    className='absolute top-0 left-20'
                    style={{
                        maxWidth: "100%",
                        height: "auto"
                    }} />
                <form className=" flex flex-col justify-center items-center bg-primary-500 rounded-2xl w-7/12 h-3/4 shadow-sm shadow-primary-700" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="flex relative w-3/4 mt-10 space-x-2 mb-[28px]">
                        <div className="relative w-1/2">
                            <label htmlFor="first-name" className="text-sm font-medium text-white absolute -top-6 left-0">
                                First Name
                            </label>
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        {/* Last Name Input */}
                        <div className="relative w-1/2">
                            <label htmlFor="last-name" className="text-sm font-medium text-white absolute -top-6 left-0">
                                Last Name
                            </label>
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="relative w-3/4 mb-[28px]">
                        <label htmlFor="email-address" className="text-sm font-medium text-white absolute -top-6 left-0">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder text-gray-900 focus:outline-none  focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password Input */}
                    <div className="relative w-3/4 mb-[28px]">
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
                    </div>
                    {/* Confirm Password Input */}
                    <div className="relative w-3/4 mb-4">
                        <label htmlFor="confirm-password" className="text-sm font-medium text-white absolute -top-6 left-0">
                            Confirm Password
                        </label>
                        <div className="flex items-center relative">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                            >
                                {showConfirmPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                            </button>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="shadow-sm shadow-secondary-600 group relative w-full flex justify-center py-[6px] px-4 text-base rounded-md text-black bg-secondary-500 hover:bg-secondary-700   "
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="poppins-semibold mt-2 text-white">
                        Already have an account? <Link href="/auth/login" className="text-secondary-500  hover:underline">Sign in</Link>
                    </div>
                    <Image
                        src="/images/ticket.svg"
                        alt="logo"
                        width={70}
                        height={70}
                        className='absolute bottom-4 left-[420px] '
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                </form >
            </div >
            <div className="w-1/2 bg-primary-500 flex items-center h-screen ">
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
                        }} />
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
                            }} />
                        <Image
                            src="/images/Heart.svg"
                            alt="heart icon"
                            width={50}
                            height={50}
                            className="mb-4"
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }} />
                        <Image
                            src="/images/Vector-1.svg"
                            alt="thumb icon"
                            width={50}
                            height={50}
                            className="rotate-12"
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }} />
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
    );
}
export default SignUpPageLg;