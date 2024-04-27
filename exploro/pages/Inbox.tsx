
import React from 'react';
import Image from "next/image";
import { useState, useEffect } from "react";
import Post from '@/components/post';
import Chats from '@/components/Chats';
import Sidebar from '@/components/SideBar';
import Header from '@/components/Header'
import PostInput from '@/components/PostInput';
import ProfileSideBar from '@/components/ProfileSideBar';
import { useAuthGuard } from '@/hooks/useAuthGuard';


const InboxPage = () => {
  useAuthGuard();


  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isSiderbarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSiderbarOpen);
  };

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  }

  return (
    <div className="lg:hidden bg-white">
      <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
        {/* Sidebar */}
        {/* <Sidebar></Sidebar> */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-primary-500 ">
          {/* Header */}
          <header className="flex fixed w-full p-4 bg-primary-500  justify-center items-center justify-content-center">
            <button className='absolute left-4' onClick={toggleSidebar}>
              <Image
                src="/images/burgermenu.svg"
                alt="menu"
                width={25}
                height={25}
                className=' '
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}></Image>
            </button>
            <Header></Header>

            <button className='absolute right-2' onClick={toggleProfileSidebar}>
              <Image
                src="/images/settings.png"
                alt="menu"
                width={55}
                height={25}
                className=' '
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}></Image>
            </button>
          </header>

          {/* Sidebar */}
          <div className={`fixed top-0 left-0 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-500 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSiderbarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar />
          </div>
          {isSiderbarOpen && (
            <div className="fixed w-full inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>
          )}

          {/* Profile Sidebar */}
          <div className={`fixed top-0 right-0 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ProfileSideBar />
          </div>
          {isProfileSidebarOpen && (
            <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleProfileSidebar}></div>

          )}

          {/* Post Input & Feed */}
          <div className="flex justify-center space-y-6 w-full mt-20 mb-6">

            {/* Chats */}
            <div className="w-full h-full p-5 right-0 top-10 fixed min-h-screen my-6 pb-20">
              <Chats />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
export default InboxPage;
