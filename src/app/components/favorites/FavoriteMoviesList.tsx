"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { DetailedMovieInfo, MovieInfo } from "../../types/MovieInfo";

import FavoriteMovieCard from "./FavoriteMovieCard";
import { fetchMovieByIdButSafe } from "@/app/services/movieApi";
import { fetchFavoriteMovieIds } from "@/app/services/favoriteMovies";

const FavoriteMoviesList: React.FC = () => {
  const { data: favoriteMoviesIds = [] } = useQuery({
    queryKey: ["favoriteMoviesIds"],
    queryFn: fetchFavoriteMovieIds,
    notifyOnChangeProps: ["data"],
  });

  const favoriteMoviesQueries = useQueries({
    queries: favoriteMoviesIds.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieByIdButSafe(id),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const favoriteMovies = favoriteMoviesQueries
    .map((query) => {
      const detailedMovie = query.data as DetailedMovieInfo | undefined;
      if (detailedMovie) {
        const movie: MovieInfo = {
          imdbID: detailedMovie.imdbID,
          Title: detailedMovie.Title,
          Year: detailedMovie.Year,
          Poster: detailedMovie.Poster,
          Type: detailedMovie.Type as "movie" | "series",
        };
        return movie;
      }
      return null;
    })
    .filter((movie): movie is MovieInfo => movie !== null);

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded w-full sm:w-1/4">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {favoriteMovies.map((movie, index) => (
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
