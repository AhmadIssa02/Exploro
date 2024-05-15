import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import Image from "next/image";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import axios from "axios";
import { getTokenCookie } from "@/utils/cookieUtils";
import jwt from 'jsonwebtoken';


const SettingsPage = () => {
    useAuthGuard();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if ((!newPassword || newPassword !== confirmPassword)) {
            const errorAlert = document.createElement('div');
            errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
            errorAlert.textContent = 'Please provide a matching password and confirmation...';
            document.body.appendChild(errorAlert);
            setTimeout(() => {
                errorAlert.remove();
            }, 3000);
            return;
        }

        // If email is provided, we handle email change
        // if (email) {
        //     alert('Email will be changed to:' + email);
        //     // API call to change email
        // }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/;

        // Check if password meets complexity requirements
        if (!passwordRegex.test(newPassword)) {
            const errorAlert = document.createElement('div');
            errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
            errorAlert.textContent = 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.';
            document.body.appendChild(errorAlert);
            setTimeout(() => {
                errorAlert.remove();
            }, 4000);
            // alert('Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.');
            return;
        }

        const token = getTokenCookie();
        if (!token) {
            console.error('Token not found.');
            return;
        }
        const decoded = jwt.decode(token) as { id: string; };
        const userId = decoded.id;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const user = await axios.get(`http://localhost:3000/users/${userId}`);
            const { email } = user.data;

            // Send API request to reset password
            const response = await axios.post('http://localhost:3000/auth/reset-password', {
                email: email,
                password: newPassword
            }, config);

            // Handle response from the API
            if (response.status === 201) {
                const successAlert = document.createElement('div');
                successAlert.classList.add('bg-green-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                successAlert.textContent = 'Password reset was changed successfully! ';
                document.body.appendChild(successAlert);

                setTimeout(() => {
                    successAlert.remove();
                }, 3000);
                // alert('Password reset successful.');
                // Optionally, you can redirect the user to another page
            } else {
                const errorAlert = document.createElement('div');
                errorAlert.classList.add('bg-red-500', 'w-1/2', 'text-white', 'px-4', 'py-2', 'rounded-md', 'font-semibold', 'absolute', 'top-20', 'left-1/2', 'transform', '-translate-x-1/2', 'z-50');
                errorAlert.textContent = 'Something wrong happened.';
                document.body.appendChild(errorAlert);
                setTimeout(() => {
                    errorAlert.remove();
                }, 3000);
            }
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Password reset failed. Please try again later.');
        }

        // Reset form
        // setEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
                    <button className='absolute left-4' onClick={toggleSidebar}>
                        <Image
                            src="/images/burgermenu.svg"
                            alt="menu"
                            width={25}
                            height={25}
                            className='block lg:hidden'
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}></Image>
                    </button>
                    <Header></Header>
                    <button className='' onClick={toggleProfileSidebar}>
                        <Image
                            src="/images/burgermenu.svg"
                            alt="menu"
                            width={25}
                            height={25}
                            className='hidden lg:block absolute top-5 right-6'
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}></Image>
                        <Image
                            src="/images/settings.png"
                            alt="menu"
                            width={45}
                            height={25}
                            className='lg:hidden absolute top-2 right-6'
                            style={{
                                maxWidth: "100%",
                                height: "auto"
                            }}></Image>
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
                        <div className="w-full lg:w-1/2  flex items-center justify-center p-4 lg:ml-6 rounded-md  ">
                            <div className="w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
                                <div className="text-center text-2xl font-semibold text-black">Settings</div>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {/* <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Change Email
                                        </label>
                                        <input id="email" name="email" type="email"
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter your new email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div> */}
                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Change Password
                                        </label>
                                        <div className="flex items-center relative">
                                            <input id="password" name="password" type={showPassword ? "password" : "text"}
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                                            >
                                                {showPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="flex items-center relative">
                                            <input id="password" name="password" type={showConfirmPassword ? "password" : "text"}
                                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                                placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="h-1/2 opacity-50 text-white poppins-semibold text-[10px] hover:underline absolute right-2 z-10 "
                                            >
                                                {showConfirmPassword ? (<Image src="/images/hide.png" alt="eye icon" width={20} height={20} />) : (<Image src="/images/show.png" alt="eye icon" width={20} height={20} />)}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Update Settings
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div> */}
                        <div className="hidden lg:flex">
                            {isChatbotOpen && (
                                <div className='flex flex-col fixed right-1 bottom-2 h-[87%] w-[27%] '>
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
export default SettingsPage;