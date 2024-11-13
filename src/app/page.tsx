"use client"; // FIXME есть маааленькое подозрение что не стоит делать главную страницу клиентской,
// но пока у нас есть только она, оставим всё так

import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import FavoritesMovieList from "./components/Favorites/FavoritesMovieList";
import { useSearchMovies } from "./services/movieQueries";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // FIXME я это писал до того, как заглянул в react-use, вероятно стоит заменить?
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
      router.replace(`/?query=${encodeURIComponent(searchTerm)}`, {
        scroll: false,
      });
    }, 300);

    handler();
    return () => {
      handler.cancel();
    };
  }, [searchTerm, router]);

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useSearchMovies(debouncedSearchTerm);

  return (
    <div className="grid justify-items-center min-h-screen p-4 sm:p-8 pb-20 font-[family-name:var(--font-geist-sans)] h-130">
      <main className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full xl:w-3/4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* FIXME Как бы этот блок с выводом состояния загрузки улучшить, разнести по элементам */}
          {isLoading ? (
            <p className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded w-full sm:w-3/4 h-full text-black">
              Loading...
            </p>
          ) : isError ? (
            <p className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded w-full sm:w-3/4 h-full text-black">
              Failed to load movies. Please try again later.
            </p>
          ) : (
            <MovieList movies={movies} />
          )}
          <FavoritesMovieList />
        </div>
      </main>
    </div>
  );
}
