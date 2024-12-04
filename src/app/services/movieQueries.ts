import { useQuery } from "@tanstack/react-query";
import { MovieInfo } from "../types/MovieInfo";

const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const useGetMoviesBySearch = (searchTerm: string, year: string) => {
  const query = searchTerm.trim() === "" ? "Inception" : searchTerm;

  return useQuery<MovieInfo[]>({
    queryKey: ["movies", query, year],
    queryFn: () => getMoviesBySearch(query, year),
    staleTime: 1000 * 60 * 5,
  });
};

export const getMoviesBySearch = async (
  query: string,
  year: string
): Promise<MovieInfo[]> => {
  const params = new URLSearchParams();
  params.set("query", query);
  if (year) {
    params.set("year", year);
  }

  const response = await fetch(`${baseURL}/api/movies?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const useGetMovieById = (id: string) => {
  return useQuery({
    queryKey: ["movies", id],

    queryFn: async () => {
      const response = await fetch(
        `${baseURL}/api/movies?id=${encodeURIComponent(id)}`
      );
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
