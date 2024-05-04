// CommentsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Router from 'next/router';
import { getTokenCookie } from '@/utils/cookieUtils';
import jwt from 'jsonwebtoken';

interface Comment {
    _id: string; // Assuming comment objects have an _id property
    comment: string;
    username: string;
    profileImageUrl: string;
    userId: string;
    // Add other properties as needed
}

type User = {
    username: string;
    profilePicture: string;
};

interface Props {
    postId: string;
}

const CommentsList: React.FC<Props> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get<Comment[]>(`http://localhost:3000/userCommentsPost/${postId}/comments`);
                console.log('Comments:', response.data);
                const updatedComments = await Promise.all(response.data.map(async (comment) => {
                    // Fetch user info using userId
                    const userResponse = await axios.get(`http://localhost:3000/users/${comment.userId}`);
                    const userData = userResponse.data;
                    // Return updated comment object with user info
                    console.log('User data:', userData);
                    return {
                        ...comment,
                        username: userData.name,
                        profileImageUrl: userData.profilePicture
                    };
                }));

                setComments(updatedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        const fetchUserData = async () => {
            const token = getTokenCookie();
            if (!token) {
                console.error('Token not found.');
                return;
            }
            const decoded = jwt.decode(token) as { id: string; };
            const userId = decoded.id;
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const userData: User = {
                username: response.data.name,
                profilePicture: response.data.profilePicture
            };
            setUser(userData);
        }
        fetchUserData();
        fetchComments();
    }, [CommentsList]);


    const handleSubmitComment = async () => {
        // Perform validation if needed
        if (!newComment.trim()) {
            console.error('Comment cannot be empty.');
            return;
        }

        try {
            const token = getTokenCookie();
            if (!token) {
                console.error('Token not found.');
                return;
            }
            const decoded = jwt.decode(token) as { id: string; };
            const userId = decoded.id;
            const response = await axios.post(`http://localhost:3000/userCommentsPost`, {
                userId,
                postId,
                comment: newComment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const newCommentData = response.data;

            setComments(prevComments => [
                {
                    ...newCommentData,
                    username: user?.username,
                    profileImageUrl: user?.profilePicture
                },
                ...prevComments
            ]);

            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }


    const handleUserClick = (userId: string) => {
        Router.push(`/${userId}`);
    }
    return (
        <div className='font-poppins w-full border-t-2 mt-1'>
            <div className='flex flex-col justify-start text-left mt-1'>
                <div className='border-b-2  rounded-lg pl-2 mb-4 flex items-start'>
                    {user && (
                        <div className='flex mt-1 w-full mb-2 '>
                            <Image
                                src={user.profilePicture}
                                alt="User profile"
                                width={55}
                                height={50}
                                className='rounded-full mt-1'
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }} />
                            <div className='flex-grow flex ml-1 items-center mt-2 gap-x-2'>
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className='bg-quarternary-500 px-2 py-2 rounded-md w-full my-1'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    className='bg-primary-500 px-3 py-2 text-white rounded-md mr-4  hover:bg-primary-600'
                                    onClick={handleSubmitComment}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='overflow-y-auto max-h-52 mb-4'>
                    {comments.map((comment) => (
                        <div className="border-b-2 pl-2 mb-4 flex items-start rounded-lg " key={comment._id}>
                            <Image
                                src={comment.profileImageUrl}
                                alt="User profile"
                                width={55}
                                height={50}
                                className='rounded-full'
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }} />
                            <div className='ml-3 flex flex-col justify-start items-start'>
                                <button onClick={() => handleUserClick(comment.userId)}>
                                    <div className='text-xs font-bold'>{comment.username}</div>
                                </button>
                                <div className='text-lg mb-1'>{comment.comment}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CommentsList;
