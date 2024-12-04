import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MovieInfo } from "../types/MovieInfo";

const userId = "user123";

// export const useFavoriteMoviesIds = () => {
//   return useQuery({
//     queryKey: ["favorites", userId],
//     queryFn: async () => {
//       const response = await fetch(`/api/favorites?userId=${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch favorite movies");
//       }
//       return response.json();
//     },
//   });
// };

// export const useFavoriteMovies = (ids: string[]) => {
//   return useQueries({
//     queries: ids.map((id) => ({
//       queryKey: ["movie", id],
//       queryFn: () => fetchMovieByIdButSafe(id),
//       staleTime: 1000 * 60 * 5,
//     })),
//   });
// };

interface FavoriteMoviesResponse {
  favorites: MovieInfo[];
}

export const useFavoriteMovies = (userId = "user123") => {
  return useQuery<FavoriteMoviesResponse>({
    queryKey: ["favoriteMovies", userId],
    queryFn: async () => {
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorite movies");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (movieId: string) => {
      const response = await fetch(`/api/favorites?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie to favorites");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (movieId: string) => {
      const response = await fetch(`/api/favorites?userId=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove movie from favorites");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });
};
