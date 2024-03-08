import React from 'react';
import Image from 'next/image';

type ChatProps = {
  username: string;
  lastMessage: string;
  image?: string;
};

const Chat: React.FC<ChatProps> = ({ username, lastMessage, image}) => {
  const defaultImage = '/images/defaultProfile.png';
  return (
    <div className="flex items-center space-x-3 mt-1 p-2 hover:bg-gray-100 rounded-md cursor-pointer border-2">
      <div className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden">
        <Image src={image || defaultImage} alt="Profile" width={50} height={50} />
      </div>
      <div className = "flex-1 min-w-0">
        <p className="font-semibold truncate">{username}</p>
        <p className="text-sm text-gray-500 truncate ">{lastMessage}</p>
      </div>
    </div>
  );
};

const Chats: React.FC = () => {
    // Dummy data for the example
    const chats = [
      { username: 'John Doe', lastMessage: 'Hey, how are you?' , image: '/images/profilePhoto.png'},
      { username: 'Jane Smith', lastMessage: 'Let`s catch up tomorrow!' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Ahmad Issa', lastMessage: 'I have a new idea for the project  ' },
      { username: 'Sara Johnson', lastMessage: 'I am waiting for your call' }
    ];
  
    return (
      <div className="bg-white h-5/6 overflow-y-auto rounded-lg shadow-md p-4 text-black font-poppins ">
        <h3 className="font-bold text-lg mb-2">Latest Chats</h3>
        <div className="flex  justify-center"> 
          <input type="text" placeholder="Search" className="w-full rounded-full border-2 text-center mb-1" />
          <button className='bg-white'>
            <Image src="/images/search2.png" alt="search" width={20} height={20} className='mb-1 ml-1' />
          </button>
        </div> 
        {chats.map((chat, index) => (
          <Chat key={index} username={chat.username} lastMessage={chat.lastMessage} image={chat.image}  />
          ))}
      </div>
    );
  };
  
  export default Chats;
