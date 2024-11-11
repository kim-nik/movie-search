import MovieInfo from "../types/MovieInfo";

export const fetchMovies = async (): Promise<MovieInfo[]> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=pulp`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data.Search; // предположим, что фильмы находятся в поле `results`
};
