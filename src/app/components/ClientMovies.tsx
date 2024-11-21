import SearchBar from "./ui/SearchBar";
import Movies from "./Movies";
import FavoritesMovieList from "./favorites/FavoriteMoviesList";

const ClientMovies: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full ">
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Movies />
        <FavoritesMovieList />
      </div>
    </div>
  );
};

export default ClientMovies;
