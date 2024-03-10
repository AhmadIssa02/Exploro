import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted', {  firstName, lastName, email, password, confirmPassword  });
  };

  return (
    <div className="flex min-h-screen poppins-medium">
      {/* Left Blue Section */}
      
      
      {/* Right Blue Section */}
        <div className="w-1/2 bg-tertiary-500 flex justify-center items-center">
            {/* Form Container */}
            <Image src="/images/plane.svg" alt="logo" width={150} height={150} className='absolute top-0 left-24'/>

            <form className=" flex flex-col justify-center items-center bg-primary-500 rounded-2xl w-7/12 h-3/4" onSubmit={handleSubmit}>
          {/* Email Input */}
            <div className="flex relative w-3/4 mt-16 space-x-2 mb-[28px]">
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
                    {/* Confirm Password Input */}
                    <div className="relative w-3/4 mb-4">
                        <label htmlFor="confirm-password" className="text-sm font-medium text-white absolute -top-6 left-0">
                        Confirm Password
                        </label>
                        <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                        {/* Submit Button */}
                    <div>
                        <button
                        type="submit"
                        className="shadow-md shadow-slate-600 group relative w-full flex justify-center py-2 px-4 text-lg rounded-md text-black bg-secondary-500 hover:bg-secondary-700  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                        Sign up
                        </button>
                    </div>
                    <div className="poppins-semibold mt-2">
                        Already have an account? <Link href="/auth/login" className="text-secondary-500  hover:underline">Sign in</Link>
                    </div>
                    <Image src="/images/ticket.svg" alt="logo" width={70} height={70} className='absolute bottom-6 left-[440px] -rotate-30'/>
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
          <Link href = "/">
            Explore our story
          </Link>
        </button>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
