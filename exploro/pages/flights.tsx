import { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import ProfileSideBar from '../components/ProfileSideBar';
import Chats from '../components/Chats';
import { useAuthGuard } from '../hooks/useAuthGuard';

const FlightsPage = () => {
    useAuthGuard();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [flightData, setFlightData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);


    const [originLocationCode, setOriginLocationCode] = useState('');
    const [destinationLocationCode, setDestinationLocationCode] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [originOptions, setOriginOptions] = useState<string[]>([]);
    const [destinationOptions, setDestinationOptions] = useState<string[]>([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');


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
                console.log('Access Token:', data.access_token);
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

        const params = {
            originLocationCode: originLocationCode,
            destinationLocationCode: destinationLocationCode,
            departureDate,
            returnDate,
            adults: '1',
        };

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
                setFlightData(data.data);
                console.log('Flight Data here:', data.data);
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
            })
            .finally(() => {
                setIsSearching(false);
            });
    };


    const fetchOriginOptions = (query: string) => {
        // Fetch options from API or define statically
        const options = ['NYC', 'LAX', 'SFO', 'JFK'].filter(option =>
            option.toLowerCase().includes(query.toLowerCase())
        );
        setOriginOptions(options);
    };

    const fetchDestinationOptions = (query: string) => {
        // Fetch options from API or define statically
        const options = ['LAX', 'SFO', 'JFK', 'ORD'].filter(option =>
            option.toLowerCase().includes(query.toLowerCase())
        );
        setDestinationOptions(options);
    };
    const fetchLocationOptions = (query: string, isOrigin = true) => {
        if (query.length < 3) { // Wait for at least 3 characters before querying
            if (isOrigin) setOriginOptions([]);
            else setDestinationOptions([]);
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
                if (isOrigin) setOriginOptions(data.data);
                else setDestinationOptions(data.data);
            })
            .catch(error => {
                console.error('Error fetching location options:', error);
            });
    };
    const selectOriginOption = (option: string) => {
        setSelectedOrigin(option);
        setOriginLocationCode(option);
    };
    const selectDestinationOption = (option: string) => {
        setSelectedDestination(option);
        setDestinationLocationCode(option);
    }


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

                <form onSubmit={handleSearch} className='mt-24 w-11/12 lg:w-1/2 mx-4 text-black/60'>
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Leaving from</label>
                                <input type="text" value={originLocationCode} onChange={(e) => { setOriginLocationCode(e.target.value); fetchOriginOptions(e.target.value); }} placeholder=" Origin Code"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                                <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded-md mt-1 bg-white">
                                    {originOptions.map((option, index) => (
                                        <li key={index} onClick={() => selectOriginOption(option)}
                                            className="p-2 hover:bg-gray-200 cursor-pointer">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Going to</label>
                                <input type="text" value={destinationLocationCode} onChange={(e) => { setDestinationLocationCode(e.target.value); fetchDestinationOptions(e.target.value); }} placeholder="Destination Code"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                                <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded-md mt-1 bg-white">
                                    {destinationOptions.map((option, index) => (
                                        <li key={index} onClick={() => selectDestinationOption(option)}
                                            className="p-2 hover:bg-gray-200 cursor-pointer">
                                            {option}
                                        </li>
                                    ))} </ul>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Departure Date</label>
                                <input type="date" id="departure-date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Return Date</label>
                                <input type="date" id="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-primary-500 text-white py-3 w-1/3 rounded-md hover:bg-primary-600 transition-colors duration-300"
                            disabled={isSearching}
                        >
                            {isSearching ? 'Searching...' : 'Search Flights'}
                        </button>
                        {isSearching && <p className="text-sm text-gray-500">Please wait while we search for flights...</p>}
                    </div>
                </form>


                <div className="flex-1 flex flex-col bg-quarternary-500">
                    <div className="flex justify-start items-start  pace-y-6 w-full mb-6 h-full mt-16">
                        <div className="w-1/5 bg-primary-500 hidden lg:block" />
                        <div className="w-[28%] p-5 right-0 top-10 fixed h-5/6 min-h-screen z-0 mt-6 hidden lg:block">
                            <Chats />
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default FlightsPage;


// const [adults, setAdults] = useState(1);
// const [children, setChildren] = useState(0);
// const [infants, setInfants] = useState(0);
// const [travelClass, setTravelClass] = useState('');
// const [includedAirlineCodes, setIncludedAirlineCodes] = useState('');
// const [excludedAirlineCodes, setExcludedAirlineCodes] = useState('');
// const [nonStop, setNonStop] = useState(false);
// const [currencyCode, setCurrencyCode] = useState('');
// const [maxPrice, setMaxPrice] = useState('');
// const [max, setMax] = useState('');



// const params = {
//     originLocationCode: originLocationCode,
//     destinationLocationCode: destinationLocationCode,
//     departureDate: departureDate,
//     returnDate: returnDate,
//     adults: '1',
// };
// console.log('Params:', params);
// const queryString = new URLSearchParams(params).toString();
// console.log('Query String:', queryString);
// const apiUrl = `${url}?${queryString}`;
// console.log('API URL:', apiUrl);

// useEffect(() => {
//     if (!accessToken) return;

//     fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Flight Data:', data);
//             setFlightData(data.data);
//         })
//         .catch(error => {
//             console.error('Error fetching flights:', error);
//         });
// }, [accessToken, originLocationCode, destinationLocationCode, departureDate, returnDate]);  // This useEffect depends on accessToken


{/* <input type="number" value={adults} onChange={e => setAdults(e.target.value)} placeholder="Number of Adults" />
                    <input type="number" value={children} onChange={e => setChildren(e.target.value)} placeholder="Number of Children" />
                    <input type="number" value={infants} onChange={e => setInfants(e.target.value)} placeholder="Number of Infants" /> */}
{/* <input type="text" value={travelClass} onChange={e => setTravelClass(e.target.value)} placeholder="Travel Class" />
                    <input type="text" value={includedAirlineCodes} onChange={e => setIncludedAirlineCodes(e.target.value)} placeholder="Included Airline Codes" />
                    <input type="text" value={excludedAirlineCodes} onChange={e => setExcludedAirlineCodes(e.target.value)} placeholder="Excluded Airline Codes" />
                    <input type="checkbox" checked={nonStop} onChange={e => setNonStop(e.target.checked)} />
                    <input type="text" value={currencyCode} onChange={e => setCurrencyCode(e.target.value)} placeholder="Currency Code" />
                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max Price" />
                    <input type="number" value={max} onChange={e => setMax(e.target.value)} placeholder="Max Results" /> */}
{/* <div className="flex flex-wrap justify-center items-center h-full">
                    {flightData.map(flight => (
                        <div key={flight.id} className="m-4 p-4 bg-primary-700 rounded-lg">
                            <h2 className="text-lg font-bold">Flight {flight.id}</h2>
                        </div>
                    ))}
                </div> */}