import Link from "next/link";
import Account from "../account/Account";
import styles from "./Navbar.module.css";
import SearchBar from "../searchBar/searchBar";
import axios from "axios";
import { useState } from "react";
import { UseUser, useUser } from "@auth0/nextjs-auth0/client";


const Nav = () => {
  const { user } = useUser();
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
 


  const handleSearch = async (query) => {
    console.log("hola", query);

    if (!query || query.trim() === ""|| query.length < 3) {
      console.log("La consulta de búsqueda está vacía.");
      setResults([]);
      setSearched(false);
      return;
    }

    try {
      const response = await axios(
        `http://localhost:3001/movies?search=${query}`,
      );
      console.log("respo", response);
      const data = response.data;
      console.log("pelis", data);
      if (data === "No hay Peliculas") {
        console.log("No se encontraron películas con ese nombre.");
        setResults([]);
        setSearched(true);
        
      }  else  {
        const top3Results = data.slice(0, 3);

        setResults(top3Results);
        setSearched(true);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };


  

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link href="/home">FilmFlow</Link>
        </li>

        <li>
          <SearchBar onSearch={handleSearch} />
          <div className={styles.searchResultsContainer}>
            <ul className={styles.movieList}>
              {results.map((result, index) => (
                <li key={index}>
                  <div className={styles.card}>
                    <div>{result.name}</div>
                    <div>
                      <img
                        src={result.poster}
                        alt={result.name}
                        className={styles.searchbar__image}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {searched && results.length === 0 && (
            <p>No se encontraron películas con ese nombre.</p>
          )}

        </li>
        

        <li>
          <Account />
          {user ? (
            <a href="/api/auth/logout">
              <button>Logout</button>
            </a>
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
