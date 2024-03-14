import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const LandingPageSm: React.FC = () => {

    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
  
    useEffect(() => {
      const controlNavbar = () => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', handleScroll, { passive: true });
  
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }
      };
  
      controlNavbar();
    }, [lastScrollY]);
    
    return (
        <>
        <header className={`fixed bg-primary-500 w-full mx-auto py-4 border-b  border-gray-300 transition-all ease-in-out duration-500 ${visible ? 'top-0' : '-top-full'}`}>
            <div className="flex gap-4 text-xs items-center ml-4 ">
                <Image
                 src="/images/logo.png"
                 alt="logo"
                 width={50}
                 height={50}
                 style={{
                     maxWidth: "100%",
                     height: "auto"
                }} />
                <Link href="#home"> <button> Home </button></Link>
                <Link href="#about"> <button> About </button></Link>
                <Link href="#community"> <button> Community </button></Link>
                <button className="font-normal ml-auto mr-2 p-2 rounded-md  text-black bg-secondary-500 shadow-xl hover:bg-secondary-700 "> 
                    <Link href = "/auth/signup">Get Started </Link>
                </button>
            </div> 
        </header>
        <div id="home" className="text-white pt-24 text-3xl ml-4 flex ">
            <div className="poppins-bold text-2xl mt-6 ">
                Your Gateway to <br></br> <div className='text-secondary-500 mt-2'>Global Exploration</div>
            </div>
            <div className="ml-auto mt-4 mr-4 ">
                <Image
                src="/images/plane.svg"
                alt="plane"
                width={100}
                height={100}
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }} />
            </div>
        </div>
        <div className="font-regular-italic text-md ml-6 my-6"> Find Your Next Destination with Exploro </div>
        <div className="flex flex-wrap mt-8 gap-y-4 gap-x-2 justify-center items-center text-xs">
            <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-2/5 shadow-black/50 shadow-lg p-2  ">
                <h2 className=" poppins-bold my-2 flex justify-center">Create Your Profile </h2>
                <h2 className="poppins-thin mb-3 text-center">
                Join Exploro and craft a traveler profile that showcases your adventures.
                </h2>
            </div>
            <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-2/5 shadow-black/50 shadow-lg p-2  ">
                <h2 className=" poppins-bold my-2 flex justify-center">Share Experience</h2>
                <h2 className="poppins-thin mb-3 text-center">
                Share your travel interests and dream trips with a community that gets it.
                </h2>
            </div>
            <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-4/5 shadow-black/50 shadow-lg p-2  ">
                <h2 className=" poppins-bold my-2 flex justify-center">Plan Your Journey</h2>
                <h2 className="poppins-thin mb-3 text-center">
                Use our travel planner to book your next escape. Find best deals on airlines, flights, and accommodation.
                </h2>
            </div>
        </div>
        <div id="about" className="flex flex-col gap-x-4 gap-y-8 mt-16">
            <div className="flex justify-center items-center gap-x-2 ">
                    <div className="w-1/4 flex justify-center">
                        <Image
                            src="/images/community4.png"
                            alt="community"
                            width={210}
                            height={210}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }} />
                    </div>
                    <div className="flex flex-col w-1/2 items-center text-center">
                        <div className="poppins-extrabold text-md">Join the Community of Global Explorers</div>
                        <div className="poppins-extralight text-[10px] mt-2">Join our vibrant community of global explorers at Exploro, where every traveler`s story is an open book brimming with shared wisdom and infectious wanderlust.</div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-2 ">
                    <div className="flex flex-col w-1/2 items-center text-center">
                        <div className="poppins-extrabold text-md">Post, share, and relive your adventure</div>
                        <div className="poppins-extralight text-[10px] mt-2">Capture the moment, narrate your journey, and relive the memories with Exploro. Our platform is the perfect canvas for your travel stories.</div>
                    </div>
                    <div className="w-1/4 flex justify-center">
                        <Image
                            src="/images/share.png"
                            alt="share"
                            width={210}
                            height={210}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }} />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-x-2 mb-8">
                    <div className="w-1/4 flex justify-center">
                        <Image
                            src="/images/calendar.png"
                            alt="calendar"
                            width={210}
                            height={210}
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }} />
                    </div>
                    <div className="flex flex-col w-1/2 items-center text-center ">
                        <div className="poppins-extrabold text-md">Plan your trip with our travel planner</div>
                        <div className="poppins-extralight text-[10px] mt-2">Synchronize all your travel plans in one place, ensuring a seamless and effortless journey. Whether it is a last-minute trip or your dream vacation, we are here to make it all come true.</div>
                    </div>
                </div>
            </div>
            <div id = "community" className="flex flex-row ">
            <Image
                src="/images/laptop.svg"
                alt="community"
                width={180}
                height={800}
                className="mr-auto ml-4 mt-8"
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }} />
            <div className="font-medium text-sm mt-8 mx-4">Join our community now and unlock a world of travel opportunities. </div>
        </div>
        <div className="flex justify-center items-center">
            <button className="font-normal poppins ml-auto mr-4 mt-6 mb-2 p-2 rounded-md text-[10px] text-black bg-secondary-500 shadow-2xl hover:bg-secondary-700  ">
                <Link href = "/auth/signup">   Create an Account </Link>
            </button>
        </div>
        <div className=" p-3 border-t border-t-gray-300 flex items-center">
            <Image
                src="/images/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="ml-6"
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }} />
            <div className="poppins-thin text-xs ml-4 text-white/80">exploro.supoort@gmail.com</div>
        </div>
    </>
    );
};
    
export default LandingPageSm;