import React from 'react';
import Image from "next/image";
import { useState, useEffect } from "react";
import Post from '@/components/post';
import Chats from '@/components/Chats';
import Sidebar from '@/components/SideBar';
import Header from '@/components/Header'
import PostInput from '@/components/PostInput';
import ProfileSideBar from '@/components/ProfileSideBar';


const samplePost = {
    username: 'Traveler123',
    bio: 'Traveling the world!',
    location: 'Mount Everest, Nepal',
    timeAgo: '3 days ago',
    content: 'Just reached the base camp, what a view!',
    profileImageUrl: '/images/man.png', 
    mainImageUrl: '/images/postImage.png', 
    onLike: () => console.log('Liked!'),
    onComment: () => console.log('Commented!'),
    onShare: () => console.log('Shared!'),
  };
  
    
  
const FeedLg: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  

    // const [visible, setVisible] = useState(true);
    // const [lastScrollY, setLastScrollY] = useState(0);
  
    // const handleScroll = () => {
    //   const currentScrollY = window.scrollY;
    //   setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
    //   setLastScrollY(currentScrollY);
    // };
  
    // useEffect(() => {
    //   const controlNavbar = () => {
    //     if (typeof window !== 'undefined') {
    //       window.addEventListener('scroll', handleScroll, { passive: true });
  
    //       return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //       };
    //     }
    //   };
  
    //   controlNavbar();
    // }, [lastScrollY]);
    
    return (
        <>
          <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-quarternary-500 ">
          {/* Header */}
          <header className="flex fixed w-full p-4 bg-primary-500  justify-center items-center justify-content-center">
            <Header></Header>
            
            <button className='absolute right-6' onClick={toggleSidebar}>
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
          </header>
          
          {/* Profile Sidebar */}
          <div className={`fixed top-0 right-0 w-1/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ProfileSideBar 
              username = {samplePost.username}
              bio = {samplePost.bio}
              profileImageUrl ={samplePost.profileImageUrl}
            />
          </div>
          {isSidebarOpen && (
              <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>
              
          )}

          {/* Post Input & Feed */}
          <div className="flex justify-center items-center space-y-6 w-full mt-14 mb-6">
            <div className='w-1/4 bg-primary-500'/>

            {/* Post Input */}
            <div className="flex flex-col justify-center space-y-6 w-full mr-8">
              <PostInput/>
              <Post
                username={samplePost.username}
                location={samplePost.location}
                timeAgo={samplePost.timeAgo}
                content={samplePost.content}
                profileImageUrl={samplePost.profileImageUrl}
                mainImageUrl={samplePost.mainImageUrl}
                onLike={samplePost.onLike}
                onComment={samplePost.onComment}
                onShare={samplePost.onShare}
              />
              <Post
                username={samplePost.username}
                location={samplePost.location}
                timeAgo={samplePost.timeAgo}
                content={samplePost.content}
                profileImageUrl={samplePost.profileImageUrl}
                mainImageUrl={samplePost.mainImageUrl}
                onLike={samplePost.onLike}
                onComment={samplePost.onComment}
                onShare={samplePost.onShare}
              />
            </div>
        
            {/* Chats */}
            <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0">
              <Chats />
            </div>

          </div>

        </div>

      </div>
    </>
    );
};
    
export default FeedLg;