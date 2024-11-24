import { MovieInfo } from "../../types/MovieInfo";
import Image from "next/image";
import Link from "next/link";
import { useAddIdToFavorites } from "@/app/services/favoriteMoviesQuery";
import { useState } from "react";

interface MovieCardProps {
  movie: MovieInfo;
  onAddToFav: () => void;
}

// FIXME я тут убрал реакт юз из-за глюков и общей странности имплементации

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const addToFavoritesMutation = useAddIdToFavorites();

  const addToFavoritesHandler = () => {
    addToFavoritesMutation.mutate(movie);
  };

  const defaultPoster = "/404.jpeg";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white shadow-md rounded-lg overflow-hidden w-full transform transition-transform duration-300 ${
        hovered ? "scale-105 shadow-lg" : ""
      }`}
    >
      <Link
        href={`/movie/${movie.imdbID}`}
        key={movie.imdbID}
        className="block"
      >
        <Image
          src={movie.Poster !== "N/A" ? movie.Poster : defaultPoster}
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
        </div>
      </Link>
      <button
        onClick={(event) => {
          event.stopPropagation(); // Останавливаем распространение события
          addToFavoritesHandler();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-sm sm:text-base lg:text-lg"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default MovieCard;
