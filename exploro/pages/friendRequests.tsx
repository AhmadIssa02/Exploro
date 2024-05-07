import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Chats from "@/components/Chats";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import jwt from 'jsonwebtoken';
import { getTokenCookie } from "@/utils/cookieUtils";
import axios from "axios";

interface UserFriendRequest {
    _id: string;
    name: string;
    profilePicture: string;
}

interface FriendRequest {
    _id: string;
    sender: string;
    receiver: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const FriendRequestsPage = () => {
    useAuthGuard();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [userFriendRequests, setUserFriendRequests] = useState<UserFriendRequest[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const token = getTokenCookie();
                if (token) {
                    const decoded = jwt.decode(token) as { id: string; };
                    const currentUserId = decoded.id;
                    const response = await axios.get(`http://localhost:3000/friend-request`);
                    if (response && response.status === 200) {
                        const friendRequests = await response.data;
                        setFriendRequests(friendRequests.filter((request: FriendRequest) => request.receiver === currentUserId));
                    } else {
                        console.error("Failed to fetch friend requests");
                    }
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        const fetchRequestInfromation = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users`);
                if (response && response.status === 200) {
                    const users = await response.data;
                    const userRequests = friendRequests.map((request: FriendRequest) => {
                        const senderUser = users.find((user: any) => user._id === request.sender);
                        return {
                            _id: request._id,
                            name: senderUser.name,
                            profilePicture: senderUser.profilePicture
                        };
                    });
                    setUserFriendRequests(userRequests);
                } else {
                    console.error("Failed to fetch user information");
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchFriendRequests();
        fetchRequestInfromation();

    }, [friendRequests]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };

    const handleAccept = async (requestId: string) => {
        try {
            await axios.put(`http://localhost:3000/friend-request/accept`, { requestId });
            setFriendRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));

        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            await axios.put(`http://localhost:3000/friend-request/reject`, { requestId });
            setFriendRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };


    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
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

                <div className="flex-1 flex flex-col bg-quarternary-500">
                    <div className="flex justify-start items-start  pace-y-6 w-full mb-6 h-full mt-16">
                        <div className="w-1/5 bg-primary-500 hidden lg:block" />
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:ml-6 rounded-md text-black text-lg gap-y-4">
                            {friendRequests.length > 0 ? (userFriendRequests.map((request) => (
                                <div key={request._id} className="flex w-full items-center gap-x-4 bg-white p-3 md:p-4 rounded-xl shadow-md">
                                    <Image src={request.profilePicture} alt="profilepicture" width={90} height={30} className=" w-1/6 md:w-[10%]" />
                                    <div className="poppins-semibold">
                                        <span className="font-bold italic">{request.name}</span> sent you a friend request
                                    </div>
                                    <div className="flex ml-auto gap-3 w-1/3 md:w-1/6 mr-2">
                                        <button className="w-full" onClick={() => handleAccept(request._id)}>
                                            <Image src="/images/accept.svg" alt="accept" width={30} height={30} className="ml-auto " />
                                        </button>
                                        <button className="w-full" onClick={() => handleReject(request._id)}>
                                            <Image src="/images/reject.svg" alt="reject" width={30} height={30} className="ml-auto " />
                                        </button>
                                    </div>
                                </div>
                            ))) : (
                                <div className=" w-full h-16 items-center gap-x-4 bg-white p-3 md:p-4 rounded-xl shadow-md text-center flex justify-center">
                                    <div className="poppins-bold text-base md:text-xl">
                                        You have no new friend requests
                                    </div>
                                </div>
                            )}
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

export default FriendRequestsPage;
