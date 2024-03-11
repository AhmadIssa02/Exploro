import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {
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
    <div className="bg-primary-500 text-white poppins-semibold min-h-max h-max w-full md:min-w-min md:w-full  ">
      <header className={`fixed bg-primary-500 w-full mx-auto py-4 border-b border-gray-300 transition-all ease-in-out duration-500 ${visible ? 'top-0' : '-top-full'}`}>
        <div className="flex gap-8 text-xl items-center ml-24  ">
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

          <button className="font-semibold ml-auto mr-16 p-2 rounded-xl text-xl text-black bg-secondary-500 shadow-xl hover:bg-secondary-700 "> 
            <Link href = "/auth/signup">Get Started </Link>
          </button>
        </div>
      </header>
      <div id="home" className="">
        <div className="flex ">
          <div  className="poppins-bold text-6xl ml-28 mt-24 mb-12">Your Gateway to <br></br> <div className='text-secondary-500 mt-6'>Global Exploration</div></div>
          <div className="ml-auto mr-24 mt-20 ">
            <Image
              src="/images/plane.svg"
              alt="plane"
              width={220}
              height={220}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
        </div>
        <div className="ml-40 poppins-medium-italic text-2xl mb-12"> Find Your Next Destination with Exploro </div>
        <div className="flex mt-8 space-x-6 justify-center">
        <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-1/4 shadow-black/50 shadow-lg p-2 ">
            <h2 className="text-md poppins-extrabold mt-4 mb-2 flex justify-center">Create Your Profile</h2>
            <h2 className="poppins-thin text-md mb-2 text-center">
            Join Exploro and craft a traveler profile that showcases your adventures.
            </h2>
          </div>
         
          <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-1/4  shadow-black/50 shadow-lg p-2 ">
            <h2 className="text-md poppins-extrabold mt-4 mb-2 flex justify-center">Plan Your Journey</h2>
            <h2 className="poppins-thin text-md mb-2 text-center">
              Use our travel planner to book your next escape. Find best deals on airlines, flights, and accommodation.
            </h2>
          </div>
          <div className="bg-gradient-to-b from-white/25 to-white/10 rounded-lg w-1/4 shadow-black/50 shadow-lg p-2 ">
            <h2 className="text-md poppins-extrabold mt-4 mb-2 flex justify-center">Share Your Experience</h2>
            <h2 className="poppins-thin text-md mb-2 text-center">
            Share your travel interests, favorite destinations, and dream trips with a community that gets it.
            </h2>
          </div>
        </div>


        <div id="about" className="flex flex-col gap-x-4 gap-y-4 mt-20">
          <div className="flex justify-center items-center gap-x-5 ">
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
            <div className="flex flex-col w-1/3 items-center text-center">
              <div className="poppins-extrabold text-xl">Join the Community of Global Explorers</div>
              <div className="poppins-extralight text-base mt-4">Join our vibrant community of global explorers at Exploro, where every traveler`s story is an open book brimming with shared wisdom and infectious wanderlust.</div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-x-5 ">
            <div className="flex flex-col w-1/3 items-center text-center">
              <div className="poppins-extrabold text-xl">Post, share, and relive your adventure</div>
              <div className="poppins-extralight text-base mt-4">Capture the moment, narrate your journey, and relive the memories with Exploro. Our platform is the perfect canvas for your travel stories.</div>
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

          <div className="flex justify-center items-center gap-x-5 ">
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
            <div className="flex flex-col w-1/3 items-center text-center">
              <div className="poppins-extrabold text-xl">Plan your trip with our travel planner</div>
              <div className="poppins-extralight text-base mt-4">Synchronize all your travel plans in one place, ensuring a seamless and effortless journey. Whether it is a last-minute trip or your dream vacation, we are here to make it all come true.</div>
            </div>
          </div>
        </div>
      </div>

      <div id = "community" className="flex flex-row ">
        <Image
          src="/images/phone.svg"
          alt="community"
          width={250}
          height={800}
          className="mr-auto ml-56 mt-16"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="poppins-bold text-4xl w-1/2 p-12 mt-28 ml-auto mr-16">Join our community and unlock a world of travel opportunities. </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="font-medium poppins ml-auto mr-36 mb-12 p-3 rounded-xl text-2xl text-black bg-secondary-500 shadow-2xl hover:bg-secondary-700  ">
          <Link href = "/auth/signup">   Create an Account </Link>
        </button>
      </div>
      <div className=" p-4 border-t border-t-gray-300 flex items-center">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="ml-12"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="poppins-thin text-sm ml-8 text-white/80">exploro.supoort@gmail.com</div>
      </div>
    </div>
  );
}

