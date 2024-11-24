import { fetchMovieById, fetchMoviesBySearch } from "@/app/services/movieApi";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("id");
  const query = searchParams.get("query");
  const year = searchParams.get("year");

  if (movieId) {
    try {
      const movie = await fetchMovieById(movieId);
      return NextResponse.json(movie);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
      return NextResponse.json(
        { error: "Failed to fetch movie" },
        { status: 500 }
      );
    }
  } else if (query) {
    try {
      const movies = await fetchMoviesBySearch(query, year ? year : "");
      return NextResponse.json(movies);
    } catch (error) {
      console.error("Failed to search movies:", error);
      return NextResponse.json(
        { error: "Failed to search movies" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Either 'id' or 'query' parameter is required" },
      { status: 400 }
    );
  }
}
