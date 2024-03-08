import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post from '../components/post';
import Chats from '../components/Chats';
import { useState } from 'react';

const samplePost = {
  username: 'Traveler123',
  location: 'Mount Everest, Nepal',
  timeAgo: '3 days ago',
  content: 'Just reached the base camp, what a view!',
  profileImageUrl: '/images/profilePhoto.png', 
  mainImageUrl: '/images/postImage.png', 
  onLike: () => console.log('Liked!'),
  onComment: () => console.log('Commented!'),
  onShare: () => console.log('Shared!'),
};

const DashboardPage = () => {
  
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

  return (
    <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
      {/* Sidebar */}
      <div className="fixed mt-8 h-full bg-primary-500 w-1/5 py-5 px-3 space-y-6">
        <Link href="/feed" className="flex items-center justify-center mt-4 mb-8">
          <Image src="/images/logo.png" alt="logo" width={70} height={50} />
        </Link>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/feed.svg" alt="home" width={17} height={17} />  
              <span>Feed</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/saved.svg" alt="home" width={17} height={17} />  
              <span>Saved Locations</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/activity.svg" alt="home" width={17} height={17} />  
              <span>Activity</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/flight.svg" alt="home" width={17} height={17} />  
              <span>Flights</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/hotel.svg" alt="home" width={17} height={17} />  
              <span>Hotels</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
          <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
            <div className="flex items-center space-x-2">
              <Image src="/images/AI.svg" alt="home" width={17} height={17} />  
              <span>My AI</span>
            </div>
              <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
          </div>
      </div>

      {/* Main Content */}
      
      <div className="flex-1 flex flex-col bg-quarternary-500 ">
        {/* Header */}
        <header className="flex fixed w-full p-4  bg-primary-500  justify-center items-center justify-content-center">
          <div className="flex w-1/2 ">
            <input
              type="search"
              placeholder="Search"
              className="w-3/4 px-2 rounded-full text-black text-center poppins-semibold "
            />
            <Image src="/images/search.svg" alt="search" width={20} height={20} className='ml-4' />
          </div>
          <button className='absolute right-6' onClick={toggleSidebar}>
            <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className=' '></Image>
          </button>
          <div className={`fixed top-0 right-0 w-64 h-full bg-white p-5 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           {/* Sidebar Content */}
            <button onClick={toggleSidebar} className="text-lg font-semibold w-full text-left">
              Sign Out
            </button>
          </div>
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleSidebar}></div>
          )}
          {/* Profile and Settings
          <div className="flex items-center space-x-4">
            Profile
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gray-700 p-1">
                User image
              </div>
              <span>Ahmad Issa</span>
            </div>
            Settings
            <div>
              Settings Icon
            </div>
          </div> */}
        </header>

        {/* Post Input & Feed */}
        {/* HERE */}
        <div className="flex justify-center items-center space-y-6 w-full mt-14 mb-6">
          <div className='w-1/4 bg-primary-500'>
            
          </div>
          {/* Post Input */}
          <div className="flex flex-col justify-center space-y-6 w-full">
            <div className="bg-white w-7/12 shadow-xl text-black p-6 rounded-3xl ml-16 ">
              <div className="flex items-center space-x-2">
                <div className="rounded-full ">
                  <Image src="/images/profilePhoto.png" alt="profile" width={50} height={40} />
                </div>
                <input
                  type="text"
                  placeholder="What would you like to share?"
                  className="w-full text-lg poppins-semibold p-3 rounded-xl border bg-quarternary-500 placeholder-gray-700"
                />
              </div>
            </div>
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
          <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen space-y-5 z-10">
            <Chats />
          </div>
        </div>
      </div>


      {/* Right Sidebar - Followings */}
      {/* <div className="w-1/4 p-5"> */}
        {/* <div className="bg-white text-gray-800 p-4 rounded shadow">
          <h4 className="mb-4 font-bold">Your followings</h4>
          List of Followings
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              User Image
              <span>username</span>
            </div>
            Repeat for other users
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default DashboardPage;
