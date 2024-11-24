import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center gap-8">
        <Link
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          OMDb
        </Link>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/favorites" className="hover:underline">
          Favorites
        </Link>
      </div>
    </header>
  );
};

export default Header;
