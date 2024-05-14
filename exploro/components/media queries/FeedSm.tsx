import React, { useMemo } from 'react';
import Image from "next/image";
import { useState, useEffect } from "react";
import Post from '@/components/post';
import Chats from '@/components/Chats';
import Sidebar from '@/components/SideBar';
import Header from '@/components/Header'
import PostInput from '@/components/PostInput';
import ProfileSideBar from '@/components/ProfileSideBar';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { feedPost } from '@/models/crud';
import { FeedPostApi } from '@/utils/api/feedPost/feedPost.api';
import { calculateTimeAgo } from '@/utils/timeUtils';
import { getTokenCookie } from '@/utils/cookieUtils';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

const FeedSm: React.FC = () => {
  useAuthGuard();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isSiderbarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSiderbarOpen);
  };

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  const [posts, setPosts] = useState<feedPost[]>([]);

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


  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }, [posts]); // Dependency array to ensure sort only runs when posts change


  return (
    <>
      <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
        {/* Sidebar */}
        {/* <Sidebar></Sidebar> */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-quarternary-500 ">
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
            {/* <div className='w-1/4 bg-primary-500'/> */}

            <div className="flex flex-col justify-center items-center align-middle space-y-6 w-full">
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

          </div>

        </div>

      </div>
    </>
  );
};

export default FeedSm;