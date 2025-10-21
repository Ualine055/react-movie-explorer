import { Link } from "react-router-dom"

export default function Navbar({ favoritesCount }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🎬 Movie Explorer
        </Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/favorites" style={styles.link}>
            Favorites ({favoritesCount})
          </Link>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: "#1e293b",
    padding: "1rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#60a5fa",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.2s",
  },
}
