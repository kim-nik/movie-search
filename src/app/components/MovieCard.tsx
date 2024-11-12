"use client";

import { useAddToFavorites } from "../services/favoriteMoviesQuery";
import MovieInfo from "../types/MovieInfo";

interface MovieCardProps {
  movie: MovieInfo;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // сюда или выше?
  const addToFavoritesMutation = useAddToFavorites();
  const addToFavoritesHandler = () => {
    addToFavoritesMutation.mutate(movie);
  };

  const defaultPoster = "/404.jpeg";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
      <img
        src={movie.Poster != "N/A" ? movie.Poster : defaultPoster}
        alt={`${movie.Title} poster`}
        className="w-full object-cover h-64 sm:h-80 lg:h-96"
      />
      <div className="p-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-black h-[3.5rem] line-clamp-2">
          {movie.Title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Release Date: {movie.Year}
        </p>
        <p className="text-gray-600 mb-4 text-sm sm:text-base lg:text-lg">
          Rating: {movie.rating} / 10
        </p>
        <button
          onClick={addToFavoritesHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-sm sm:text-base lg:text-lg"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};
export default MovieCard;
