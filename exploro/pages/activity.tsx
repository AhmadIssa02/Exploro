import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import Image from "next/image";


const ActivityPage = ()=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    
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
  
       
    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
                <div className="hidden lg:block">
                    <Sidebar/>
                </div>
                <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
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
                <div className={`fixed top-0 right-0 overflow-hidden w-3/4 lg:w-1/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                        <div className="w-1/5 bg-primary-500 hidden lg:block"/>
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:ml-6 rounded-md text-black text-lg gap-y-4">
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/like2.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You liked <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/share4.png" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You shared <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/comment.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You commented <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/like2.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You liked <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/share4.png" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You shared <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/comment.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You commented <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/like2.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You liked <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/share4.png" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You shared <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                            <div className="flex w-full gap-x-6 bg-white p-4 rounded-xl shadow-md">
                                <Image src = "/images/comment.svg" alt="Activity" width={30} height={30} className="ml-2" />
                                <div className="poppins-semibold">You commented <span className="font-bold italic">Ahmad Issa`s</span> post </div>
                                <Image src = "/images/postImage.png" alt="Activity" width={40} height={30} className="ml-auto" />
                            </div>
                        </div>
                        <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
};
export default ActivityPage;