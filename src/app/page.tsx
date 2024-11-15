"use client"; // FIXME есть маааленькое подозрение что не стоит делать главную страницу клиентской,
// но пока у нас есть только она, оставим всё так

import React, { useState } from "react";
import SearchBar from "./components/ui/SearchBar";
import FavoritesMovieList from "./components/favorites/FavoritesMovieList";
import { useSearchMovies } from "./services/movieQueries";
import { useRouter, useSearchParams } from "next/navigation";
import Movies from "./components/Movies";
import { useDebounce } from "react-use";

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
      router.push(`/?query=${encodeURIComponent(searchTerm)}`, {
        scroll: false,
      });
    },
    300,
    [searchTerm, router]
  );

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
          <Movies movies={movies} isLoading={isLoading} isError={isError} />
          <FavoritesMovieList />
        </div>
      </main>
    </div>
  );
}
