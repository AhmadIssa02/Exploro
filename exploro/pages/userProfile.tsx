import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import Image from "next/image";
import Post from "@/components/post";


const SettingsPage = ()=>{
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  

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
                    <Sidebar/>
                </div>


                
                <div className="flex-1 flex flex-col bg-quarternary-500">

                <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
                    <button className='absolute left-4' onClick={toggleSidebar}>
                    <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='block lg:hidden' style={{maxWidth: "100%", height: "auto"}}></Image>
                    </button>
                    <Header></Header>
                    <button className='' onClick={toggleProfileSidebar}>
                        <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='hidden lg:block absolute top-5 right-6' style={{ maxWidth: "100%",height: "auto"}}></Image>
                        <Image src="/images/settings.png" alt="menu" width={45} height={25} className='lg:hidden absolute top-[6px] right-4' style={{     maxWidth: "100%",     height: "auto" }}></Image>
                    </button>
                </header>

                <div className={`fixed overflow-hidden top-0 left-0 lg:w-1/4 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar/>
                </div>
                {isSidebarOpen && (
                    <div className="fixed w-full inset-0 bg-black opacity-40 z-40" onClick={toggleSidebar}></div>
                )}
                <div className={`fixed overflow-hidden top-0 right-0 lg:w-1/4 w-3/4 text-lg poppins-semibold h-full space-y-4 bg-primary-700 flex flex-col justify-start items-center z-50  text-white transition-transform transform ${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ProfileSideBar username = {samplePost.username}bio = {samplePost.bio}profileImageUrl ={samplePost.profileImageUrl}/>
                </div>
                {isProfileSidebarOpen && (
                    <div className="fixed w-4/5 inset-0 bg-black opacity-40 z-40" onClick={toggleProfileSidebar}></div>
                    
                )}

                <div className="flex justify-center items-center w-full mb-6 h-full mt-16 ">
                  {/* <div className="w-1/5 bg-primary-500 hidden lg:block"/> */}
                  <div className="w-full lg:w-5/6 flex flex-col items-center justify-center space-y-4 mt-2 lg:p-4 lg:ml-6 rounded-md lg:mr-32">
                    
                    
                    <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-4 rounded-3xl lg:ml-16 ">
                        <div className="flex items-center space-x-2">
                          <div className="rounded-full min-w-max self-start ">
                              <Image src="/images/profilePhoto.png" alt="profile" width={50} height={40} style={{maxWidth: "100%", height: "auto" }}  />
                          </div>
                          <div className='font-semibold text-xl pl-1 '>{samplePost.bio}</div>
                      </div>
                    </div>  


                    <Post
                      username={samplePost.username}
                      location={samplePost.location}
                      timeAgo={samplePost.timeAgo}
                      content={samplePost.content}
                      profileImageUrl={samplePost.profileImageUrl}
                      mainImageUrl={samplePost.mainImageUrl}
                      onLike={samplePost.onLike}
                      onComment={samplePost.onComment}
                      onShare={samplePost.onShare}
                    />
                    <Post
                      username={samplePost.username}
                      location={samplePost.location}
                      timeAgo={samplePost.timeAgo}
                      content={samplePost.content}
                      profileImageUrl={samplePost.profileImageUrl}
                      mainImageUrl={samplePost.mainImageUrl}
                      onLike={samplePost.onLike}
                      onComment={samplePost.onComment}
                      onShare={samplePost.onShare}
                    />

                    <Post
                      username={samplePost.username}
                      location={samplePost.location}
                      timeAgo={samplePost.timeAgo}
                      content={samplePost.content}
                      profileImageUrl={samplePost.profileImageUrl}
                      mainImageUrl={samplePost.mainImageUrl}
                      onLike={samplePost.onLike}
                      onComment={samplePost.onComment}
                      onShare={samplePost.onShare}
                    />
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