import { useRef } from "react";
import { useKey } from "../useKey";

export default function SearchBar({ setSearch }) {
  const inputElement = useRef(null);

  // Custom Hook for focus Search Bar on "Enter"
  useKey("Enter", function () {
    if (inputElement.current === document.activeElement) {
      return;
    }
    inputElement.current.focus();
    inputElement.current.value = "";
    setSearch("");
  });

  let timeout;
  const handleInputChange = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };
  return (
    <div className="search-bar">
      <input
        ref={inputElement}
        type="text"
        placeholder="Search Movies..."
        onChange={handleInputChange}
      />
    </div>
  );
}
