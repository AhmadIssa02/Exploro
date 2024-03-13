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
        <Image src="/images/logo.svg" alt="logo" width={150} height={150} className='mt-16' style={{ maxWidth: "100%", height: "auto" }} />
        <div className="text-6xl text-secondary-500 mt-4">
            Exploro.
            <div className="text-2xl mt-4">
                Discover the world.
            </div>
        </div>
        <div className="h-full w-full flex justify-start items-center p-4 bg-primary-500 font-poppins">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-xl">
            <div className="mb-4">
            <input type="text" required placeholder="First Name" className="w-full p-4 rounded-xl text-gray-700 text-xl" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="text" required placeholder="Last Name" className="w-full p-4 rounded-xl  text-gray-700 text-xl" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="email" required  placeholder="Email" className="w-full p-4 rounded-xl  text-gray-700 text-xl" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="password" required  placeholder="Password" className="w-full p-4 rounded-xl  text-gray-700 text-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-4">
            <input type="text" required placeholder="Confirm Password" className="w-full p-4 rounded-xl  text-gray-700 text-xl" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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
