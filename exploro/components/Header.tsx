import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
      <>
        <div className="flex w-1/2 ">
            <input
              type="search"
              placeholder="Search"
              className="w-3/4 px-2 rounded-full text-black text-center poppins-semibold "
            />
            <Image src="/images/search.svg" alt="search" width={20} height={20} className='ml-4' />
        </div>
      </>
    );
  };
  
  export default Header;