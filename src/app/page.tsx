import ClientMovies from "./components/ClientMovies";

const Home = async () => {
  return (
    <div className="grid justify-items-center min-h-screen p-4 sm:p-8 pb-20 font-[family-name:var(--font-geist-sans)] h-130">
      <main className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full xl:w-3/4">
        <ClientMovies />
      </main>
    </div>
  );
};

export default Home;
