import Image from "next/image";

type SavedPostCardProps = {
    location: string;
    image: string;
    username: string;
    profileImageUrl: string;
    content: string;
};

const SavedPostCard: React.FC<SavedPostCardProps> = ({ location, image, username, profileImageUrl, content }) => {
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
            {/* <Image src={image} alt="Post Image" width={200} height={150} className='mt-1' style={{ maxWidth: "100%", height: "auto" }} /> */}

            <button className="px-2 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-300">Unsave</button>
        </div>
    );
};

export default SavedPostCard;
