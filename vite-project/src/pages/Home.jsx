
import { useState, useMemo } from "react"
import { useFetchMovies } from "../hooks/useFetchMovies"
import MovieCard from "../components/MovieCard"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"

export default function Home({ favorites, onToggleFavorite, isFavorite }) {
  const { movies, loading, error } = useFetchMovies()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = useMemo(() => {
    const genreSet = new Set()
    movies.forEach((movie) => {
      movie.genres?.forEach((genre) => genreSet.add(genre))
    })
    return Array.from(genreSet).sort()
  }, [movies])

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || movie.genres?.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [movies, searchTerm, selectedCategory])

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading movies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Error: {error}</div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Movies</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredMovies.length === 0 ? (
        <div style={styles.noResults}>No movies found</div>
      ) : (
        <div style={styles.grid}>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
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
  noResults: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#94a3b8",
    padding: "3rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
}
