import { DetailedMovieInfo } from "@/app/types/MovieInfo";
import Image from "next/image";

interface MovieDetailsProps {
  movie: DetailedMovieInfo;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="movie-details max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{movie.Title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className="w-full object-cover md:w-1/3 rounded-lg shadow-md"
          height={700}
          width={500}
        />
        <div className="flex-1">
          <p className="mb-4 text-gray-600">{movie.Plot}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm text-gray-700">
              Year: <span className="font-semibold">{movie.Year}</span>
            </p>
            <p className="text-sm text-gray-700">
              Genre: <span className="font-semibold">{movie.Genre}</span>
            </p>
            <p className="text-sm text-gray-700">
              Director: <span className="font-semibold">{movie.Director}</span>
            </p>
            <p className="text-sm text-gray-700">
              Writer: <span className="font-semibold">{movie.Writer}</span>
            </p>
            <p className="text-sm text-gray-700">
              Actors: <span className="font-semibold">{movie.Actors}</span>
            </p>
            <p className="text-sm text-gray-700">
              Language: <span className="font-semibold">{movie.Language}</span>
            </p>
            <p className="text-sm text-gray-700">
              Country: <span className="font-semibold">{movie.Country}</span>
            </p>
            <p className="text-sm text-gray-700">
              Awards: <span className="font-semibold">{movie.Awards}</span>
            </p>
            <p className="text-sm text-gray-700">
              Box Office:{" "}
              <span className="font-semibold">{movie.BoxOffice}</span>
            </p>
            <p className="text-sm text-gray-700">
              IMDb Rating:{" "}
              <span className="font-semibold">{movie.imdbRating}</span>
            </p>
            <p className="text-sm text-gray-700">
              Metascore:{" "}
              <span className="font-semibold">{movie.Metascore}</span>
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Ratings:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {movie.Ratings.map((rating, index) => (
                <li key={index} className="mb-1">
                  {rating.Source}:{" "}
                  <span className="font-semibold">{rating.Value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
