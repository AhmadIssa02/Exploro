import Image from 'next/image';
import React from 'react';

type PostProps = {
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

const Post: React.FC<PostProps> = ({ username, location, timeAgo, content, profileImageUrl, mainImageUrl, onLike, onComment, onShare }) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-xl w-7/12 flex flex-col items-center text-black ml-16">
      <div className="self-start">
        <div className="flex items-center">
          <div className="rounded-full">
            <Image src={profileImageUrl} alt="User profile" width={50} height={50} />
          </div>
          <div className="ml-4 text-black/50 text-[10px]">
            <div className='text-xl text-black poppins-semibold'>{username}</div>
            <div className='ml-1'>{location}</div>
            <div className='ml-1'>{timeAgo}</div>
          </div>
        </div>
        <div className="mt-3">
          {content}
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-3">
        <Image src={mainImageUrl} alt="Main content" width={350} height={450} />
      </div>
      <div className="flex items-center mt-2 border-t-2 w-full justify-evenly">
        <button onClick={onLike}>
          <Image src="/images/like2.svg" alt="Like" width={25} height={25} className='mt-1' />
        </button>
        <button onClick={onComment}>
          <Image src="/images/comment.svg" alt="Comment" width={25} height={25} className='mt-1' />
        </button>
        <button onClick={onShare}>
          <Image src="/images/share.svg" alt="Share" width={25} height={25} className='mt-1'/>
        </button>
      </div>
    </div>
  );
};

export default Post;
