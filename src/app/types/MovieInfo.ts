export default interface MovieInfo {
  Title: string;
  Year: string;
  rating?: number;
  Poster: string;
  Type: "movie" | "series";
}
