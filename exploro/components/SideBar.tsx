import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar: React.FC = ({  }) => {
    return <>
      <div className="fixed min-h-dvh h-svh bg-primary-500 w-1/5 pt-16 px-3 space-y-6">
      <Link href="/feed" className="flex items-center justify-center mt-4 mb-8">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={70}
          height={50}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </Link>
        <div className="pt-2 flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
          <Link href="/feed">
            <button className="flex items-center space-x-2">
              <Image
                src="/images/feed.svg"
                alt="home"
                width={17}
                height={17}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />  
              <span>Feed</span>
            </button>
          </Link>
            <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
        </div>
        <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
          <Link href="/locations">
            <button className="flex items-center space-x-2">
              <Image
                src="/images/saved.svg"
                alt="home"
                width={17}
                height={17}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />  
              <span>Saved Locations</span>
            </button>
          </Link>
          <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
        </div>

        <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
          <button className="flex items-center space-x-2">
            <Image
              src="/images/flight.svg"
              alt="home"
              width={17}
              height={17}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />  
            <span>Flights</span>
          </button>
            <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
        </div>
        <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
          <button className="flex items-center space-x-2">
            <Image
              src="/images/hotel.svg"
              alt="home"
              width={17}
              height={17}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />  
            <span>Hotels</span>
          </button>
            <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
        </div>
        <div className="flex flex-col font-semibold text-lg items-center space-x-2 space-y-2 hover:text-gray-200 justify-center align-middle">
          <button className="flex items-center space-x-2">
            <Image
              src="/images/AI.svg"
              alt="home"
              width={17}
              height={17}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />  
            <span>My AI</span>
          </button>
            <span className='bg-white p-[1px] w-5/6 shadow-2xl rounded-3xl'></span>
        </div>
    </div>
    </>;
  };
  
  export default Sidebar;