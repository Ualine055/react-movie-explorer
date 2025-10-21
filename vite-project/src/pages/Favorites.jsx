import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function Favorites({ favorites, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>My Favorites</h1>
        <div style={styles.empty}>
          <p style={styles.emptyText}>You have 0 favorite movies</p>
          <Link to="/" style={styles.browseLink}>
            Browse Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Favorites ({favorites.length})</h1>

      <div style={styles.grid}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#e2e8f0",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 2rem",
  },
  emptyText: {
    fontSize: "1.2rem",
    color: "#94a3b8",
    marginBottom: "1.5rem",
  },
  browseLink: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#60a5fa",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "opacity 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
}
