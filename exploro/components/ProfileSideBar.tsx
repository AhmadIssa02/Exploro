import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { getTokenCookie, removeTokenCookie } from '@/utils/cookieUtils';
import axios from 'axios';
import jwt from 'jsonwebtoken';

type User = {
  username: string;
  bio: string;
  profileImageUrl: string;
};

const ProfileSideBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleSignOut = () => {
    removeTokenCookie();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getTokenCookie();
        if (token) {
          const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
          const userId = decoded.id;
          setUserId(userId);
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          const userData: User = {
            username: response.data.name,
            bio: response.data.bio,
            profileImageUrl: response.data.profilePicture
          };
          setUser(userData);
        } else {
          console.error('Token not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center overflow-y-auto h-full text-xs md:text-xl'>
      <Image
        src={user.profileImageUrl}
        alt='profilepic'
        width={100}
        height={120}
        className='mt-6 rounded-full shadow-sm shadow-white'
        style={{ maxWidth: "100%", height: "auto" }} />
      <div className="flex flex-col items-center space-y-2">
        <span className='text-xl poppins-bold mt-4'>{user.username}</span>
        <div className="px-4 py-1  text-center rounded-lg ">
          <span className='py-2  text-left text-xs rounded-lg'>
            {user.bio?.length > 110 ? `${user.bio.substring(0, 110)}...` : user.bio} {/* Truncate long bios */}
          </span>
          {user.bio?.length > 110 && (
            <Link href={`/${userId}`}>
              <button className="mt-2 text-blue-600 text-xs">Read more</button>
            </Link>
          )}
        </div>
      </div>

      <Link href={`/${userId}`}>
        <button className="flex items-center space-x-2 p-2 border-b-[1.5px] hover:scale-105 my-[6px] lg:text-sm">
          <Image
            src="/images/feed.svg"
            alt="home"
            width={19}
            height={15}
            className='mt-1 w-1/6 '
            style={{ maxWidth: "100%", height: "auto" }} />
          <span>Your Profile</span>
        </button>
      </Link >
      <Link href="/friendRequests">
        <button className="flex items-center space-x-2 p-2 border-b-[1.5px] hover:scale-105 my-[6px] lg:text-sm">
          <Image
            src="/images/friend.svg"
            alt="home"
            width={22}
            height={15}
            className='mt-1 w-1/6'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <span>Friend Requests</span>
        </button>
      </Link>
      <Link href="/settings">
        <button className="flex items-center space-x-2 p-2 mb-6 border-b-[1.5px] hover:scale-105 my-[6px] lg:text-sm">
          <Image
            src="/images/settings4.png"
            alt="home"
            width={30}
            height={35}
            className='mt-1 w-[30%]'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <span>Settings</span>
        </button>
      </Link>
      <div className='pt-'>
        <button className="mb-4 text-[15px] font-semibold p-2 text-center text-black bg-red-500 hover:bg-red-600 rounded-md shadow-sm shadow-red-600 " onClick={handleSignOut}>
          <Link href="/auth/login"> Sign Out </Link>
        </button>
      </div>
    </div>
  );
}

export default ProfileSideBar;
