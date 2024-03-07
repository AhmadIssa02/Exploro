import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Post from '/components/post';

const samplePost = {
  username: 'Traveler123',
  location: 'Mount Everest, Nepal',
  timeAgo: '3 days ago',
  content: 'Just reached the base camp, what a view!',
  profileImageUrl: '/images/profilePhoto.png', // Replace with actual path to an image
  mainImageUrl: '/images/postImage.png', // Replace with actual path to an image
  onLike: () => console.log('Liked!'),
  onComment: () => console.log('Commented!'),
  onShare: () => console.log('Shared!'),
};

const DashboardPage = () => {
  return (
    <div className="flex h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
      {/* Sidebar */}
      <div className=" bg-primary-500 w-1/5 py-5 px-3 space-y-6">
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
      
      <div className="flex-1 flex flex-col bg-quarternary-500">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b  bg-primary-500 border-gray-700">
          <div className="flex w-2/3 justify-center items-center justify-content-center">
            <input
              type="search"
              placeholder="Search"
              className="w-3/4 px-2 rounded-full text-black text-center poppins-semibold "
            />
            <Image src="/images/search.svg" alt="search" width={20} height={20} className='ml-4' />
          </div>
          <button>
            <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='ml-auto'></Image>
          </button>
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
        <div className="flex flex-col  p-5 space-y-6">
          {/* Post Input */}
          <div className="bg-white w-7/12 shadow-xl text-black p-6 rounded-3xl ml-16 ">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gray-400 p-3">
                {/* User Placeholder */}
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
