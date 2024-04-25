import Image from "next/image";
import Router from "next/router";
import React from 'react';

type PostProps = {
  userId: string;
  username: string;
  location: string;
  timeAgo: string;
  content: string;
  profileImageUrl: string;
  mainImageUrl: string;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
};

const Post: React.FC<PostProps> = ({ userId, username, location, timeAgo, content, profileImageUrl, mainImageUrl, onLike, onComment, onShare }) => {
  const handleProfile = () => {
    const id = userId;
    if (id) {
      Router.push(`/${id}`);
    } else {
      console.error('UserId is undefined');
    }
  };
  return (
    <div className="bg-white p-2 rounded-xl lg:rounded-2xl shadow-xl w-11/12 lg:w-7/12 flex flex-col items-center text-black lg:ml-16">
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
              <button className='text-primary-500/90 font-medium text-sm ml-2 '>Follow</button>
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
      <div className="flex items-center my-2 w-full justify-evenly">
        <button onClick={onLike}>
          <Image
            src="/images/like2.svg"
            alt="Like"
            width={25}
            height={25}
            className='mt-1'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </button>
        <button onClick={onComment}>
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
        <button onClick={onShare}>
          <Image
            src="/images/share.svg"
            alt="Share"
            width={25}
            height={25}
            className='mt-1'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </button>
      </div>
    </div>
  );
};

export default Post;
