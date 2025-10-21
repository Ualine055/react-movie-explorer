export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div style={styles.container}>
      <label style={styles.label}>Filter by Genre:</label>
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} style={styles.select}>
        <option value="">All Genres</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

const styles = {
  container: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#94a3b8",
  },
  select: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1e293b",
    border: "2px solid #334155",
    borderRadius: "8px",
    color: "#e2e8f0",
    outline: "none",
    cursor: "pointer",
  },
}
