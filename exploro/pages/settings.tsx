import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import Image from "next/image";


const SettingsPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle the form submission to update the email and password
        if (!email && (!newPassword || newPassword !== confirmPassword)) {
            alert('Please provide an email or a matching password and confirmation.');
            // You can also set an error state and display a message to the user here.
            return;
        }

        // If email is provided, we handle email change
        if (email) {
            alert('Email will be changed to:' + email);
            // API call to change email
        }

        // If passwords are provided and match, we handle password change
        if (newPassword && newPassword === confirmPassword) {
            alert('Password will be changed.');
            // API call to change password
        }

        // Reset form
        setEmail('');
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
                    <ProfileSideBar
                        username={samplePost.username}
                        bio={samplePost.bio}
                        profileImageUrl={samplePost.profileImageUrl}
                    />
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
                                    <div>
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Change Email
                                        </label>
                                        <input id="email" name="email" type="email"
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter your new email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
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
                        <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default SettingsPage;