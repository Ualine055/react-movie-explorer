import { useState, useEffect } from "react"

const FAVORITES_KEY = "movieFavorites"

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
