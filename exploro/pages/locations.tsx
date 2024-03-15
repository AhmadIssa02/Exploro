import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import LocationCard from "@/components/LocationCard";
import Image from "next/image";
import { useState } from "react";

const LocationsPage = ()=>{

    const samplePost = {
        username: 'Traveler123',
        bio: 'Traveling the world!',
        location: 'Mount Everest, Nepal',
        timeAgo: '3 days ago',
        content: 'Just reached the base camp, what a view!',
        profileImageUrl: '/images/man.png', 
        mainImageUrl: '/images/postImage.png', 
        onLike: () => console.log('Liked!'),
        onComment: () => console.log('Commented!'),
        onShare: () => console.log('Shared!'),
      };
      
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};
    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
                
                <Sidebar/>
                
                <header className="fixed z-50 p-4 w-full bg-primary-500 flex justify-center">
                    <Header></Header>
                    <button className='absolute right-6' onClick={toggleSidebar}>
                        <Image
                        src="/images/burgermenu.svg"
                        alt="menu"
                        width={25}
                        height={25}
                        className=' '
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}></Image>
                    </button>
                </header>
                <div className={`fixed top-0 right-0 w-1/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ProfileSideBar 
                    username = {samplePost.username}
                    bio = {samplePost.bio}
                    profileImageUrl ={samplePost.profileImageUrl}
                />
                </div>
                {isSidebarOpen && (
                    <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>
                    
                )}

                <div className="flex-1 flex flex-col bg-quarternary-500">
                    <div className="flex justify-start items-start  pace-y-6 w-full mb-6 h-full mt-16">
                        <div className="w-1/5 bg-primary-500"/>
                        <div className="grid grid-cols-2 justify-center gap-4 w-1/2 ml-6 mt-2 text-lg poppins-semibold">
                            <LocationCard />
                        </div>

                        <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-4">
                            <Chats />
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
};
export default LocationsPage;