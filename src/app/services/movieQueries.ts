import { useQuery } from "@tanstack/react-query";

export const useSearchMovies = (searchTerm: string) => {
  const query = searchTerm.trim() === "" ? "Inception" : searchTerm;

  return useQuery({
    queryKey: ["movies", query],

    // searchMovies сюда надо по идее запихать?
    queryFn: async () => {
      const response = await fetch(
        `/api/movies?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
