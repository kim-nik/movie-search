import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MovieInfo from "../types/MovieInfo";

export const fetchFavoriteMovies = async (): Promise<MovieInfo[]> => {
  const response = await new Promise<MovieInfo[]>((resolve) => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    resolve(favorites);
  });
  return response;
};

export const useFavoriteMovies = () => {
  return useQuery(["favoriteMovies"], fetchFavoriteMovies);
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (movie: MovieInfo) => {
      return new Promise<void>((resolve) => {
        const favoriteMovies = JSON.parse(
          localStorage.getItem("favoriteMovies") || "[]"
        );
        const updatedFavorites = favoriteMovies.filter(
          (favMovie: MovieInfo) => favMovie.title !== movie.title
        );
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
        resolve();
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favoriteMovies"]);
      },
    }
  );
};
