import { Link } from "react-router-dom"

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const imageUrl = movie.image?.medium || "https://via.placeholder.com/210x295?text=No+Image"
  const genres = movie.genres?.slice(0, 3).join(", ") || "N/A"

  return (
    <div style={styles.card}>
      <Link to={`/movie/${movie.id}`} style={styles.imageLink}>
        <img src={imageUrl || "/placeholder.svg"} alt={movie.name} style={styles.image} />
      </Link>
      <div style={styles.content}>
        <Link to={`/movie/${movie.id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{movie.name}</h3>
        </Link>
        <p style={styles.genres}>{genres}</p>
        <div style={styles.footer}>
          <span style={styles.rating}>⭐ {movie.rating?.average || "N/A"}</span>
          <button
            onClick={() => onToggleFavorite(movie)}
            style={{
              ...styles.favoriteBtn,
              color: isFavorite ? "#ef4444" : "#64748b",
            }}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  imageLink: {
    display: "block",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  content: {
    padding: "1rem",
  },
  titleLink: {
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#e2e8f0",
  },
  genres: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    marginBottom: "0.75rem",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: "0.9rem",
    color: "#fbbf24",
  },
  favoriteBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
}
