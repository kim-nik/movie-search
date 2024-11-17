export default interface MovieInfo {
  imdbID: string | number;
  Title: string;
  Year: string;
  rating?: number;
  Poster: string;
  Type: "movie" | "series";
}
