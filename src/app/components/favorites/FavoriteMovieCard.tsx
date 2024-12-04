import { useRemoveFromFavorites } from "@/app/services/favoriteMoviesQuery";
import { MovieInfo } from "@/app/types/MovieInfo";

interface FavriteMoviesCardProps {
  movie: MovieInfo;
}

const FavriteMoviesCard: React.FC<FavriteMoviesCardProps> = ({ movie }) => {
  const removeFromFavoritesMutation = useRemoveFromFavorites();
  const handleRemoveFromFavorites = (movie: MovieInfo) => {
    removeFromFavoritesMutation.mutate(movie.imdbID as string);
  };
  return (
    <div>
      {movie.Title}

      <button
        onClick={() => handleRemoveFromFavorites(movie)}
        className="ml-4 bg-red-500 text-white rounded-full p-2 text-xs sm:text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default FavriteMoviesCard;
