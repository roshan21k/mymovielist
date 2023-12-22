import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import MovieBox from "./components/MovieBox";
import WatchList from "./components/WatchList";
export default function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(
    function () {
      async function searchMovies() {
        try {
          setIsLoading(true);
          const url = `${baseUrl}/search/movie?api_key=${API_KEY}&query=${search}`;
          const res = await fetch(url);
          const data = await res.json();
          setMovies(data.results);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      if (search.length === 0) {
        setMovies([]);
      }
      search && searchMovies();
    },
    [search, API_KEY]
  );

  function handleSetSelectedMovieId(movieId) {
    setSelectedMovieId((curr) => (curr === movieId ? null : movieId));
  }
  function handleRemoveSelectedMovieId() {
    setSelectedMovieId(null);
  }
  function handleAddMovies(movie) {
    const isDuplicate = watchList.some((item) => item.id === movie.id);
    if (!isDuplicate) {
      setWatchList((curr) => [...curr, movie]);
    }
    handleSetSelectedMovieId(movie.id);
  }
  function handleRemoveMovies(movie) {
    setWatchList((curr) => curr.filter((item) => item.id !== movie.id));
  }
  function handleSearchQuery(query) {
    setSearch(query);
  }
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar handleSearchQuery={handleSearchQuery} />
        <NumResults length={movies?.length} />
      </NavBar>

      <MainContent
        box1={
          <MovieBox
            movies={movies}
            isLoading={isLoading}
            handleSetSelectedMovieId={handleSetSelectedMovieId}
          />
        }
        box2={
          <WatchList
            watchList={watchList}
            selectedMovieId={selectedMovieId}
            handleSetSelectedMovieId={handleSetSelectedMovieId}
            handleRemoveSelectedMovieId={handleRemoveSelectedMovieId}
            handleAddMovies={handleAddMovies}
            handleRemoveMovies={handleRemoveMovies}
          />
        }
      />
    </>
  );
}
