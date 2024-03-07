// pages/login.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted', { email, password });
  };

  return (
    <div className="flex min-h-screen poppins-medium">
      {/* Left Blue Section */}
      
      
      {/* Right Blue Section */}
        <div className="w-1/2 bg-tertiary-500 flex justify-center items-center">
            {/* Form Container */}
            <Image src="/images/plane.svg" alt="logo" width={200} height={200} className='absolute top-4 left-24'/>

            <form className=" flex flex-col justify-center items-center space-y-4 bg-primary-500 rounded-2xl w-1/2 h-2/3" onSubmit={handleSubmit}>
          {/* Email Input */}
                <div className="relative w-5/6 mt-16 mb-4">
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
                <div className="relative w-5/6">
                    <label htmlFor="password" className="text-sm font-medium text-white absolute -top-6 left-0">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                    {/* Submit Button */}
                    <div>
                        <button
                        type="submit"
                        className="shadow-2xl group relative w-full flex justify-center py-2 px-4 text-lg rounded-md text-black bg-secondary-500 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                        Sign in
                        </button>
                    </div>
                    <div className="poppins-semibold">
                        Don`t have an account? <Link href="/auth/signup" className="text-secondary-500 hover:underline">Sign Up</Link>
                    </div>
                    <Image src="/images/ticket.svg" alt="logo" width={70} height={70} className='absolute bottom-16 left-96 -rotate-30'/>
            </form>
        </div>
        <div className="w-1/2 bg-primary-500 flex items-center h-screen">
      <div className="w-full">
        <Image src="/images/logo.svg" alt="logo" width={80} height={80} className='absolute top-4 right-8'/>
        {/* Icon Container */}
        <div className="absolute right-[300px] top-16 flex space-x-2">
          <Image src="/images/Vector.svg" alt="chat icon" width={50} height={50} />
          <Image src="/images/Heart.svg" alt="heart icon" width={50} height={50} className="mb-4"/>
          <Image src="/images/Vector-1.svg" alt="thumb icon" width={50} height={50} className="rotate-12"/>
        </div>
        {/* Text Section */}
        <div className="flex flex-col ml-12">
          <h1 className='poppins-semibold text-[66px] text-secondary-500'>Exploro.</h1>
          <p className="text-[42px] italic poppins-medium text-white mt-4">
            Unveiling the World, <br /> One Journey at a Time.
          </p>
        </div>
        <button
          className="shadow-2xl absolute bottom-16 right-4 font-semibold p-3 rounded-xl text-2xl text-black bg-secondary-500 hover:bg-secondary-700 "
        >
          Explore our story
        </button>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
