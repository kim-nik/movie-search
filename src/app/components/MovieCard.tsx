"use client";

import { useAddToFavorites } from "../services/favoriteMoviesQuery";
import { MovieInfo } from "../types/MovieInfo";
import { useHover } from "react-use";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: MovieInfo;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const addToFavoritesMutation = useAddToFavorites();
  const addToFavoritesHandler = () => {
    addToFavoritesMutation.mutate(movie);
  };

  const defaultPoster = "/404.jpeg";

  // FIXME у меня большие сомнения в том, что это легальное применение hover
  const hoverable = useHover((hovered) => (
    <Link
      href={`/movie/${movie.imdbID}`}
      // FIXME без вот этого ключа почему-то появляется ошибка
      key={movie.imdbID}
      className={`bg-white shadow-md rounded-lg overflow-hidden w-full transform transition-transform duration-300 ${
        hovered ? "scale-105 shadow-lg" : ""
      }`}
    >
      <Image
        src={movie.Poster != "N/A" ? movie.Poster : defaultPoster}
        alt={`${movie.Title} poster`}
        className="w-full object-cover h-64 sm:h-80 lg:h-96"
        width={240}
        height={500}
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
    </Link>
  ));

  return hoverable;
};
export default MovieCard;
