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
    <div className="h-max w-full flex flex-col  items-center bg-primary-500  text-white poppins-semibold ">
        <Image src="/images/logo.svg" alt="logo" width={100} height={120} 
        className="mt-16 md:mt-24 w-28 h-28 sm:w-32 sm:h-40 md:w-40 "
        style={{ maxWidth: "100%", height: "auto" }} />
        <div className="text-4xl md:text-5xl text-white mt-12 mb-4">
            Sign Up
        </div>
        <div className=" w-full flex justify-center items-center py-2 mt-2  font-poppins">
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center text-2xl md:text-3xl text-black p-4 bg-primary-500 rounded-3xl gap-y-8">
              <div className="mb-4 w-full">
              <input type="text" required placeholder="First Name" className="  bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="mb-4 w-full">
              <input type="text" required placeholder="Last Name" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div className="mb-4 w-full">
              <input type="email" required  placeholder="Email" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80  " value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-4 w-full">
              <input type="password" required  placeholder="Password" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="mb-4 w-full">
              <input type="password" required placeholder="Confirm Password" className="bg-transparent border-0 border-b-2 border-white w-full text-white placeholder-white/80" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>
              <button
              type="submit"
              className=" p-4 rounded-md bg-secondary-500 text-white font-bold  hover:bg-secondary-600 transition duration-300 ease-in-out"
              >
              Sign Up
              </button>
              
          </form>
        </div>
    </div>
  );
};

export default SignUpFormSm;
