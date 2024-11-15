"use server";

import { searchMovies } from "../services/movieApi";
import MovieList from "./MovieList";
// import MoviesContainer from "./MoviesContainer";

interface MoviesProps {
  searchTerm: string;
}

export default async function Movies({ searchTerm }: MoviesProps) {
  const movies = await searchMovies(searchTerm);

  // if (isLoading) {
  //   return <MoviesContainer>Loading...</MoviesContainer>;
  // }

  // if (isError) {
  //   return (
  //     <MoviesContainer>
  //       <div> Failed to load movies. Please try again later.</div>
  //     </MoviesContainer>
  //   );
  // }
  return <MovieList movies={movies} />;
}
