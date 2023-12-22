import { useState } from "react";
import ShowMovieDetails from "./ShowMovieDetails";
import Button from "./Button";
import WatchMovieCard from "./WatchMovieCard";
import WatchListSummary from "./WatchListSummary";
export default function WatchList({
  watchList,
  selectedMovieId,
  handleSetSelectedMovieId,
  handleAddMovies,
  handleRemoveMovies,
  handleRemoveSelectedMovieId,
}) {
  const [isOpen2, setIsOpen2] = useState(true);
  function handleButtonClick2() {
    setIsOpen2((open) => !open);
  }
  return (
    <div className="box">
      {selectedMovieId ? (
        <ShowMovieDetails
          selectedMovieId={selectedMovieId}
          handleAddMovies={handleAddMovies}
          handleRemoveSelectedMovieId={handleRemoveSelectedMovieId}
        />
      ) : (
        <>
          <Button onClick={handleButtonClick2}>
            {" "}
            {isOpen2 ? "➖" : "➕"}{" "}
          </Button>
          <h3>WatchList</h3>
          <WatchListSummary watchList={watchList} />
          {isOpen2 &&
            watchList.map((data) => (
              <WatchMovieCard
                data={data}
                key={data.id}
                handleSetSelectedMovieId={handleSetSelectedMovieId}
                handleRemoveMovies={handleRemoveMovies}
              />
            ))}
        </>
      )}
    </div>
  );
}
