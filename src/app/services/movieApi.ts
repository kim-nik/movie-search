import { DetailedMovieInfo, MovieInfo, Rating } from "../types/MovieInfo";

const apiKey = process.env.OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

export async function fetchMoviesBySearch(query: string, page: number = 1) {
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

export async function fetchMovieById(
  movieId: string
): Promise<DetailedMovieInfo> {
  const response = await fetch(
    `${API_URL}i=${encodeURIComponent(movieId)}&plot=full`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  const data = await response.json();
  return {
    Title: data.Title,
    Year: data.Year,
    Rated: data.Rated,
    Released: data.Released,
    Runtime: data.Runtime,
    Genre: data.Genre,
    Director: data.Director,
    Writer: data.Writer,
    Actors: data.Actors,
    Plot: data.Plot,
    Language: data.Language,
    Country: data.Country,
    Awards: data.Awards,
    Poster: data.Poster,
    Ratings: data.Ratings.map((rating: Rating) => ({
      Source: rating.Source,
      Value: rating.Value,
    })),
    Metascore: data.Metascore,
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    imdbID: data.imdbID,
    Type: data.Type,
    DVD: data.DVD,
    BoxOffice: data.BoxOffice,
    Production: data.Production,
    Website: data.Website,
    Response: data.Response,
  };
}

export async function fetchMovieByIdButSafe(
  movieId: string
): Promise<DetailedMovieInfo> {
  const response = await fetch(`/api/movies?id=${encodeURIComponent(movieId)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }
  const data = await response.json();
  return {
    Title: data.Title,
    Year: data.Year,
    Rated: data.Rated,
    Released: data.Released,
    Runtime: data.Runtime,
    Genre: data.Genre,
    Director: data.Director,
    Writer: data.Writer,
    Actors: data.Actors,
    Plot: data.Plot,
    Language: data.Language,
    Country: data.Country,
    Awards: data.Awards,
    Poster: data.Poster,
    Ratings: data.Ratings.map((rating: Rating) => ({
      Source: rating.Source,
      Value: rating.Value,
    })),
    Metascore: data.Metascore,
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    imdbID: data.imdbID,
    Type: data.Type,
    DVD: data.DVD,
    BoxOffice: data.BoxOffice,
    Production: data.Production,
    Website: data.Website,
    Response: data.Response,
  };
}
