export const fetchFavoriteMovieIds = async (): Promise<string[]> => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem("favoriteMoviesIds") || "[]"
  );
  return favorites;
};

export const addMovieIdToFavorites = async (movieId: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    const favoriteMovieIds = JSON.parse(
      localStorage.getItem("favoriteMoviesIds") || "[]"
    );

    if (!favoriteMovieIds.includes(movieId)) {
      const updatedFavorites = [...favoriteMovieIds, movieId];
      localStorage.setItem(
        "favoriteMoviesIds",
        JSON.stringify(updatedFavorites)
      );
    }

    resolve();
  });
};

export const removeMovieIdFromFavorites = (movieId: string): void => {
  const favoriteMovieIds = JSON.parse(
    localStorage.getItem("favoriteMoviesIds") || "[]"
  );
  const updatedFavorites = favoriteMovieIds.filter(
    (id: string) => id !== movieId
  );
  localStorage.setItem("favoriteMoviesIds", JSON.stringify(updatedFavorites));
};
