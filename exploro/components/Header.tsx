import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';

const Header: React.FC = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);


  const handleSearch = () => {
    axios.get(`http://localhost:3000/users/paginate/?name=${name}`)
      .then((response) => {
        const userData = response.data;
        const extractedUsernames = userData.map((user: any) => user.name || user.username);
        setUsers(userData);
        setUsernames(extractedUsernames);
        setShowDropdown(true); // Show the dropdown when there are results
      })
      .catch(error => {
        console.error("Error fetching usernames:", error);
        setUsernames([]); // Reset usernames if there's an error
        setUsers([]);
      });
  };


  // This will handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Hide the dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex w-4/5 lg:w-1/2 ml-10 lg:ml-0">
      <input
        type="search"
        placeholder="Search"
        className="w-3/5 md:w-3/4 px-2 rounded-full text-black text-center poppins-semibold"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Image
        src="/images/search.svg"
        alt="search"
        width={20}
        height={20}
        className="ml-4 cursor-pointer"
        onClick={handleSearch}
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
      {showDropdown && (
        <ul className="absolute w-2/3 lg:w-[40%] min-h-0 max-h-80 bg-white mt-8 p-2 rounded-lg shadow-lg overflow-auto" ref={dropdownRef}>
          {users.map((user, index) => (
            <Link href={`/${user._id}`}>
              <li key={index} className="p-2 text-black hover:bg-gray-100 cursor-pointer border-b-4 flex items-center">
                <button className="flex items-center w-full">
                  <Image src={user.profilePicture} alt="User Image" width={40} height={40} className="rounded-full mr-2" />
                  <div>{user.name}</div>
                </button>
              </li>
            </Link>
          ))}
          {users.length === 0 && (
            <li className="p-2 text-black">No results found</li>
          )}
        </ul>
      )}
      {/* <Link href="/Inbox"> */}
      <Link href="/exploroAI">
        <div className="lg:hidden">
          <Image
            src="/images/chats.svg"
            alt="inbox"
            width={25}
            height={20}
            className="ml-2 lg:hidden"
          />
        </div>
      </Link>
      {/* </Link> */}
    </div>
  );
};

export default Header;
