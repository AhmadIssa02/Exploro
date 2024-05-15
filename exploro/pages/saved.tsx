import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import SavedPostCard from "@/components/SavedPostCard";
import Image from "next/image";
import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import jwt from 'jsonwebtoken';
import axios, { all } from 'axios';
import { useEffect } from "react";
import { getTokenCookie } from "@/utils/cookieUtils";

// Define the type for a single post
type Post = {
    postId: string;
    userId: string;
    username: string;
    location: string;
    timeAgo: string;
    content: string;
    profileImageUrl: string;
    mainImageUrl: string;
    likes: string[];
    likeCount: number;
};


const SavedPage = () => {
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

    const [savedPosts, setSavedPosts] = useState<Post[]>([]); // Explicitly define the type as Post[]

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const token = getTokenCookie();
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const decoded = jwt.decode(token) as { id: string };
                const currentUserId = decoded.id;
                const response = await axios.get(`http://localhost:3000/saved-posts/${currentUserId}`);
                const savedPostIds = response.data.map((post: { postId: any; }) => post.postId);
                console.log('Saved post IDs:', savedPostIds);

                // Fetch all posts
                const allPostsResponse = await axios.get('http://localhost:3000/feedpost');
                console.log('All posts:', allPostsResponse.data);
                const allPosts = allPostsResponse.data;

                // Filter all posts based on saved post IDs
                // const userPosts = [];
                // for (let i = 0; i < savedPostIds.length; i++) {
                //     userPosts.push(allPosts.filter((post: { _id: string; }) => post._id === savedPostIds[i]));
                // }
                const userPosts = allPosts.filter((post: { _id: string; }) => savedPostIds.includes(post._id));

                // const filteredPosts = allPosts.filter((post: { postId: any; }) => savedPostIds.includes(post.postId));
                console.log('User posts:', userPosts);

                setSavedPosts(userPosts);
            } catch (error) {
                console.error('Error fetching saved posts:', error);
            }
        };

        fetchSavedPosts();
    }, []);


    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                <header className="fixed z-50 p-4 w-full bg-primary-500 flex justify-center">
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


                <div className="flex-1 flex flex-col bg-quarternary-500">
                    <div className="flex justify-center lg:justify-start items-middle w-full mb-6 h-full mt-16">
                        <div className="w-1/5 bg-primary-500 hidden lg:block" />
                        <div className=" grid grid-cols-1 justify-center items-center gap-4 w-full h-2/3 lg:w-1/2 ml-4 md:ml-16 mt-4 text-base poppins-semibold">
                            {savedPosts.map((post, index) => (
                                <SavedPostCard
                                    key={index}
                                    location={post.location}
                                    image={post.mainImageUrl}
                                    username={post.username}
                                    profileImageUrl={post.profileImageUrl}
                                    content={post.content}
                                    postId={post.postId}
                                />
                            ))}
                        </div>
                        {/* <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div> */}
                        <div className="hidden lg:flex">
                            {isChatbotOpen && (
                                <div className='flex flex-col fixed right-1 bottom-2 h-[87%] w-[29%] '>
                                    <button className='h-fit w-fit ml-auto   rounded-full z-10' onClick={toggleChatbot}>
                                        <Image src="/images/close.svg" alt="chatbot" width={16} height={30} />
                                    </button>
                                    <iframe
                                        src="https://www.chatbase.co/chatbot-iframe/ams3mDILy9PFAiRbKrGKB"
                                        title="ExploroAI"
                                        className='relative z-0 w-full h-full mt-auto bg-white border-[1px] shadow-md border-primary-500 rounded-tl-3xl mr-4 '
                                        style={{ fontSize: '0.7rem' }}
                                    ></iframe>
                                </div>
                            )}
                        </div>

                        {!isChatbotOpen && (
                            <button className='hidden lg:block fixed right-14 bottom-16  rounded-full' onClick={toggleChatbot}>
                                <Image src="/images/chatbot1.jpg" alt="chatbot" className='rounded-full ' width={75} height={30} />
                            </button>)}
                    </div>
                </div>

            </div>
        </div>
    );
};
export default SavedPage;
