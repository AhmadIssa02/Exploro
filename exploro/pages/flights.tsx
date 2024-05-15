import { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import ProfileSideBar from '../components/ProfileSideBar';
import Chats from '../components/Chats';
import { useAuthGuard } from '../hooks/useAuthGuard';

interface LocationData {
    iataCode: string;
    name: string;
    address: {
        countryName: string;
    };
}

interface Flight {
    id: string;
    itineraries: {
        segments: {
            operating: {
                carrierCode: string;
            };
            departure: {
                iataCode: string;
                at: string;
            };
            arrival: {
                iataCode: string;
                at: string;
            };
            duration: string;
        }[];
    }[];
    price: {
        total: string;
        currency: string;
        base: string;
        grandTotal: string;
    };
    travelerPricings: {
        travelerType: string;
        fareOption: string;
        price: {
            total: string;
            currency: string;
            base: string;
        };
        fareDetailsBySegment: {
            cabin: string;
        }[];
    }[];
}

const FlightsPage = () => {
    useAuthGuard();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    const [accessToken, setAccessToken] = useState('');
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [travelClass, setTravelClass] = useState('ECONOMY');
    const [isSearched, setIsSearched] = useState(false);


    const [originLocationCode, setOriginLocationCode] = useState('');
    const [destinationLocationCode, setDestinationLocationCode] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [originOptions, setOriginOptions] = useState<LocationData[]>([]);
    const [destinationOptions, setDestinationOptions] = useState<LocationData[]>([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen(!isProfileSidebarOpen);
    };

    const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

    useEffect(() => {
        const formData = new URLSearchParams();
        const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET as string;
        formData.append('client_id', apiKey);
        formData.append('client_secret', apiSecret);
        formData.append('grant_type', 'client_credentials');

        fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setAccessToken(data.access_token);
            })
            .catch(error => {
                console.error('Error obtaining token:', error);
            });
    }, []);

    const handleSearch = (e: any) => {
        e.preventDefault();

        if (!accessToken) {
            console.error('Access token is not available.');
            return;
        }

        setIsSearching(true);

        const params: {
            originLocationCode: string;
            destinationLocationCode: string;
            departureDate: string;
            adults: '1';
            max: '250';
            travelClass: string;
            returnDate?: string;
        } = {
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate,
            adults: '1',
            max: '250',
            travelClass: travelClass,
        };

        if (isRoundTrip) {
            params.returnDate = returnDate;
        }

        const queryString = new URLSearchParams(params).toString();
        const apiUrl = `${url}?${queryString}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const filteredData = data.data.filter((flight: Flight) => {
                    return (
                        flight.itineraries[0]?.segments[0]?.departure.iataCode === originLocationCode &&
                        flight.itineraries[0]?.segments[0]?.arrival.iataCode === destinationLocationCode
                    );
                });
                setFlightData(filteredData);
                console.log('Flight Data filtered:', filteredData);
                console.log('Flight Data here:', data.data);
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
            })
            .finally(() => {
                setIsSearching(false);
                setIsSearched(true);
            });
    };

    const fetchOriginLocationOptions = (query: string) => {
        if (query.length < 1) {
            setOriginOptions([]);
            return;
        }

        const apiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=10&page[offset]=0&sort=analytics.travelers.score&view=FULL`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setOriginOptions(data.data);
            })
            .catch(error => {
                console.error('Error fetching location options:', error);
            });
    };

    const fetchDestinationLocationOptions = (query: string) => {
        if (query.length < 1) {
            setDestinationOptions([]);
            return;
        }

        const apiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=10&page[offset]=0&sort=analytics.travelers.score&view=FULL`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setDestinationOptions(data.data);
            })
            .catch(error => {
                console.error('Error fetching location options:', error);
            });
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

                <div className='mt-20 w-11/12 lg:w-1/2 mx-4 text-black/60 flex flex-col items-center'>
                    <form onSubmit={handleSearch} className='w-full'>
                        <div className="flex flex-col space-y-4">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Leaving from</label>
                                    <input type="text" value={originLocationCode} onChange={(e) => { setOriginLocationCode(e.target.value); fetchOriginLocationOptions(e.target.value); }} placeholder=" Origin "
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <ul className="max-h-32 overflow-y-auto border border-gray-300 rounded-md mt-1 bg-white">
                                        {originOptions && originOptions.map((option, index) => (
                                            <div key={index} onClick={() => { setOriginLocationCode(option.iataCode); setOriginOptions([]); }} className='ml-2 mt-1 border-b-[1px] w-11/12 font-semibold text-sm md:text-base'>
                                                {option.name} ({option.iataCode}) , {option.address.countryName}
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Going to</label>
                                    <input type="text" value={destinationLocationCode} onChange={(e) => { setDestinationLocationCode(e.target.value); fetchDestinationLocationOptions(e.target.value); }} placeholder="Destination "
                                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    />
                                    <ul className="max-h-32 overflow-y-auto border border-gray-300 rounded-md mt-1 bg-white">
                                        {destinationOptions && destinationOptions.map((option, index) => (
                                            <div key={index} onClick={() => { setDestinationLocationCode(option.iataCode); setDestinationOptions([]); }} className='ml-2 mt-1 border-b-[1px] w-11/12 font-semibold text-sm '>
                                                {option.name} ({option.iataCode}), {option.address.countryName}
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Departure Date</label>
                                    <input type="date" id="departure-date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}
                                        className="mt-1 text-xs md:text-base block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Return Date</label>
                                    <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                                        className="mt-1 text-xs md:text-base block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                        disabled={!isRoundTrip}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <label htmlFor="travelClass" className="mr-2 text-black">Travel Class:</label>
                                <select className="p-[2px] rounded-md" id="travelClass" onChange={(e) => setTravelClass(e.target.value)}>
                                    <option className="rounded-md" value="ECONOMY">Economy</option>
                                    <option className="rounded-md" value="FIRST">First</option>
                                </select>
                            </div>

                            <div className="flex items-center mt-4">
                                <label htmlFor="roundtrip" className="mr-2 text-black">Roundtrip:</label>
                                <select className="p-[2px] rounded-md" id="roundtrip" value={isRoundTrip ? 'yes' : 'no'} onChange={(e) => setIsRoundTrip(e.target.value === 'yes')}>
                                    <option className="rounded-md" value="yes">Yes</option>
                                    <option className="rounded-md" value="no">No</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="bg-primary-500 text-white p-2 w-1/3 rounded-md text-xs md:text-lg hover:bg-primary-600 transition-colors duration-300"
                                disabled={isSearching}
                            >
                                {isSearching ? 'Searching...' : 'Search Flights'}
                            </button>
                            {isSearching && <p className="text-sm text-gray-500">Please wait while we search for flights...</p>}
                        </div>
                    </form >



                    <div className="flex flex-col space-y-4 mt-8 w-11/12 mb-10">
                        {flightData && flightData.map((flight, index) => (
                            <div key={index} className="bg-white text-black rounded-2xl p-5 shadow-2xl ">
                                {/* Flight Details */}
                                <div className='flex'>
                                    <h3 className="text-sm md:text-lg font-semibold flex mt-1 "> Airline Name: <div className='mx-2 font-bold text-sm md:text-xl '> {flight.itineraries[0]?.segments[0]?.operating ? flight.itineraries[0].segments[0].operating.carrierCode : 'N/A'} </div></h3>
                                    <h3 className="text-base text-white font-semibold mt-1 ml-auto bg-secondary-600 p-2 rounded-md">{flight.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin}</h3>
                                </div>

                                {/* <h3 className="text-lg font-semibold flex mt-1 "> Airline Name: <div className='mx-2 font-bold text-xl'> {flight.itineraries[0].segments[0].operating.carrierCode} </div></h3> */}
                                {/* <p>Departure: {flight.itineraries[0].segments[0].departure.iataCode}</p>
                                <p>Arrival: {flight.itineraries[0].segments[0].arrival.iataCode}</p> */}

                                <h3 className="text-lg font-semibold">Flight Route</h3>
                                <div className='flex justify-evenly items-center gap-x-2 mt-2'>
                                    <div className='flex flex-col justify-center items-center align-middle gap-y-1 md:gap-y-2'>
                                        <p className='text-xl md:text-3xl font-bold'>{flight.itineraries[0].segments[0].departure.iataCode}</p>
                                        <p className='text-[8px] md:text-base'>Departure At:</p>
                                        <p className='font-semibold text-[9px] md:text-sm'>{flight.itineraries[0].segments[0].departure.at.substring(0, 10)}</p>
                                        <p className='font-bold text-xl'>{flight.itineraries[0].segments[0].departure.at.substring(11, 16)}</p>
                                    </div>
                                    <Image className="w-1/12 md:w-fit" src="/images/plane2.svg" alt="plane" width={30} height={10} />
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image className="w-3/4 md:w-max" src="/images/arrow2.svg" alt="arrow" width={90} height={20} />
                                        <p className='text-sm '> {flight.itineraries[0]?.segments[0]?.duration.substring(2)}</p>
                                    </div>
                                    <Image className="w-1/12 md:w-fit" src="/images/plane3.svg" alt="plane" width={30} height={10} />
                                    <div className='flex flex-col justify-center items-center  align-middle gap-y-1 md:gap-y-2'>
                                        <p className='text-xl md:text-3xl font-bold'>{flight.itineraries[0].segments[0].arrival.iataCode}</p>
                                        <p className='text-[8px] md:text-base'>Arrival At:</p>
                                        <p className='font-semibold text-[9px] md:text-sm'>{flight.itineraries[0].segments[0].arrival.at.substring(0, 10)}</p>
                                        <p className='font-bold text-xl'>{flight.itineraries[0].segments[0].arrival.at.substring(11, 16)}</p>
                                    </div>
                                </div>
                                {flight.itineraries[1] &&
                                    (<div className='flex justify-evenly items-center gap-x-2 mt-4'>
                                        <div className='flex flex-col justify-center items-center align-middle gap-y-1 md:gap-y-2'>
                                            <p className='text-xl md:text-3xl font-bold'>{flight.itineraries[1].segments[0].departure.iataCode}</p>
                                            <p className='text-[8px] md:text-base'>Departure At:</p>
                                            <p className='font-semibold text-[9px] md:text-sm'>{flight.itineraries[1].segments[0].departure.at.substring(0, 10)}</p>
                                            <p className='font-bold text-xl'>{flight.itineraries[1].segments[0].departure.at.substring(11, 16)}</p>
                                        </div>
                                        <Image className="w-1/12 md:w-fit " src="/images/plane4.svg" alt="plane" width={30} height={10} />
                                        <div className='flex flex-col justify-center items-center'>
                                            <Image className="w-3/4 md:w-max " src="/images/arrow3.svg" alt="arrow" width={90} height={20} />
                                            <p className='text-sm '> {flight.itineraries[1]?.segments[0]?.duration.substring(2)}</p>
                                        </div>
                                        <Image className="w-1/12 md:w-fit " src="/images/plane5.svg" alt="plane" width={30} height={10} />
                                        <div className='flex flex-col justify-center items-center  align-middle gap-y-1 md:gap-y-2'>
                                            <p className='text-xl md:text-3xl font-bold'>{flight.itineraries[1].segments[0].arrival.iataCode}</p>
                                            <p className='text-[8px] md:text-base'>Arrival At:</p>
                                            <p className='font-semibold text-[9px] md:text-sm'>{flight.itineraries[1].segments[0].arrival.at.substring(0, 10)}</p>
                                            <p className='font-bold text-xl'>{flight.itineraries[1].segments[0].arrival.at.substring(11, 16)}</p>
                                        </div>
                                    </div>)}
                                <div className='p-2 bg-primary-300 text-sm text-white font-bold shadow-sm rounded-md w-24 ml-auto mt-5 '> {flight.price.total} {flight.price.currency}</div>
                            </div>
                        ))}


                        {!flightData.length && isSearched && <p className="text-lg p-6 bg-white rounded-md w-full text-gray-500">No flights available with the specified origin and destination at that time.</p>}
                    </div>

                </div>


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

            </div >
        </div >
    );
};

export default FlightsPage;