"use server";

import { fetchMoviesBySearch } from "../services/movieApi";
import { MovieInfo } from "../types/MovieInfo";
import MovieList from "./MovieList";

const Movies = async () => {
  const query = "inception"; // Значение по умолчанию, можно также использовать другой механизм для получения из параметров
  let initialMovies: MovieInfo[] = [];
  try {
    initialMovies = await fetchMoviesBySearch(query);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }

  return <MovieList initialMovies={initialMovies} initialQuery={query} />;
};

export default Movies;
