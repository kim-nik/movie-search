"use client"; //есть маааленькое подозрение что не стоит делать главную страницу клиентской, но пока у нас есть только она, оставим всё так

import React, { useMemo, useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import FavoritesMovieList from "./components/Favorites/FavoritesMovieList";
import MovieInfo from "./types/MovieInfo";
import { useFetchMovies } from "./services/movieQueries";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies = [], isLoading, isError } = useFetchMovies();

  const filteredMovies = useMemo(() => {
    return movies.filter((movie: MovieInfo) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load movies. Please try again later.</p>;
  }

  return (
    <div className="grid justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] h-130">
      <main className="flex flex-col gap-8 items-center sm:items-start w-3/4 ">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex gap-4 w-full">
          <MovieList movies={filteredMovies} />
          <FavoritesMovieList></FavoritesMovieList>
        </div>
      </main>
    </div>
  );
}
