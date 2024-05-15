import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthGuard } from "@/hooks/useAuthGuard";


const ExploroAiPage = () => {
    useAuthGuard();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };


    return (
        <div>
            <div className="flex w-full h-dvh min-h-screen bg-quarternary-500 text-white font-poppins">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
                    <button className='lg:hidden' onClick={toggleSidebar}>
                        <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='absolute top-5 left-6 ' style={{ maxWidth: "100%", height: "auto" }}></Image>
                    </button>
                    <Header></Header>
                    <button className='' onClick={toggleProfileSidebar}>
                        <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='hidden lg:block absolute top-5 right-6' style={{ maxWidth: "100%", height: "auto" }}></Image>
                        <Image src="/images/settings.png" alt="menu" width={45} height={25} className='lg:hidden absolute top-[6px] right-4' style={{ maxWidth: "100%", height: "auto" }}></Image>
                    </button>
                </header>
                <div className={`fixed overflow-hidden top-0 left-0 lg:w-1/4 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar />
                </div>
                {isSidebarOpen && (
                    <div className="fixed w-full inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>
                )}
                <div className={`fixed overflow-hidden top-0 right-0 lg:w-1/4 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ProfileSideBar />
                </div>
                {isProfileSidebarOpen && (
                    <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleProfileSidebar}></div>

                )}

                <div className="w-1/4 bg-primary-500 hidden lg:block" />

                <div className='flex flex-col mt-14 h-[87%] lg:h-[90%] w-full '>
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/ams3mDILy9PFAiRbKrGKB"
                        title="ExploroAI"
                        className=' w-full h-full mt-auto bg-white border-[1px] shadow-md border-primary-500 '
                        style={{ fontSize: '0.7rem' }}
                    ></iframe>
                </div>

            </div>
        </div >
    );
};
export default ExploroAiPage;