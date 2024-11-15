export const searchMovies = async (query: string) => {
  const response = await fetch(
    `/api/movies?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};
