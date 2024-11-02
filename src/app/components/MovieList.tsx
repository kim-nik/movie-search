"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieInfo from "../types/MovieInfo";

interface MovieListProps {
  movies: MovieInfo[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded w-full h-[40rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))
        ) : (
          <div className="w-full flex item-center justify-items-center">
            <h2 className="w-full  flex item-center justify-items-center text-black ">
              There is no spoon
            </h2>
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
