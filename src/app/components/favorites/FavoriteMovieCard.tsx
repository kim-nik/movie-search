interface FavriteMoviesCardProps {
  imdbID: string;
}

const FavriteMoviesCard: React.FC<FavriteMoviesCardProps> = ({ imdbID }) => {
  return <div>{imdbID}</div>;
};

export default FavriteMoviesCard;
