import SignUpFormLg from '@/components/media queries/SignUpFormLg';
import SignUpFormSm from '@/components/media queries/SignUpFormSm';
import React  from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';


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
    <>
    <div className="lg:flex hidden min-h-screen poppins-medium">
      <SignUpFormLg/>
    </div>
    <div className=' lg:hidden h-dvh bg-primary-500'>
      <SignUpFormSm/>
    </div>
    </>
  );
};

export default LoginPage;
