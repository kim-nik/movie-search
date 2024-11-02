"use client";

import MovieInfo from "../types/MovieInfo";

interface MovieCardProps {
  movie: MovieInfo;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // сюда или выше?

  function addToFavoritesHandler(): void {
    console.log(`${movie.title} added to favorites`);
  }

  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="w-full h-64 object-cover p-4"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-600">Release Date: {movie.releaseDate}</p>
        <p className="text-gray-600 mb-4">Rating: {movie.rating} / 10</p>
        <button
          onClick={addToFavoritesHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
