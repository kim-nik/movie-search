import { fetchMovieById, fetchMoviesBySearch } from "@/app/services/movieApi";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const movieIds = searchParams.getAll("id");
  const query = searchParams.get("query");
  const year = searchParams.get("year");

  if (movieIds.length > 0) {
    try {
      const moviePromises = movieIds.map((id) => fetchMovieById(id));
      const movies = await Promise.all(moviePromises);
      return NextResponse.json(movies);
    } catch (error) {
      console.error("Failed to fetch movies by ids:", error);
      return NextResponse.json(
        { error: "Failed to fetch movies by ids" },
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
