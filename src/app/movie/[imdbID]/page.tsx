// import { Metadata } from "next";
import MovieDetails from "./MovieDetails";
import { fetchMovieById } from "@/app/services/movieApi";
import { DetailedMovieInfo } from "@/app/types/MovieInfo";

interface MoviePageProps {
  params: { imdbID: string };
}

// export async function generateMetadata({
//   params,
// }: MoviePageProps): Promise<Metadata> {
//   const movie = await fetchMovieById(params.imdbID);
//   return {
//     title: movie?.Title || "Movie Details",
//     description: movie?.Plot || "Details about the movie",
//   };
// }

const MoviePage = async ({ params }: MoviePageProps) => {
  const { imdbID } = await params; // Ожидаем, что params является асинхронным и нужно "развернуть" его

  let movie: DetailedMovieInfo | null = null;

  try {
    // Получаем данные о фильме по его ID
    movie = await fetchMovieById(imdbID);
  } catch (error) {
    console.error("Failed to fetch movie:", error);
  }

  if (!movie) {
    return (
      <div>
        <h2>Movie not found</h2>
      </div>
    );
  }

  return (
    <div>
      <MovieDetails movie={movie} />
    </div>
  );
};

export default MoviePage;
