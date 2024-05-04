import { getTokenCookie } from "@/utils/cookieUtils";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import CommentsList from "./commentsList";


type PostProps = {
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

const Post: React.FC<PostProps> = ({ postId, userId, username, location, timeAgo, content, profileImageUrl, mainImageUrl, likes, likeCount }) => {

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      console.error('No token found');
      return;
    }
    const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
    const currentUserId = decoded.id;
    // Check if the user has liked the post
    if (likes && likes.includes(currentUserId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    //check if the user has saved the post before 
    const checkSavedStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/saved-posts/${currentUserId}`);
        // console.log('Saved posts:', response.data);

        // Check if any of the saved posts has the same postId
        const isSaved = response.data.some((savedPost: { postId: string; }) => savedPost.postId === postId);

        if (isSaved) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkSavedStatus();

  }, [likes, userId]);


  const handleProfile = () => {
    const id = userId;
    if (id) {
      Router.push(`/${id}`);
    } else {
      console.error('UserId is undefined');
    }
  };

  const toggleLike = async () => {
    try {
      const url = liked ? `http://localhost:3000/feedpost/post/${postId}/unlike` : `http://localhost:3000/feedpost/post/${postId}/like`;
      const token = getTokenCookie();
      if (!token) {
        console.error('No token found');
        return;
      }
      const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
      const currentUserId = decoded.id;
      await axios.put(url, { postId, currentUserId });
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  const handleSave = async () => {
    try {
      const token = getTokenCookie();
      if (!token) {
        console.error('No token found');
        return;
      }
      const decoded = jwt.decode(token) as { id: string; };
      const currentUserId = decoded.id;


      // Send POST request to save the post
      if (!saved) {
        await axios.post('http://localhost:3000/saved-posts/', {
          userId: currentUserId,
          postId: postId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSaved(true);
        console.log('Post saved');
      }
      else {
        // Send DELETE request to unsave the post
        await axios.delete(`http://localhost:3000/saved-posts`, {
          data: {
            userId: currentUserId,
            postId: postId
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSaved(false);
        console.log('Post unsaved');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };


  return (
    <div className="bg-white p-2 rounded-xl lg:rounded-2xl shadow-xl w-11/12 lg:w-7/12 flex flex-col items-start text-black lg:ml-16">
      <div className="self-start mt-1">
        <div className="flex items-center">
          <div className="rounded-full ml-2">
            <Image
              src={profileImageUrl}
              alt="User profile"
              width={50}
              height={50}
              className='rounded-full'
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          <div className="ml-2 mt-1 text-black/50 text-[10px]">
            <div className=" flex ">
              <button onClick={() => handleProfile()}>
                <div className='text-base lg:text-xl text-black poppins-semibold'>{username}</div>
              </button>
            </div>
            <div className='ml-1'>{location}</div>
            <div className='ml-1'>{timeAgo}</div>
          </div>
        </div>
        <div className="mt-3 ml-4 ">
          {content}
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-3 border-b-2">
        {mainImageUrl && <div className='w-2/3 mb-4 '>
          <Image
            src={mainImageUrl}
            alt="Main content"
            width={350}
            height={450}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
        </div>}
      </div>
      <div className="flex items-center my-2 w-full justify-around">
        <div className="flex">
          <button onClick={toggleLike}>
            <Image
              src={liked ? "/images/liked.svg" : "/images/like2.svg"}  // Update image based on liked state
              alt="Like"
              width={25}
              height={25}
              className='mt-1'
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </button>
          <span className="ml-2 mt-1 text-black/50">Liked by {likeCount} </span> {/* Display total number of likes */}
        </div>
        <button onClick={toggleComments}>
          <Image
            src="/images/comment.svg"
            alt="Comment"
            width={25}
            height={25}
            className='mt-1'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </button>
        <button onClick={handleSave} >
          {saved ? (
            <Image
              src="/images/unsave.png"
              alt="Saved"
              width={25}
              height={25}
              className='mt-1 '
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          ) : (
            <Image
              src="/images/save.png"
              alt="Save"
              width={25}
              height={25}
              className='mt-1'
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          )}
        </button>
      </div>
      {showComments && (<CommentsList postId={postId} />)}
    </div>
  );
};

export default Post;
