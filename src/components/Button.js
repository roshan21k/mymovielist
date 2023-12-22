export default function Button({ children, onClick }) {
  return (
    <button className="remove-button" onClick={onClick}>
      {children}
    </button>
  );
}
