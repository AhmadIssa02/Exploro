import React from 'react';
import Image from "next/image";
import Link from 'next/link';
const Header: React.FC = () => {
    return <>
      <div className="flex w-4/5 lg:w-1/2 ml-10 lg:ml-0 ">
          <input
            type="search"
            placeholder="Search"
            className="w-3/4 px-2 rounded-full text-black text-center poppins-semibold "

          />
          <Image
            src="/images/search.svg"
            alt="search"
            width={20}
            height={20}
            className='ml-4 hidden md:block'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
            <Link href="/Inbox">
              <button className=" lg:hidden">
                <Image
                src="/images/chats.svg"
                alt="search"
                width={25}
                height={20}
                className='ml-4 lg:hidden'
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              </button>
            </Link>
      </div>
    </>;
  };
  
  export default Header;