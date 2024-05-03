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
import { calculateTimeAgo } from '@/utils/timeUtils';
import { useMemo } from 'react';



const FeedLg: React.FC = () => {
  useAuthGuard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [posts, setPosts] = useState<feedPost[]>([]);

  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }, [posts]); // Dependency array to ensure sort only runs when posts change


  useEffect(() => {
    let isMounted = true; // Track whether the component is still mounted

    const fetchPosts = async () => {
      try {
        const postApi = new FeedPostApi();
        const fetchedPosts = await postApi.find();
        if (isMounted) {
          setPosts(fetchedPosts);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false; // Set to false when the component unmounts
    };
  }, []);



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

              {posts.length > 0 && sortedPosts.map((post, index) => {
                return <Post
                  key={post._id}
                  postId={post._id}
                  userId={post.user}
                  username={post.username}
                  location={post.location}
                  timeAgo={calculateTimeAgo(post.createdAt)}
                  content={post.content}
                  profileImageUrl={post.profileImageUrl}
                  mainImageUrl={post.mainImageUrl}
                  likes={post.likes}
                  likeCount={post.likeCount}
                />;
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