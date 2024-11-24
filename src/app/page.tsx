import ClientMovies from "./components/movies/ClientMovies";

// FIXME а нужен ли нам тогда ClientMovies или вынести всё обратно сюда?
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;

  return <ClientMovies searchParams={search} />;
};

export default Home;
