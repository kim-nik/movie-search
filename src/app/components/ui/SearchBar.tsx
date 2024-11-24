"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");

  useDebounce(
    () => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("query", searchTerm);
      }
      if (year) {
        params.set("year", year);
      }
      router.push(`/?${params.toString()}`);
    },
    500,
    [searchTerm, year]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("query");
    const initialYear = urlParams.get("year");
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
    if (initialYear) {
      setYear(initialYear);
    }
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("query", searchTerm);
    }
    if (year) {
      params.set("year", year);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 items-center bg-white p-3 rounded-md shadow-md w-full ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
        className="p-2 border border-gray-300 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Any Year</option>
        {Array.from({ length: 100 }, (_, index) => {
          const yearOption = new Date().getFullYear() - index;
          return (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          );
        })}
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
