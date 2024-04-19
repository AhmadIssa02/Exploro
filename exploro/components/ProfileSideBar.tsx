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
    <>
      <Image
        src={user.profileImageUrl}
        alt='profilepic'
        width={150}
        height={150}
        className='mt-10 rounded-full shadow-sm shadow-white'
        style={{ maxWidth: "100%", height: "auto" }} />
      <div className="flex flex-col items-center space-y-2">
        <span className='text-2xl poppins-bold'>{user.username}</span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <span className='text-lg poppins-normal'>{user.bio}</span>
      </div>
      <Link href={`/{userId}`}>
        <button className="flex items-center space-x-2 p-2 border-b-[1.5px] hover:scale-105">
          <Image
            src="/images/feed.svg"
            alt="home"
            width={19}
            height={15}
            className='mt-1'
            style={{ maxWidth: "100%", height: "auto" }} />
          <span>Your Profile</span>
        </button>
      </Link >
      <Link href="/activity">
        <button className="flex items-center space-x-2 p-2 border-b-[1.5px] hover:scale-105">
          <Image
            src="/images/activity2.svg"
            alt="home"
            width={22}
            height={15}
            className='mt-1 '
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <span>Activity</span>
        </button>
      </Link>
      <Link href="/settings">
        <button className="flex items-center space-x-2 p-2 border-b-[1.5px] hover:scale-105 ">
          <Image
            src="/images/settings4.png"
            alt="home"
            width={30}
            height={35}
            className='mt-1'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <span>Settings</span>
        </button>
      </Link>
      <div className='pt-'>
        <button className="text-lg font-semibold p-2 text-center text-black bg-red-500 hover:bg-red-600 rounded-md shadow-sm shadow-red-600 " onClick={handleSignOut}>
          <Link href="/auth/login"> Sign Out </Link>
        </button>
      </div>
    </>
  );
}

export default ProfileSideBar;
