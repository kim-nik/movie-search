"use server";

import { fetchMovies } from "../services/movieApi";
import MovieInfo from "../types/MovieInfo";
// import { searchMovies } from "../services/movieApi";
import MovieList from "./MovieList";
// import MoviesContainer from "./MoviesContainer";

// export const dynamic = "force-dynamic";

// interface MoviesProps {
//   searchParams: string;
// }

const Movies = async () => {
  const query = "inception"; // Значение по умолчанию, можно также использовать другой механизм для получения из параметров
  let initialMovies: MovieInfo[] = [];
  try {
    initialMovies = await fetchMovies(query);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
  // const movies = searchMovies(searchParams);

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
  return <MovieList initialMovies={initialMovies} initialQuery={query} />;
};

export default Movies;
