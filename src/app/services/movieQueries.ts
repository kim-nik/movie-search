import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieApi";

// export const useFetchMovies = () => {
//   return useQuery({
//     queryKey: ["movies"],
//     queryFn: fetchMovies,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//   });
// };

export const useSearchMovies = (searchTerm: string) => {
  const query = searchTerm.trim() === "" ? "Inception" : searchTerm;

  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // кэширование на 5 минут
    refetchOnWindowFocus: false,
  });
};
