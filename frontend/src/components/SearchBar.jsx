import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility of the search bar

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
      setSearchTerm(""); // Clear the input field after search
      setIsVisible(false); // Hide the search bar after search
    }
  };

  const toggleSearchVisibility = () => {
    setIsVisible(!isVisible); // Toggle the visibility of the search bar
  };

  return (
    <div>
      <button onClick={toggleSearchVisibility} className="text-white">
        {isVisible ? "Close Search" : "Search"}
      </button>
      
      {isVisible && (
        <form onSubmit={handleSearch} className="flex items-center text-black mt-2">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-l-md"
          />
          <button type="submit" className="bg-[#27debf] text-white px-4 py-2 rounded-r-md">
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
