import {
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
} from "@/app/services/db";
import { fetchMovieById } from "@/app/services/movieApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Step 1: Get list of favorite movie IDs
    const favoriteMovieIds = await getFavoriteMovies(userId);

    if (favoriteMovieIds.length === 0) {
      return NextResponse.json({ favorites: [] });
    }

    // Step 2: Fetch detailed information for each movie ID
    const moviePromises = favoriteMovieIds.map((id) => fetchMovieById(id));
    const favoriteMovies = await Promise.all(moviePromises);

    // Step 3: Return detailed information about the favorite movies
    return NextResponse.json({ favorites: favoriteMovies });
  } catch (error) {
    console.error("Failed to fetch favorite movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const { movieId } = await request.json();

  if (!userId || !movieId) {
    return NextResponse.json(
      { error: "User ID and Movie ID are required" },
      { status: 400 }
    );
  }

  try {
    await addFavoriteMovie(userId, movieId);
    return NextResponse.json({ message: "Movie added to favorites" });
  } catch (error) {
    console.error("Failed to add movie to favorites:", error);
    return NextResponse.json(
      { error: "Failed to add movie to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const { movieId } = await request.json();

  if (!userId || !movieId) {
    return NextResponse.json(
      { error: "User ID and Movie ID are required" },
      { status: 400 }
    );
  }

  try {
    await removeFavoriteMovie(userId, movieId);
    return NextResponse.json({ message: "Movie removed from favorites" });
  } catch (error) {
    console.error("Failed to remove movie from favorites:", error);
    return NextResponse.json(
      { error: "Failed to remove movie from favorites" },
      { status: 500 }
    );
  }
}
