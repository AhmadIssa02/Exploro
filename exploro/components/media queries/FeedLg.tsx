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
import { FeedPostApi } from '@/utils/api/feedPost/feedPost.api';
import { feedPost } from '@/models/crud';


const FeedLg: React.FC = () => {
  useAuthGuard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [posts, setPosts] = useState<feedPost[]>([]);
  const fetchPosts = async () => {
    try {

      const postApi = new FeedPostApi()
      const posts = await postApi.find();
      setPosts(posts);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const calculateTimeAgo = (date: Date) => {

    const currentDate = new Date();
    const postDate = new Date(date);

    const diff = currentDate.getTime() - postDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }
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
            <ProfileSideBar />
          </div>
          {isSidebarOpen && (
            <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>

          )}

          {/* Post Input & Feed */}
          <div className="flex justify-center items-center space-y-6 w-full mt-14 mb-6">
            <div className='w-1/4 bg-primary-500' />

            {/* Post Input */}
            <div className="flex flex-col justify-center space-y-6 w-full mr-8">
              <PostInput />

              {posts.map((post, index) => {
                return <Post
                  key={index}
                  username={post.username}
                  location={post.location}
                  timeAgo={calculateTimeAgo(post.createdAt)}
                  content={post.content}
                  profileImageUrl={post.profileImageUrl}
                  mainImageUrl={post.mainImageUrl}
                  onLike={() => console.log('Liked!')}
                  onComment={() => console.log('Commnet!')}
                  onShare={() => console.log('Shared!')}
                />
              })}
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