import React, { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import profileImg1 from '../assets/profile1.png'; 
import applyNow from '../assets/apply_animate.svg';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User not logged in");
      }
      setLoading(false);
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const applyJob = () => {
    navigate('/JobApplicationForm');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] py-12">
        <div className="w-full max-w-4xl bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex flex-col lg:flex-row justify-between w-full">
              {/* Profile Section Skeleton */}
              <div className="w-full lg:w-1/3 flex flex-col items-center border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-6 animate-pulse space-y-2">
                <div className="rounded-full bg-gray-200 dark:bg-gray-500 h-40 w-40 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-500 w-24 mb-2 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-500 w-32 mb-2 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-500 w-24 mb-6 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-500 w-36 rounded"></div>
              </div>

              {/* Applied Jobs Section Skeleton */}
              <div className="w-full lg:w-2/3 pl-0 lg:pl-6 pt-6 lg:pt-0">
                <h3 className="text-xl font-semibold text-gray-300 mb-4 dark:text-gray-400">Your Applied Jobs</h3>
                <ul className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-500  rounded-lg shadow-md animate-pulse space-y-2"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 rounded w-1/2"></div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row w-full">
              {/* Profile Section */}
              <div className="w-full lg:w-1/3 flex flex-col lg:flex-col items-center lg:items-center border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-6">
                {/* Mobile Layout: Profile Picture Left, Text Right */}
                <div className="flex flex-row items-center w-full lg:flex-col lg:items-center space-x-4 lg:space-x-0 mb-4">
                  <img src={profileImg1} alt="Profile" className="rounded-full w-20 h-20 lg:w-40 lg:h-40" />
                  <div className="flex flex-col">
                    <p className="text-lg text-gray-700 dark:text-white font-semibold">{userDetails.name}</p>
                    <p className="text-gray-600 dark:text-gray-300">{userDetails.email}</p>
                    <p className="text-gray-600 dark:text-gray-300">{userDetails.role}</p>
                  </div>
                </div>
              </div>

              {/* Applied Jobs Section */}
              <div className="w-full lg:w-2/3 pt-6 lg:pt-0 pl-0 lg:pl-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Applied Jobs</h3>
                <ul className="space-y-4">
                  {userDetails.jobs && userDetails.jobs.length > 0 ? (
                    userDetails.jobs.map((job, index) => (
                      <li key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{job}</p>
                      </li>
                    ))
                  ) : (
                    <div className='flex flex-col items-center'>
                      <img src={applyNow} className='w-80 h-80 opacity-40 hover:opacity-80 transition duration-300 cursor-pointer' onClick={applyJob} alt="Apply Now" />
                      <p className="text-gray-600 dark:text-gray-300">You have not applied for any jobs yet. <span onClick={applyJob} className='cursor-pointer text-[#BB86FC]'>Apply here!!</span></p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;