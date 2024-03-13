import { useState } from "react";
import Image from "next/image";

const SignUpFormSm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted', { firstName, lastName, email, password, confirmPassword });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-primary-500 text-white poppins-semibold ">
        <Image src="/images/logo.svg" alt="logo" width={120} height={120} className='mt-16' style={{ maxWidth: "100%", height: "auto" }} />
        <div className="text-4xl text-white my-6">
            Sign Up
        </div>
        <div className="h-full w-full flex justify-start items-center py-2 bg-primary-500 font-poppins">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-lg text-black">
            <div className="mb-4 ">
            <input type="text" required placeholder="First Name" className=" shadow-sm shadow-white w-full p-3 rounded-xl text-gray-700 text-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="mb-4 ">
            <input type="text" required placeholder="Last Name" className="shadow-sm shadow-white w-full p-3 rounded-xl  text-gray-700 text-lg" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="email" required  placeholder="Email" className="shadow-sm shadow-white w-full p-3 rounded-xl  text-gray-700 text-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="password" required  placeholder="Password" className="shadow-sm shadow-white w-full p-3 rounded-xl  text-gray-700 text-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="text" required placeholder="Confirm Password" className="shadow-sm shadow-white w-full p-3 rounded-xl  text-gray-700 text-lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <button
            type="submit"
            className="w-1/3 p-4 rounded-md bg-secondary-500 text-white font-bold text-xl hover:bg-secondary-600 transition duration-300 ease-in-out"
            >
            Sign Up
            </button>
            
        </form>
        </div>
    </div>
  );
};

export default SignUpFormSm;
