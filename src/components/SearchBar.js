export default function SearchBar({ handleSearchQuery }) {
  let timeout;
  const handleInputChange = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleSearchQuery(event.target.value);
    }, 500);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Movies..."
        onChange={handleInputChange}
      />
    </div>
  );
}
