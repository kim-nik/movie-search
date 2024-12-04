export interface DetailedMovieInfo {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
export type MovieInfo = Pick<
  DetailedMovieInfo,
  "imdbID" | "Title" | "Poster" | "Type" | "Year" | "Ratings"
>;
// export interface MovieInfo {
//   imdbID: string | number;
//   Title: string;
//   Year: string;
//   Ratings: Rating[];
//   Poster: string;
//   Type: "movie" | "series";
// }

export interface Rating {
  Source: string;
  Value: string;
}
