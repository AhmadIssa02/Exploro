import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import { getTokenCookie } from '@/utils/cookieUtils';
import jwt from 'jsonwebtoken';


const PostInput: React.FC = () => {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [postSuccess, setPostSuccess] = useState<boolean>(false);


  const [accessToken, setAccessToken] = useState('');
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET as string;
      const params = new URLSearchParams();
      params.append('client_id', apiKey);
      params.append('client_secret', apiSecret);
      params.append('grant_type', 'client_credentials');

      try {
        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params);
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error obtaining token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchTerm.length > 2) {
        try {
          const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${searchTerm}&max=10`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          setCities(response.data.data);
          console.log('Cities:', response.data.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
      else {
        setCities([]);
      }
    };

    fetchCities();
  }, [searchTerm]);

  const handleCitySelection = (selectedCity: string) => {
    setLocation(selectedCity);
    setCities([]);
  };

  type Post = {
    userId: string;
    username: string;
    location: string;
    content: string;
    profileImageUrl: string;
    mainImageUrl: string;
  }
  type User = {
    username: string;
    profileImageUrl: string;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file); // Set the state
      console.log('Image selected:', file); // Log the file, not the state
    }
  };
  const uploadImage = async () => {
    if (selectedImage) {
      console.log('Uploading image...');
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        const uploadResponse = await axios.post('http://localhost:3000/file-upload/single', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = uploadResponse.data.image_url; // Update the imageUrl with the uploaded image's URL
        setImageUrl(url);
        console.log('Image uploaded successfully:', url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No image selected.');
    }
  };
  useEffect(() => {
    uploadImage();
  }, [selectedImage]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenCookie();
      if (!token) {
        console.error('Token not found.');
        return;
      }
      const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
      const userId = decoded.id;
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData: User = {
        username: response.data.name,
        profileImageUrl: response.data.profilePicture
      };
      setUser(userData);
    };
    fetchUserData();
  }, []);



  const handlePostSubmit = async () => {
    const token = getTokenCookie();
    if (!token) {
      console.error('Token not found.');
      return;
    }
    const decoded = jwt.decode(token) as { id: string; }; // Ensure this matches the actual token structure
    const userId = decoded.id;

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData: User = {
        username: response.data.name,
        profileImageUrl: response.data.profilePicture
      };


      const postData: Post = {
        userId: userId,
        username: userData.username,
        location: location,
        content: content,
        profileImageUrl: userData.profileImageUrl,
        mainImageUrl: imageUrl
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      console.log({ postData });

      await axios.post('http://localhost:3000/feedPost', postData, config);
      setContent("");
      setSelectedImage(null);
      setLocation("");
      console.log('Post submitted successfully!');
      setPostSuccess(true);
      setTimeout(() => {
        setPostSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };


  return (
    <div className="bg-white w-11/12 lg:w-7/12 shadow-xl text-black p-3  rounded-xl lg:rounded-2xl lg:ml-16">
      <div className="flex items-center space-x-2 w-full">
        <div className="rounded-full mb-auto mt-1">
          {user && (
            <div className="rounded-full mb-auto">
              <Image
                src={user.profileImageUrl}
                alt="profile"
                width={50}
                height={40}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>)}
        </div>

        <div className=' flex flex-col w-full'>
          <input
            type="text"
            placeholder="What do you want to share?"
            className="w-full text-xs md:text-sm poppins-semibold p-3 rounded-xl border bg-quarternary-500 placeholder-gray-700"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className=' flex mt-3 justify-between gap-x-2 '>
            <div className='flex flex-col '>
              <input
                type="text"
                placeholder="Location"
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium md:font-semibold px-1 py-2 rounded text-[10px] md:text-xs  placeholder:text-white w-full text-center "
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setSearchTerm(e.target.value); // Update the searchTerm with the location input value
                }}
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={(fileInput) => fileInput && fileInput.setAttribute("multiple", "multiple")}
              id="fileInput"
            />
            <button
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium text-[10px] md:font-semibold px-1 rounded md:text-xs w-1/5"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Image
            </button>
            <button
              className="bg-green-700 hover:bg-green-800 text-white font-medium md:font-semibold text-[10px] md:text-xs w-1/6 px-1 rounded "
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
          {postSuccess && (
            <div className="mt-2 text-green-600 text-xs">Post submitted successfully!</div>
          )}
        </div>
      </div>
      {cities.length > 0 && (
        <div className="max-h-32 overflow-y-auto p-1 text-center mb-2 ml-11 w-[45%] md:w-1/4 lg:w-1/3">
          <ul>
            {cities.map((city: any) => (
              <li
                className="border-[1px] p-2 font-semibold text-xs md:text-sm hover:bg-gray-200 cursor-pointer"
                key={city.name}
                onClick={() => handleCitySelection(city.name)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

  );
};

export default PostInput;