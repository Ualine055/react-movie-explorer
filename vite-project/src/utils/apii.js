const API_BASE_URL = "https://api.tvmaze.com"

export const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`)
    if (!response.ok) throw new Error("Failed to fetch movies")
    return await response.json()
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw error
  }
}

export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows/${id}`)
    if (!response.ok) throw new Error("Failed to fetch movie details")
    return await response.json()
  } catch (error) {
    console.error("Error fetching movie details:", error)
    throw error
  }
}
