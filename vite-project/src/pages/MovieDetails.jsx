
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchMovieById } from "../utils/apii"

export default function MovieDetails({ isFavorite, onToggleFavorite }) {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true)
        const data = await fetchMovieById(id)
        setMovie(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading movie details...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error || "Movie not found"}</div>
        <Link to="/" style={styles.backLink}>
          ← Back to Home
        </Link>
      </div>
    )
  }

  const imageUrl = movie.image?.original || "https://via.placeholder.com/500x700?text=No+Image"
  const genres = movie.genres?.join(", ") || "N/A"
  const summary = movie.summary?.replace(/<[^>]*>/g, "") || "No summary available"

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        ← Back to Home
      </Link>

      <div style={styles.content}>
        <img src={imageUrl || "/placeholder.svg"} alt={movie.name} style={styles.image} />

        <div style={styles.details}>
          <h1 style={styles.title}>{movie.name}</h1>

          <div style={styles.meta}>
            <span style={styles.rating}>⭐ {movie.rating?.average || "N/A"}</span>
            <span style={styles.genres}>{genres}</span>
          </div>

          <button
            onClick={() => onToggleFavorite(movie)}
            style={{
              ...styles.favoriteBtn,
              backgroundColor: isFavorite(movie.id) ? "#ef4444" : "#334155",
            }}
          >
            {isFavorite(movie.id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <div style={styles.info}>
            <div style={styles.infoItem}>
              <strong>Status:</strong> {movie.status || "N/A"}
            </div>
            <div style={styles.infoItem}>
              <strong>Premiered:</strong> {movie.premiered || "N/A"}
            </div>
            <div style={styles.infoItem}>
              <strong>Language:</strong> {movie.language || "N/A"}
            </div>
            {movie.network && (
              <div style={styles.infoItem}>
                <strong>Network:</strong> {movie.network.name}
              </div>
            )}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Summary</h2>
            <p style={styles.summaryText}>{summary}</p>
          </div>
        </div>
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
  backLink: {
    display: "inline-block",
    color: "#60a5fa",
    textDecoration: "none",
    marginBottom: "2rem",
    fontSize: "1rem",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#94a3b8",
    padding: "3rem",
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#ef4444",
    padding: "3rem",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "2rem",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "gray",
  },
  meta: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  rating: {
    fontSize: "1.2rem",
    color: "#fbbf24",
  },
  genres: {
    fontSize: "1rem",
    color: "#94a3b8",
  },
  favoriteBtn: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
    transition: "opacity 0.2s",
    width: "fit-content",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#1e293b",
    borderRadius: "8px",
  },
  infoItem: {
    fontSize: "1rem",
    color: "#e2e8f0",
  },
  summary: {
    marginTop: "1rem",
  },
  summaryTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "blue",
  },
  summaryText: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "black",
  },
}
