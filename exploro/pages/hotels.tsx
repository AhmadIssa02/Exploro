import Chats from "@/components/Chats";
import Header from "@/components/Header";
import ProfileSideBar from "@/components/ProfileSideBar";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import axios from "axios";


interface hotel {
    id: string,
    title: string,
    secondaryInfo: string,
    priceForDisplay: string,
}

const HotelsPage = () => {
    useAuthGuard();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };

    const [accessToken, setAccessToken] = useState('');
    const [hotels, setHotels] = useState<hotel[]>([]);
    const [cityCode, setCityCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    //         const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
    //         const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //             body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
    //         });
    //         const data = await response.json();
    //         setAccessToken(data.access_token);
    //     };

    //     fetchToken();
    // }, []);


    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;


    const searchHotels = async () => {

        setIsLoading(true);
        try {
            const locationResponse = await axios.request({
                method: 'GET',
                url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
                params: { query: cityCode },
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            });
            console.log({ "location data": locationResponse.data });
            const geoId = locationResponse.data.data[0].geoId;
            console.log("geoId" + geoId);
            // Fetch hotel information using geoId
            const hotelResponse = await axios.request({
                method: 'GET',
                url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
                params: {
                    geoId: geoId,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    pageNumber: '1',
                    currencyCode: 'USD'
                },
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            });
            console.log({ "hotel data": hotelResponse.data.data.data });

            const hotelData = hotelResponse.data.data.data;
            setHotels(hotelData);
            console.log({ "hotels": hotels });
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="flex w-full h-100% min-h-screen bg-quarternary-500 text-white font-poppins">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                <header className="fixed p-4 w-full bg-primary-500 flex justify-center">
                    <button className='lg:hidden' onClick={toggleSidebar}>
                        <Image src="/images/burgermenu.svg" alt="menu" width={25} height={25} className='absolute top-5 left-6 ' style={{ maxWidth: "100%", height: "auto" }}></Image>
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

                <div className="w-1/5 bg-primary-500 hidden lg:block" />

                <main className="flex-grow flex flex-col items-center pt-20 px-4">
                    <div className="max-w-sm md:max-w-full ">
                        <div className="flex items-center bg-white text-gray-800 rounded-lg shadow p-4 space-x-4">
                            <input
                                type="text"
                                placeholder="Enter City Code"
                                value={cityCode}
                                onChange={(e) => setCityCode(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded focus:outline-none"
                            />
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="p-2 border border-gray-300 rounded focus:outline-none text-black"
                            />
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="p-2 border border-gray-300 rounded focus:outline-none text-black"
                            />

                            <button
                                onClick={searchHotels}
                                disabled={isLoading}
                                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50"
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {hotels && Array.isArray(hotels) && (
                            <div className="mt-4">
                                <ul className="space-y-2">
                                    {hotels.map((hotel: hotel) => (
                                        <li key={hotel.id} className="bg-white text-gray-800 rounded-lg p-4 shadow">
                                            <div className="font-bold">{hotel.title}</div>
                                            <div>{hotel.secondaryInfo} - {hotel.priceForDisplay}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </main>

                <div className="flex-1 flex flex-col bg-quarternary-500">
                    <div className="flex justify-start items-start  pace-y-6 w-full mb-6 h-full mt-16">
                        <div className="w-1/5 bg-primary-500 hidden lg:block" />
                        {/* <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div> */}
                        <div className="hidden lg:flex">
                            {isChatbotOpen && (
                                <div className='flex flex-col fixed right-1 bottom-2 h-[87%] w-[27%] '>
                                    <button className='h-fit w-fit ml-auto   rounded-full z-10' onClick={toggleChatbot}>
                                        <Image src="/images/close.svg" alt="chatbot" width={16} height={30} />
                                    </button>
                                    <iframe
                                        src="https://www.chatbase.co/chatbot-iframe/ams3mDILy9PFAiRbKrGKB"
                                        title="ExploroAI"
                                        className='relative z-0 w-full h-full mt-auto bg-white border-[1px] shadow-md border-primary-500 rounded-tl-3xl mr-4 '
                                        style={{ fontSize: '0.7rem' }}
                                    ></iframe>
                                </div>
                            )}
                        </div>

                        {!isChatbotOpen && (
                            <button className='hidden lg:block fixed right-14 bottom-16  rounded-full' onClick={toggleChatbot}>
                                <Image src="/images/chatbot1.jpg" alt="chatbot" className='rounded-full ' width={75} height={30} />
                            </button>)}
                    </div>
                </div>

            </div>
        </div >
    );
};
export default HotelsPage;