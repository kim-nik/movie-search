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
  return useQuery({
    initialData: [],
    queryFn: fetchFavoriteMovies,
    queryKey: ["favoriteMovies"],
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, MovieInfo>({
    mutationFn: async (movie: MovieInfo) => {
      const favoriteMovies = JSON.parse(
        localStorage.getItem("favoriteMovies") || "[]"
      );
      const updatedFavorites = favoriteMovies.filter(
        (favMovie: MovieInfo) => favMovie.Title !== movie.Title
      );
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteMovies"] });
    },
  });
};
