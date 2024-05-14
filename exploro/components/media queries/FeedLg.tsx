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
import { getTokenCookie } from '@/utils/cookieUtils';
import jwt from 'jsonwebtoken';
import axios from 'axios';


const logoImage = "http://localhost:9000/exploro/a2afc287bc5f5c421ece69f634670274.png"
const newFeature = "http://localhost:9000/exploro/82c00f0700659e8835f7a82c218be6c3.jpg"
const addFriends = "http://localhost:9000/exploro/8eaf663d40a26c998b982af0fb2380db.png"
const pastDate = new Date('2024-01-01');
const futureDate = new Date('2024-01-02');

const staticPosts: feedPost[] = [
  {
    _id: '1',
    user: '1',
    username: 'Exploro',
    location: 'Everywhere',
    createdAt: pastDate,
    content: 'Welcome to Exploro! 🌍',
    profileImageUrl: logoImage,
    mainImageUrl: logoImage,
    likeCount: 0,
    likes: [],
    updateAt: futureDate,
  },
  {
    _id: '2',
    user: '1',
    username: 'Exploro',
    location: 'Everywhere',
    createdAt: pastDate,
    content: 'Introducing our new chatbot feature! 🤖 Now, you can interact with our chatbot to get instant answers to your questions and discover exciting new content. Try it out today and let us know what you think! 🚀',
    profileImageUrl: logoImage,
    mainImageUrl: newFeature,
    likeCount: 0,
    likes: [],
    updateAt: futureDate,
  },
  {
    _id: '3',
    user: '1',
    username: 'Exploro',
    location: 'Everywhere',
    createdAt: pastDate,
    content: 'Add friends to see more posts! 🌟',
    profileImageUrl: logoImage,
    mainImageUrl: addFriends,
    likeCount: 0,
    likes: [],
    updateAt: futureDate,
  },
];


const FeedLg: React.FC = () => {
  useAuthGuard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
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
    const fetchData = async () => {
      const token = getTokenCookie();
      if (!token) {
        console.error('Token not found.');
        return;
      }
      const decoded = jwt.decode(token) as { id: string; };
      const userId = decoded.id;

      try {
        const user = await axios.get(`http://localhost:3000/users/${userId}`);
        const { friends } = user.data;

        const postApi = new FeedPostApi();
        const fetchedPosts = await postApi.find();
        const relevantPosts = fetchedPosts.filter(post => post.user === userId || friends.includes(post.user));
        // If user has friends, fetch posts from friends
        if (relevantPosts.length > 5) {
          // const friendsPosts = fetchedPosts.filter((post) => friends.includes(post.user));
          setPosts(relevantPosts);
        } else {
          const combinedPosts = [...relevantPosts, ...staticPosts];
          setPosts(combinedPosts);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
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
            <div className='w-1/5 bg-primary-500' />

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
            {/* <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0">
              <Chats />
            </div> */}
            <div className="hidden lg:flex">
              {isChatbotOpen && (
                <div className='flex flex-col fixed right-1 bottom-2 h-[87%] w-[29%] '>
                  <button className='h-fit w-fit ml-auto   rounded-full z-10' onClick={toggleChatbot}>
                    <Image src="/images/close.svg" alt="chatbot" width={16} height={30} />
                  </button>
                  <iframe
                    src="https://www.chatbase.co/chatbot-iframe/ams3mDILy9PFAiRbKrGKB"
                    title="ExploroAI"
                    className='relative z-0 w-full h-full mt-auto bg-white border-[1px] shadow-md border-primary-500 rounded-tl-3xl mr-4 '
                    style={{ fontSize: '0.7rem' }}
                  ></iframe>
                </div>
              )}
            </div>

            {!isChatbotOpen && (
              <button className='fixed right-14 bottom-16  rounded-full' onClick={toggleChatbot}>
                <Image src="/images/chatbot1.jpg" alt="chatbot" className='rounded-full ' width={75} height={30} />
              </button>)}
          </div>

        </div>
      </div>
    </>
  );
};

export default FeedLg;