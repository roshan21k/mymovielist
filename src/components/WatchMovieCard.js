import Button from "./Button";
export default function WatchMovieCard({ data, handleRemoveMovies }) {
  const imagePath = data?.poster_path || data?.backdrop_path;
  return (
    <div className="movie-card">
      <Button onClick={() => handleRemoveMovies(data)}>❌</Button>
      <img
        src={imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : ""}
        alt="movie"
        className="poster"
      />
      <div className="movie-details">
        <h2 className="movie-text">{data?.title} </h2>
        <p className="movie-text">
          🗓️ {data?.release_date.slice(0, 4)}{" "}
          {data?.runtime
            ? " 🕒 " +
              data.runtime +
              " 🌟 " +
              Math.round(data?.vote_average * 10) / 10
            : ""}
        </p>
      </div>
    </div>
  );
}
