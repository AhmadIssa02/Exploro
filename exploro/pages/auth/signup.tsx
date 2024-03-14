import SignUpPageSm from '@/components/media queries/SignUpPageSm';
import React  from 'react';
import SignUpPageLg from '@/components/media queries/SignUpPageLg';


const LoginPage = () => {
 
  return (
    <>
    <div className="lg:flex hidden min-h-screen poppins-medium">
      <SignUpPageLg/>
    </div>
    <div className=' lg:hidden h-dvh bg-primary-500'>
      <SignUpPageSm/>
    </div>
    </>
  );
};

export default LoginPage;
