import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import Post from "@/components/post";
import { feedPost } from "@/models/crud";
import { FeedPostApi } from "@/utils/api/feedPost/feedPost.api";
import axios from "axios";
import { getTokenCookie } from "@/utils/cookieUtils";
import jwt from 'jsonwebtoken';


type User = {
  username: string;
  bio: string;
  profileImageUrl: string;
};


const UserProfile = () => {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);



  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const [posts, setPosts] = useState<feedPost[]>([]);
  const fetchPosts = async () => {
    try {

      const postApi = new FeedPostApi()
      const posts = await postApi.find();
      setPosts(posts);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getTokenCookie();
        if (token) {
          const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
          const userId = decoded.id;
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          const userData: User = {
            username: response.data.name,
            bio: response.data.bio,
            profileImageUrl: response.data.profilePicture
          };
          setUser(userData);
        } else {
          console.error('Token not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const calculateTimeAgo = (date: Date) => {

    const currentDate = new Date();
    const postDate = new Date(date);

    const diff = currentDate.getTime() - postDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }

  return (
    <div>
      <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col bg-quarternary-500">

          <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
            <button className='absolute left-4' onClick={toggleSidebar}>
              <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='block lg:hidden' style={{ maxWidth: "100%", height: "auto" }}></Image>
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

          <div className="flex justify-center items-start w-full mb-6 h-full mt-16 ">
            {/* <div className="w-1/5 bg-primary-500 hidden lg:block"/> */}
            <div className="w-full lg:w-5/6 flex flex-col items-center justify-center  space-y-4 mt-2 lg:p-4 lg:ml-6 rounded-md lg:mr-32">


              <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-4 rounded-3xl lg:ml-16 ">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full min-w-max self-start ">
                    <Image src="/images/profilePhoto.png" alt="profile" width={50} height={40} style={{ maxWidth: "100%", height: "auto" }} />
                  </div>
                  <div className='font-semibold text-xl pl-1 '>{user.bio}</div>
                </div>
              </div>

              {posts.map((post, index) => {
                return <Post
                  key={index}
                  username={post.username}
                  location={post.location}
                  timeAgo={calculateTimeAgo(post.createdAt)}
                  content={post.content}
                  profileImageUrl={post.profileImageUrl}
                  mainImageUrl={post.mainImageUrl}
                  onLike={() => console.log('Liked!')}
                  onComment={() => console.log('Commnet!')}
                  onShare={() => console.log('Shared!')}
                />
              })}

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
export default UserProfile;