import { useQuery } from "@tanstack/react-query";

export const useSearchMovies = (searchTerm: string, year: string) => {
  const query = searchTerm.trim() === "" ? "Inception" : searchTerm;

  return useQuery({
    queryKey: ["movies", query, year],

    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("query", query);
      if (year) {
        params.set("year", year);
      }
      const response = await fetch(`/api/movies?${params.toString()}`);
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

export const useGetMovieById = (id: string) => {
  return useQuery({
    queryKey: ["movies", id],

    queryFn: async () => {
      const response = await fetch(`/api/movies?id=${encodeURIComponent(id)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
