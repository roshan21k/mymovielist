export default function WatchListSummary({ watchList }) {
  const total_movies = watchList.length;
  const total_time = watchList.reduce(
    (acc, movie) => acc + (movie.runtime || 0),
    0
  );
  const hours = Math.floor(total_time / 60);
  const minutes = total_time % 60;
  return (
    <div className="summary left">
      <br />
      <p>
        🎥 {total_movies} Movies ⌛{hours ? hours + "h " : ""}
        {minutes}min
      </p>
    </div>
  );
}
