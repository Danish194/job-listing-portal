import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useTheme } from "../context/ThemeProvider";
import SearchBar from "./SearchBar";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Correct usage of useTheme
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleDashboard = () => {
    navigate("/profile");
    setProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (term) => {
    console.log("Searching for:", term);
    // Add your search functionality here, e.g., navigating to search results
    navigate(`/search?term=${term}`); // Example: navigate to a search results page
  };


  return (
    <header className="bg-gray-800 p-4 pr-12 text-white fixed w-screen z-10">
      <nav className="flex justify-between items-center">
        <div>
          <NavLink to="/" className="text-xl font-bold">
            Job Portal
          </NavLink>
        </div>

        <button
          className="lg:hidden z-10"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:space-x-4 transition-all ease-in-out duration-300`}
        >
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
                className={({ isActive }) =>
                  (isActive ? "font-bold" : "") + " block px-4 py-2"
                }
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </NavLink>
            </li>

            {!user &&
              location.pathname !== "/login" &&
              location.pathname !== "/register" ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      (isActive ? "font-bold" : "") + " block px-4 py-2"
                    }
                    aria-current={location.pathname === "/login" ? "page" : undefined}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      (isActive ? "font-bold" : "") + " block px-4 py-2"
                    }
                    aria-current={location.pathname === "/register" ? "page" : undefined}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : null}

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleDarkMode}
                className="h-9 w-9 rounded-lg p-2 hover:bg-gray-700 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <svg fill="yellow" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg fill="blue" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
            </li>

            {user && (
              <li className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="px-4 py-2 flex items-center"
                  aria-label="User Profile"
                >
                  <FaUserCircle
                    className="mr-2 w-6 h-6 hover:scale-110 "
                    size={24}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-2 mt-4 w-32 bg-slate-100 rounded-sm shadow-lg z-10 overflow-hidden hover:translate-x-0.5">
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

            {/* Search Functionality */}
            <li>
              <SearchBar onSearch={handleSearch} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
