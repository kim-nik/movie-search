"use client";

import MovieInfo from "../../types/MovieInfo";
import {
  useFavoriteMovies,
  useRemoveFromFavorites,
} from "../../services/favoriteMoviesQuery";

const FavoritesMovieList: React.FC = () => {
  const { data: favoriteMovies = [], isLoading } = useFavoriteMovies();
  const removeFromFavoritesMutation = useRemoveFromFavorites();

  const handleRemoveFromFavorites = (movie: MovieInfo) => {
    removeFromFavoritesMutation.mutate(movie);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded max-w-screen-lg w-1/4 min-w-60">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {favoriteMovies.map((movie, index) => (
            <div
              key={index}
              className="text-black relative flex items-center w-full bg-white shadow-md rounded-lg overflow-hidden p-2"
            >
              <p className="w-full">{movie.Title}</p>
              <button
                onClick={() => handleRemoveFromFavorites(movie)}
                className=" w-1/4 bg-red-500 text-white rounded-full p-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 bg-white shadow-md rounded-lg overflow-hidden p-2 w-full">
          No favorite movies added yet.
        </p>
      )}
    </div>
  );
};

export default FavoritesMovieList;
