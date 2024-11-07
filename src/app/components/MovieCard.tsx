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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden min-w-60">
      {/* Пока не смотрел как более стильно обращаться с картинками */}
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="w-full object-cover h-80  p-4"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-black h-[3.5rem] line-clamp-2 ">
          {movie.title}
        </h2>
        <p className="text-gray-600">Release Date: {movie.releaseDate}</p>
        <p className="text-gray-600 mb-4">Rating: {movie.rating} / 10</p>
        <button
          onClick={addToFavoritesHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
