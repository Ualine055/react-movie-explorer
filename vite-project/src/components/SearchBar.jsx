export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.input}
      />
    </div>
  )
}

const styles = {
  container: {
    width: "100%",
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1e293b",
    border: "2px solid #334155",
    borderRadius: "8px",
    color: "#e2e8f0",
    outline: "none",
    transition: "border-color 0.2s",
  },
}
