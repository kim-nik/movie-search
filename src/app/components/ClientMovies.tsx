"use client";

import SearchBar from "./ui/SearchBar";
import Movies from "./Movies";
import FavoritesMovieList from "./favorites/FavoritesMovieList";
import { useState } from "react";

const ClientMovies: React.FC = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full ">
      {/* <SearchBar onSearch={(e) => setSearchTerm(e)} /> */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Movies searchTerm={""} />
        <FavoritesMovieList />
      </div>
    </div>
  );
};

export default ClientMovies;
