import { getTokenCookie } from "@/utils/cookieUtils";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

type SavedPostCardProps = {
    postId: string;
    location: string;
    image: string;
    username: string;
    profileImageUrl: string;
    content: string;
};

const SavedPostCard: React.FC<SavedPostCardProps> = ({ postId, location, image, username, profileImageUrl, content }) => {
    const [saved, setSaved] = useState(true); // Start with the post saved

    // useEffect(() => {
    //     const checkSavedStatus = async () => {
    //         try {
    //             const token = getTokenCookie();
    //             if (!token) {
    //                 console.error('No token found');
    //                 return;
    //             }
    //             const decoded = jwt.decode(token) as { id: string };
    //             const currentUserId = decoded.id;
    //             const response = await axios.get(`http://localhost:3000/saved-posts/${currentUserId}`);
    //             console.log('Saved posts:', response.data);
    //             const isSaved = response.data.some((savedPost: { postId: string }) => savedPost.postId === postId);
    //             setSaved(isSaved);
    //         } catch (error) {
    //             console.error('Error checking saved status:', error);
    //         }
    //     };

    //     checkSavedStatus();
    // }, [postId]);

    const handleUnsave = async () => {
        try {
            const token = getTokenCookie();
            if (!token) {
                console.error('No token found');
                return;
            }
            const decoded = jwt.decode(token) as { id: string };
            const currentUserId = decoded.id;

            await axios.delete(`http://localhost:3000/saved-posts/`, {
                data: {
                    userId: currentUserId,
                    postId: postId
                }
            });
            console.log('Post unsaved');
        } catch (error) {
            console.error('Error unsaving post:', error);
        }
    };

    return (
        <div className='w-5/6 p-4 h-full ml-7 lg:ml-1 text-black bg-white rounded-lg shadow-lg flex flex-col items-center justify-between space-y-3 transition-transform transform hover:scale-105'>
            <div className="flex self-start justify-center align-middle items-center ">
                <div className="rounded-full ">
                    <Image
                        src={profileImageUrl}
                        alt="User profile"
                        width={50}
                        height={50}
                        className='rounded-full'
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}
                    />
                </div>
                <div className="flex flex-col align-bottom items-start">
                    <div className=" font-bold text-xl">{username}</div>
                    <div className=" font-medium text-xs ">{location}</div>
                </div>
            </div>
            <div className="selft-start place-self-start my-1 ml-8 font-medium text-lg">{content}</div>
            {image && <Image src={image} alt="Post Image" width={200} height={150} className='mt-1' style={{ maxWidth: "100%", height: "auto" }} />}
            <button className="px-2 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-300" onClick={handleUnsave}>
                Unsave
            </button>
        </div>
    );
};

export default SavedPostCard;
