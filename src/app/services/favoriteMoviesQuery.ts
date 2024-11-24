import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MovieInfo } from "../types/MovieInfo";
import {
  addMovieIdToFavorites,
  fetchFavoriteMovieIds,
  removeMovieIdFromFavorites,
} from "./favoriteMovies";

export const useFavoriteMoviesIds = () => {
  return useQuery({
    queryKey: ["favoriteMoviesIds"],
    queryFn: fetchFavoriteMovieIds,
  });
};

export const useAddIdToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MovieInfo>({
    mutationFn: async (movie: MovieInfo) => {
      return addMovieIdToFavorites(movie.imdbID as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
    },
  });
};

export const useRemoveIdFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, MovieInfo>({
    mutationFn: async (movie: MovieInfo) => {
      return removeMovieIdFromFavorites(movie.imdbID as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
    },
  });
};
