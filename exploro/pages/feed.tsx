import React from 'react';
import Image from "next/image";
import Post from '../components/post';
import Chats from '../components/Chats';
import { useState } from 'react';
import Sidebar from '@/components/SideBar';
import Header from '@/components/Header'
import PostInput from '@/components/PostInput';
import ProfileSideBar from '@/components/ProfileSideBar';
import FeedLg from '@/components/media queries/FeedLg';
import FeedSm from '@/components/media queries/FeedSm';

const DashboardPage = () => {
  
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

  return (
    <div>
      <div className='hidden lg:block'>
        <FeedLg />
      </div>
      <div className='lg:hidden'>
        <FeedSm/>
      </div>
    </div>
  );
};

export default DashboardPage;
