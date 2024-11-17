// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const apiKey = process.env.OMDB_API_KEY;
// const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get("query") || "Inception";
//   const page = searchParams.get("page") || "1";

//   if (!query) {
//     return NextResponse.json(
//       { error: "Query parameter is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const response = await fetch(
//       `${API_URL}s=${encodeURIComponent(query)}&page=${page}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch movies");
//     }

//     const data = await response.json();
//     return NextResponse.json(data.Search || []);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
