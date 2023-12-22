import { useEffect, useState } from "react";
import Button from "./Button";
const API_KEY = process.env.REACT_APP_API_KEY;
export default function ShowMovieDetails({
  selectedMovieId,
  handleAddMovies,
  handleRemoveSelectedMovieId,
}) {
  const [selected, setSelected] = useState(null);
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleRemoveSelectedMovieId();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handleRemoveSelectedMovieId]
  );
  useEffect(
    function () {
      document.title = selected?.title;
      return function () {
        document.title = "My Movie List";
      };
    },
    [selected]
  );
  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setSelected(data);
      }
      getMovieDetails();
    },
    [selectedMovieId]
  );
  const imagePath = selected?.backdrop_path || selected?.poster_path;
  return (
    <div className="show-movie-detail">
      <Button onClick={() => handleRemoveSelectedMovieId()}>❌</Button>
      <img
        src={imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : ""}
        alt="poster"
        className="poster-detail"
      />
      <div>
        <h1 className="movie-text">
          {selected?.title} ({selected?.release_date.slice(0, 4)})
        </h1>
        <em>
          {" 🙊 " +
            selected?.original_language +
            " ⌛ " +
            selected?.runtime +
            " min" +
            " 🌟 " +
            Math.round(selected?.vote_average * 10) / 10}
        </em>
        <div className="genres">
          {selected?.genres?.slice(0, 3).map((curr) => (
            <li key={curr.id}>{"⭕ " + curr.name}</li>
          ))}
        </div>
      </div>
      <br />
      <p className="left">{selected?.overview} </p>
      <button
        className="btn watchlist"
        onClick={() => handleAddMovies(selected)}
      >
        Add to WatchList
      </button>
    </div>
  );
}
