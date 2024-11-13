import MovieInfo from "../types/MovieInfo";
import MovieList from "./MovieList";
import MoviesContainer from "./MoviesContainer";

interface MoviesProps {
  movies: MovieInfo[];
  isLoading: boolean;
  isError: boolean;
}

export default function Movies({ movies, isLoading, isError }: MoviesProps) {
  if (isLoading) {
    return <MoviesContainer>Loading...</MoviesContainer>;
  }

  if (isError) {
    return (
      <MoviesContainer>
        <div> Failed to load movies. Please try again later.</div>
      </MoviesContainer>
    );
  }
  return <MovieList movies={movies} />;
}
