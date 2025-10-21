import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useFavorites } from "./hooks/useFavorites"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Favorites from "./pages/Favorites"

function App() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Router>
      <Navbar favoritesCount={favorites.length} />
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} isFavorite={isFavorite} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} onToggleFavorite={handleToggleFavorite} isFavorite={isFavorite} />}
        />
      </Routes>
    </Router>
  )
}

export default App
