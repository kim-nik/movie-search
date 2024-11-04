import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFavoriteMovies,
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../services/favoriteMovies";
import MovieInfo from "../types/MovieInfo";

export const useFavoriteMovies = () => {
  return useQuery({
    queryKey: ["favoriteMovies"],
    queryFn: fetchFavoriteMovies,
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MovieInfo>({
    mutationFn: async (movie: MovieInfo) => {
      return addMovieToFavorites(movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, MovieInfo>({
    mutationFn: async (movie: MovieInfo) => {
      return removeMovieFromFavorites(movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
    },
  });
};
