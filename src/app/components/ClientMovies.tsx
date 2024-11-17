"use server";

import SearchBar from "./ui/SearchBar";
import Movies from "./Movies";
import FavoritesMovieList from "./FavoritesMovieList";
// import { useSearchParam } from "react-use";
// import { useEffect, useState } from "react";

const ClientMovies: React.FC = () => {
  // const queryParam = useSearchParam("query");
  // const [searchParams, setSearchParams] = useState(queryParam || "inception");

  // useEffect(() => {
  //   // Update the searchParams state whenever queryParam changes
  //   if (queryParam) {
  //     setSearchParams(queryParam);
  //   }
  // }, [queryParam]);
  return (
    <div className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full ">
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Movies />
        <FavoritesMovieList />
      </div>
    </div>
  );
};

export default ClientMovies;
