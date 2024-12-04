"use client";

import { useFavoriteMovies } from "@/app/services/favoriteMoviesQuery";
import { MovieInfo } from "../../types/MovieInfo";
import FavoriteMovieCard from "./FavoriteMovieCard";

interface FavoriteMoviesListProps {
  userId: string;
}

const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = ({ userId }) => {
  const { data, isLoading, isError } = useFavoriteMovies(userId);

  if (isLoading) {
    return (
      <p className="text-gray-600 bg-white shadow-md rounded-lg overflow-hidden p-4 w-full text-center">
        Loading favorite movies...
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-gray-600 bg-white shadow-md rounded-lg overflow-hidden p-4 w-full text-center">
        Failed to load favorite movies.
      </p>
    );
  }

  const favoriteMovies = data.favorites;

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded w-full sm:w-1/4">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {favoriteMovies.map((movie: MovieInfo, index) => (
            <div
              key={`${movie.imdbID}_${index}`}
              className="text-black relative flex items-center w-full bg-white shadow-md rounded-lg overflow-hidden p-4"
            >
              <FavoriteMovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 bg-white shadow-md rounded-lg overflow-hidden p-4 w-full text-center">
          No favorite movies added yet.
        </p>
      )}
    </div>
  );
};

export default FavoriteMoviesList;
