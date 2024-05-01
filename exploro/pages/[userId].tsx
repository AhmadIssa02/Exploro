import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { use, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Post from "@/components/post";
import { feedPost } from "@/models/crud";
import { FeedPostApi } from "@/utils/api/feedPost/feedPost.api";
import axios from "axios";
import { getTokenCookie } from "@/utils/cookieUtils";
import jwt from 'jsonwebtoken';
import { calculateTimeAgo } from "@/utils/timeUtils";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/router";


type User = {
  username: string;
  bio: string;
  profileImageUrl: string;
};

const UserProfile = () => {
  useAuthGuard();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [personalProfile, isPersonalProfile] = useState(false);
  const [isUserExists, setIsUserExists] = useState<boolean>(true);


  const router = useRouter();
  const { userId } = router.query;

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const [posts, setPosts] = useState<feedPost[]>([]);
  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }, [posts]); // Dependency array to ensure sort only runs when posts change


  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const postApi = new FeedPostApi();
        const fetchedPosts = await postApi.find();
        const userPosts = fetchedPosts.filter((post) => post.user === userId);

        if (isMounted) {
          setPosts(userPosts);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false; // Set to false when the component unmounts
    };
  }, [userId]);



  useEffect(() => {
    const fetchUserBio = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const userBio = response.data.bio;
        setBio(userBio);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsUserExists(false); // Set user existence to false if there's an error
      }
    };

    if (userId) {
      fetchUserBio();
    }
  }, [userId]);


  const handleBioSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const token = getTokenCookie();
      if (token) {
        const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
        const userId = decoded.id;
        const response = await axios.put(
          `http://localhost:3000/users/${userId}`,
          { bio: bio },
        );
        if (response.status === 200) {
          // Handle success
          console.log('Bio updated:', response.data.bio);
          // setUser({ ...user, bio: bio }); // Update the user state with the new bio
          setEditBio(false); // Exit edit mode
        } else {
          // Handle failure
          console.error('Failed to update bio:', response);
        }
      }

    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getTokenCookie();
        if (token) {
          const decoded = jwt.decode(token) as { id: string; };
          const userIdFromToken = decoded.id;
          if (userIdFromToken === userId) {
            // console.log('Personal profile');
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const userBio = response.data.bio;
            setBio(userBio);
            isPersonalProfile(true);
          } else {
            // console.log('Other user profile');
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            // console.log('User data:', response.data);
            setUser({
              username: response.data.name,
              bio: response.data.bio,
              profileImageUrl: response.data.profilePicture
            });
            isPersonalProfile(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!isUserExists) {
    return (
      <div className="bg-primary-500 min-h-screen text-center">
        <p className="pt-48 text-3xl text-white  ">This page doesn't exist.</p>
      </div>
    );
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
            <div className="w-full lg:w-9/12 flex flex-col items-center justify-center space-y-4 mt-2 lg:p-4 lg:pr-8 rounded-md lg:mr-32">


              {personalProfile && <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-4 rounded-3xl lg:ml-16  ">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full min-w-max self-start ">
                    <Image src="/images/profilePhoto.png" alt="profile" width={50} height={40} style={{ maxWidth: "100%", height: "auto" }} />
                  </div>
                  {!editBio ? (
                    <>
                      <div className="flex p-3 justify-between bg-quarternary-500 w-5/6 md:w-11/12 rounded-xl">
                        <div className='font-semibold text-sm lg:text-lg poppins-semibold '>{bio} </div>
                        <button className=" text-center text-xs bg-primary-500 p-2 h-max rounded-md text-white" onClick={() => setEditBio(true)}>Change </button>
                      </div>

                    </>
                  ) : (
                    <form onSubmit={handleBioSubmit} className="flex py-4 bg-quarternary-500 w-full rounded-xl">
                      <div className="font-semibold text-sm lg:text-lg poppins-semibold flex bg-quarternary-500 w-full rounded-xl ml-4">
                        <input
                          type="text"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-center relative text-xs p-2 rounded-xl text-white">
                        <button type="submit" className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md mr-2">Save</button>
                        <button onClick={() => setEditBio(false)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md">Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              </div>}
              {!personalProfile && user && <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-4 rounded-3xl lg:ml-16  ">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full min-w-max self-start ">
                    <Image src={user.profileImageUrl} alt="profile" width={50} height={40} style={{ maxWidth: "100%", height: "auto" }} />
                  </div>
                  <div>
                    <div className="flex p-2 my-1 justify-between w-full rounded-xl">
                      <div className='font-semibold text-sm lg:text-lg poppins-semibold '>{user.username} </div>
                    </div>
                    {user.bio && <div className="ml-4 flex p-3 text-center justify-center bg-tertiary-800 w-5/6 md:w-11/12 rounded-xl">
                      <div className='font-semibold text-sm text-left lg:text-lg poppins-semibold '>{user.bio} </div>
                    </div>}
                  </div>
                </div>
              </div>}

              {sortedPosts.map((post, index) => {
                return <Post
                  key={index}
                  postId={post._id}
                  userId={post.user}
                  username={post.username}
                  location={post.location}
                  timeAgo={calculateTimeAgo(post.createdAt)}
                  content={post.content}
                  profileImageUrl={post.profileImageUrl}
                  mainImageUrl={post.mainImageUrl}
                  likes={post.likes}
                  likeCount={post.likeCount}
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



