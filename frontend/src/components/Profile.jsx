import React, { useEffect, useState } from 'react';
import { auth } from '../services/firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"; 
import profileImg1 from '../assets/profile1.png'; 
import applyNow from '../assets/apply_animate.svg';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      // Replace with your MongoDB fetch logic
      const response = await fetch(`YOUR_MONGODB_API/users/${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        console.log("No user data found in MongoDB!");
      }
    } else {
      console.log("User not logged in");
      navigate('/login'); // Redirect to login if user is not authenticated
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const applyJob = () => {
    navigate('/JobApplicationForm');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex flex-col lg:flex-row justify-between w-full">
            {/* Profile Section Skeleton */}
            <div className="w-full lg:w-1/3 flex flex-col items-center border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-6 animate-pulse space-y-2">
              <div className="rounded-full bg-gray-200 h-40 w-40 mb-4"></div>
              <div className="h-6 bg-gray-200 w-24 mb-2 rounded"></div>
              <div className="h-6 bg-gray-200 w-32 mb-2 rounded"></div>
              <div className="h-6 bg-gray-200 w-24 mb-6 rounded"></div>
              <div className="h-10 bg-gray-200 w-36 rounded"></div>
            </div>

            {/* Applied Jobs Section Skeleton */}
            <div className="w-full lg:w-2/3 pl-0 lg:pl-6 pt-6 lg:pt-0">
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Your Applied Jobs</h3>
              <ul className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row w-full">
            {/* Profile Section */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <img src={profileImg1} alt="Profile" className="rounded-full w-40 h-40" />
              {userDetails ? (
                <div>
                  <p className="text-lg font-semibold">{userDetails.name}</p>
                  <p className="text-gray-600">{userDetails.email}</p>
                  <p className="text-gray-600">{userDetails.role}</p>
                </div>
              ) : (
                <p>No user data available.</p>
              )}
            </div>

            {/* Applied Jobs Section */}
            <div className="w-full lg:w-2/3 pt-6 lg:pt-0 pl-0 lg:pl-6">
              <h3 className="text-xl font-semibold mb-4">Your Applied Jobs</h3>
              {userDetails?.jobs && userDetails.jobs.length > 0 ? (
                userDetails.jobs.map((job, index) => (
                  <p key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">{job}</p>
                ))
              ) : (
                <div className='flex flex-col items-center'>
                  <img src={applyNow} className='w-80 h-80 opacity-40 hover:opacity-80 cursor-pointer' onClick={applyJob} alt="Apply Now" />
                  <p className="text-gray-600">You have not applied for any jobs yet. <span onClick={applyJob} className='cursor-pointer text-[#BB86FC]'>Apply here!!</span></p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
