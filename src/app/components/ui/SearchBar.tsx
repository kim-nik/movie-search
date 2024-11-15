"use client";

import { useState } from "react";
import { useDebounce } from "react-use";

interface SearchBarProps {
  onSearch: (x: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(
    () => {
      onSearch(searchTerm);

      // router.push(`/?query=${encodeURIComponent(searchTerm)}`);
    },
    300,
    [searchTerm]
  );

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for a movie..."
      className="p-2 border border-gray-300 rounded w-full text-black"
    />
  );
};

export default SearchBar;
