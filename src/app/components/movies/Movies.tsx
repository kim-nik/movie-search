import { fetchMoviesBySearch } from "../../services/movieApi";
import { MovieInfo } from "../../types/MovieInfo";
import MovieList from "./MovieList";

const Movies = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let initialMovies: MovieInfo[] = [];
  const search = searchParams;

  const query = typeof search.query === "string" ? search.query : "Inception";
  const year = typeof search.year === "string" ? search.year : "";

  try {
    initialMovies = await fetchMoviesBySearch(query, year);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }

  return <MovieList initialMovies={initialMovies} />;
};

export default Movies;
