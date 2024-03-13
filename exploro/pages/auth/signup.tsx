import SignUpFormLg from '@/media_queries/SignUpFormLg';
import SignUpFormSm from '@/media_queries/SignUpFormSm';
import React  from 'react';


const LoginPage = () => {
  return (
    <>
    <div className="lg:flex hidden min-h-screen poppins-medium">
      <SignUpFormLg/>
    </div>
    <div className=' lg:hidden h-screen'>
      <SignUpFormSm/>
    </div>
    </>
  );
};

export default LoginPage;
