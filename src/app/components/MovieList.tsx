"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieInfo from "../types/MovieInfo";
import MoviesContainer from "./MoviesContainer";

interface MovieListProps {
  movies: MovieInfo[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    // probably can be optimized to call less renders
    setCurrentPage(1);
  }, [movies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <MoviesContainer>
      <div className="grid gap-4 w-full sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <h2 className="text-black text-center">There is no spoon</h2>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-8 items-center justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={`${totalPages}_${index}`}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </MoviesContainer>
  );
};

export default MovieList;
