"use client"; //есть маааленькое подозрение что не стоит делать главную страницу клиентской, но пока у нас есть только она, оставим всё так

import { useState } from "react";
import { mockMovies } from "./api/mockMovies";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import FavoritesMovieList from "./components/Favorites/FavoritesMovieList";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = mockMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
