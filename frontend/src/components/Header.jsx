import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Icons for mobile menu and profile
import { onAuthStateChanged, signOut } from "firebase/auth"; // Firebase functions for auth
import { auth } from "../services/firebase"; // Firebase authentication service

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to track authenticated user
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the authenticated user
    });

    // Cleanup on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle the profile menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleDashboard = () => {
    navigate('profile')
  };


  // Handle logout functionality
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Clear the user state after logging out
    setMobileMenuOpen(false); // Close the mobile menu after logout
    navigate('/'); // Redirect to home page
  };

  return (
    <header className="bg-gray-800 p-4 pr-12 text-white fixed w-screen z-10">
      <nav className="flex justify-between items-center">
        <div>
          <NavLink to="/" className="text-xl font-bold">
            Job Portal
          </NavLink>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-10"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? null : <FaBars size={24} />}
        </button>

        {/* Navigation Links - hidden on mobile unless toggled */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} w-full lg:w-auto lg:flex lg:space-x-4 transition-all ease-in-out duration-300`}
        >
          {/* Close icon for mobile view */}
          {isMobileMenuOpen && (
            <button
              className="absolute top-4 right-4"
              onClick={toggleMobileMenu}
              aria-label="Close Navigation"
            >
              <FaTimes size={24} />
            </button>
          )}

          <ul className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "font-bold" : "") + " block px-4 py-2"}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#about"
                className={({ isActive }) => (isActive ? "font-normal" : "") + " block px-4 py-2"}
                aria-current={location.pathname === "#about" ? "page" : undefined}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "font-bold" : "") + " block px-4 py-2"}
                aria-current={location.pathname === "/contact" ? "page" : undefined}
              >
                Contact Us
              </NavLink>
            </li>

            {/* Conditionally render Login/Register or Profile/Logout based on authentication status */}
            {!user && location.pathname !== "/login" && location.pathname !== "/register" ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "font-bold" : "") + " block px-4 py-2"}
                    aria-current={location.pathname === "/login" ? "page" : undefined}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "font-bold" : "") + " block px-4 py-2"}
                    aria-current={location.pathname === "/register" ? "page" : undefined}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : null}


            <li>

              <div className="flex justify-center items-center dark:bg-nav">
                <button
                  onClick={toggleDarkMode}
                  className="h-9 w-9 rounded-lg p-2 hover:bg-gray-700 dark:hover:bg-gray-700"
                >
                  <svg className={`${darkMode ? 'hidden' : 'block'} fill-violet-700`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>

                  {/* Sun icon for dark mode */}
                  <svg className={`${darkMode ? 'block' : 'hidden'} fill-yellow-500`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            {user && (
              <li className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="px-4 py-2 flex items-center"
                  aria-label="User Profile"
                >
                  <FaUserCircle className="mr-2 w-6 h-6 hover:scale-110 " size={24} />
                </button>

                {/* Profile Menu Dropdown */}
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-2 mt-4 w-32 bg-slate-100 rounded-sm shadow-lg z-10 overflow-hidden hover:translate-x-0.5"
                  >
                    <button
                      onClick={handleDashboard}
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}

          </ul>
        </div>
      </nav>
    </header>
  );
};





export default Header;
