// pages/login.tsx
import React from 'react';
import LoginPageLg from '@/components/media queries/LoginPageLg';
import LoginPageSm from '@/components/media queries/LoginPageSm';

const LoginPage = () => {

  return (
    <>
      <div className="hidden lg:flex min-h-screen poppins-medium">
        <LoginPageLg/>
      </div>
      <div className='lg:hidden h-dvh bg-primary-500'>
        <LoginPageSm/>
      </div>
    </>
  );
};

export default LoginPage;
