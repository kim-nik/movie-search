import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieApi";

export const useFetchMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // Кэширование на 5 минут
    refetchOnWindowFocus: false,
  });
};
