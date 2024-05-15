import React from 'react';
import { useState } from 'react';
import FeedLg from '@/components/media queries/FeedLg';
import FeedSm from '@/components/media queries/FeedSm';

const DashboardPage = () => {


  return (
    <div>
      <div className='hidden lg:block'>
        <FeedLg />
      </div>
      <div className='lg:hidden'>
        <FeedSm />
      </div>
    </div>
  );
};

export default DashboardPage;
