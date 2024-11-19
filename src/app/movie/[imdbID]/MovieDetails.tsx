import { DetailedMovieInfo } from "../types/MovieInfo";

interface MovieDetailsProps {
  movie: DetailedMovieInfo;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <p>Writer: {movie.Writer}</p>
      <p>Actors: {movie.Actors}</p>
      <p>Language: {movie.Language}</p>
      <p>Country: {movie.Country}</p>
      <p>Awards: {movie.Awards}</p>
      <p>Box Office: {movie.BoxOffice}</p>
      <p>IMDb Rating: {movie.imdbRating}</p>
      <p>Metascore: {movie.Metascore}</p>
      <div>
        <h3>Ratings:</h3>
        <ul>
          {movie.Ratings.map((rating, index) => (
            <li key={index}>
              {rating.Source}: {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
