import MovieInfo from "../types/MovieInfo";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

export const fetchMovies = async (): Promise<MovieInfo[]> => {
  const response = await fetch(`${API_URL}s=pulp`); // TODO тестовое решение

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.Search || [];
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieInfo[]> => {
  if (!query) return [];

  const response = await fetch(
    `${API_URL}s=${encodeURIComponent(query)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.Search || [];
};
