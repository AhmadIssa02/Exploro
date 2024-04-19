import React from 'react';
import Image from "next/image";

const PostInput: React.FC = () => {
  return <>
    <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-3 lg:p-6 rounded-2xl lg:rounded-3xl lg:ml-16 ">
      <div className="flex items-center space-x-2">
        <div className="rounded-full ">
          <Image
            src="/images/profilePhoto.png"
            alt="profile"
            width={50}
            height={40}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
        <input
          type="text"
          placeholder="What would you like to share?"
          className="w-full text-sm lg:text-lg poppins-semibold p-3 rounded-xl border bg-quarternary-500 placeholder-gray-700"
        />
      </div>
    </div>
  </>;
};

export default PostInput;