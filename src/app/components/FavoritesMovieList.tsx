"use client";

import MovieInfo from "../types/MovieInfo";
import {
  useFavoriteMovies,
  useRemoveFromFavorites,
} from "../services/favoriteMoviesQuery";

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
    <div className="flex flex-col items-center gap-8 bg-gray-100 p-4 rounded max-w-screen-lg w-1/4">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-col gap-8 w-full">
          {favoriteMovies.map((movie, index) => (
            <div key={index} className="text-black relative">
              {movie.title}
              <button
                onClick={() => handleRemoveFromFavorites(movie)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No favorite movies added yet.</p>
      )}
    </div>
  );
};

export default FavoritesMovieList;
