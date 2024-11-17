"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const SearchBar: React.FC = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(
    () => {
      if (searchTerm) {
        router.push(`/?query=${encodeURIComponent(searchTerm)}`);
      } else {
        router.push(`/`);
      }
    },
    300,
    [searchTerm]
  );

  useEffect(() => {
    // Устанавливаем начальное значение поисковой строки из URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("query");
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, []);

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
