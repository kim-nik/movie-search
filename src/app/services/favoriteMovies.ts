import MovieInfo from "../types/MovieInfo";

export const fetchFavoriteMovies = async (): Promise<MovieInfo[]> => {
  const favorites = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
  return favorites;
};

export const addMovieToFavorites = async (movie: MovieInfo): Promise<void> => {
  return new Promise<void>((resolve) => {
    const favoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );

    // Проверяем, если фильм уже есть в избранном
    const isAlreadyFavorite = favoriteMovies.some(
      (favMovie: MovieInfo) => favMovie.Title === movie.Title
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favoriteMovies, movie];
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }

    resolve();
  });
};

export const removeMovieFromFavorites = (movie: MovieInfo): void => {
  const favoriteMovies = JSON.parse(
    localStorage.getItem("favoriteMovies") || "[]"
  );
  const updatedFavorites = favoriteMovies.filter(
    (favMovie: MovieInfo) => favMovie.Title !== movie.Title
  );
  localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
};
