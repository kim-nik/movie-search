import { getMoviesBySearch } from "@/app/services/movieQueries";
import MovieList from "./MovieList";

const Movies = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query =
    typeof searchParams.query === "string" ? searchParams.query : "Inception";
  const year = typeof searchParams.year === "string" ? searchParams.year : "";

  const initialMovies = await getMoviesBySearch(query, year);
  return <MovieList initialMovies={initialMovies} />;
};

export default Movies;
