import { sql } from "@vercel/postgres";

export const addFavoriteMovie = async (userId: string, movieId: string) => {
  await sql`
    INSERT INTO favorite_movies (user_id, movie_id)
    VALUES (${userId}, ${movieId})
    ON CONFLICT (user_id, movie_id) DO NOTHING
  `;
};

export const removeFavoriteMovie = async (userId: string, movieId: string) => {
  await sql`
    DELETE FROM favorite_movies
    WHERE user_id = ${userId} AND movie_id = ${movieId}
  `;
};

export const getFavoriteMovies = async (userId: string) => {
  const result = await sql`
    SELECT movie_id
    FROM favorite_movies
    WHERE user_id = ${userId}
  `;
  return result.rows.map((row) => row.movie_id);
};
