"use server";

import MovieInfo from "../types/MovieInfo";

const apiKey = process.env.OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

export async function fetchMovies(query: string, page: number = 1) {
  if (query === "" || query === undefined) query = "Inception";
  const response = await fetch(
    `${API_URL}s=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  // Проверка, если данные найдены
  if (data.Response === "True" && data.Search) {
    return data.Search as MovieInfo[];
  }

  // Если фильмов нет, возвращаем пустой массив
  return [];
}
