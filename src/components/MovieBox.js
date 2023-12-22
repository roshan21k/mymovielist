import { useState } from "react";
import InfoMessage from "./InfoMessage";
import Button from "./Button";
import MovieCard from "./MovieCard";
export default function MovieBox({
  movies,
  handleSetSelectedMovieId,
  isLoading,
}) {
  const [isOpen, setIsOpen] = useState(true);
  function handleButtonClick() {
    setIsOpen((open) => !open);
  }
  return (
    <div className="box movies">
      <Button onClick={handleButtonClick}>{isOpen ? "➖" : "➕"} </Button>
      <h3>Movies</h3>
      {isLoading ? (
        <InfoMessage>Loading...</InfoMessage>
      ) : isOpen && movies?.length === 0 ? (
        <InfoMessage> No Results Found </InfoMessage>
      ) : (
        movies?.map((data) => (
          <MovieCard
            data={data}
            key={data.id}
            handleSetSelectedMovieId={handleSetSelectedMovieId}
          />
        ))
      )}
    </div>
  );
}
