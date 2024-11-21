"use client";

import { MovieInfo } from "../../types/MovieInfo";
import {
  useFavoriteMovies,
  useRemoveFromFavorites,
} from "../../services/favoriteMoviesQuery";
import FavoriteMovieCard from "./FavoriteMovieCard";

const FavoritesMovieList: React.FC = () => {
  const { data: favoriteMovies = [] } = useFavoriteMovies();
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  const handleRemoveFromFavorites = (movie: MovieInfo) => {
    removeFromFavoritesMutation.mutate(movie);
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded w-full sm:w-1/4">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {favoriteMovies.map((movie, index) => (
            <div
              key={`${movie.imdbID}_${index}`}
              className="text-black relative flex items-center w-full bg-white shadow-md rounded-lg overflow-hidden p-4"
            >
              <FavoriteMovieCard imdbID={movie.imdbID as string} />
              <button
                onClick={() => handleRemoveFromFavorites(movie)}
                className="ml-4 bg-red-500 text-white rounded-full p-2 text-xs sm:text-sm"
              >
                Remove
              </button>
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

export default FavoritesMovieList;
