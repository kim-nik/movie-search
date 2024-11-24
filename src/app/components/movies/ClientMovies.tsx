import FavoriteMoviesList from "../favorites/FavoriteMoviesList";
import SearchBar from "../ui/SearchBar";
import Movies from "./Movies";

const ClientMovies: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 items-center sm:items-start w-full ">
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Movies />
        <FavoriteMoviesList />
      </div>
    </div>
  );
};

export default ClientMovies;
