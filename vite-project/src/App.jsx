import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import { useFavorites } from "./hooks/useFavorites";

function App() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Centralized toggle for all pages
  const handleToggleFavorite = (movie) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <>
      <Navbar favoritesCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

