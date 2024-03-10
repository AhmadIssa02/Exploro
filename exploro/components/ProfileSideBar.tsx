import React from 'react';
import Image from 'next/image';

type SideBarProps = {
    username: string;
    bio: string;
    profileImageUrl: string;
};

const ProfileSideBar: React.FC<SideBarProps> = ({ username, bio, profileImageUrl }) => {
    return (
        <>
            <Image src={profileImageUrl} alt='profilepic' width={150} height={150} className='mt-10 rounded-full shadow-sm shadow-white'></Image>
            <div className="flex flex-col items-center space-y-2  ">
              <span className='text-2xl poppins-bold'>{username}</span>
            </div>
            <div className="flex flex-col items-center space-y-2  ">
              <span className='text-lg poppins-normal'>{bio}</span>
            </div>
            <button className="flex items-center space-x-2 p-2 border-b-[1.5px]">
              <Image src="/images/feed.svg" alt="home" width={15} height={15} className='mt-1' />  
              <span>Your Profile</span>
            </button>
            <button className="flex items-center space-x-2 p-2 border-b-[1.5px]">
              <Image src="/images/feed.svg" alt="home" width={15} height={15} className='mt-1'  />  
              <span>Activity</span>
            </button>
            <button className="flex items-center space-x-2 p-2 border-b-[1.5px] ">
              <Image src="/images/feed.svg" alt="home" width={15} height={15} className='mt-1'  />  
              <span>Settings</span>
            </button>
            <span className='bg-primary-500 h-1'></span>
            <button className="text-lg font-semibold p-2 text-center text-black bg-red-500 rounded-md">
              Sign Out
            </button>
        </>
    )
}

export default ProfileSideBar;