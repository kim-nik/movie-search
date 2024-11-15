"use server";

const apiKey = process.env.OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await fetch(
    `${API_URL}s=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.Search || [];
};
