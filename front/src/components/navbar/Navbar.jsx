import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import styles from './Navbar.module.scss'
import logoimg from '../../img/logo-white-expanded.png';
import userpic from '../../img/userpic.png'
import cart from '../../img/shopping-cart.png'
import SearchBar from '../searchBar/searchBar';
import { UseUser, useUser } from '@auth0/nextjs-auth0/client'
import Button from '../../components/button/Button'
import { useRouter } from 'next/navigation';

const Nav = (props)=> {

    const {data} = props;
    const {user} = useUser();
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);
    const [quickSearch, setQuickSearch] = useState([])
    const [search,setSearch] = useState(false);

    const handleAccountClick = () => {
      setShowDropdown(!showDropdown);
    };

    const handleSearch = async (query) => {
      
  
      if (!query || query.trim() === "" || query.length < 3) {
        console.log("La consulta de búsqueda está vacía.");
        setQuickSearch([]);
        setSearch(false);
        return;
      }
  
      try {
        const response = await axios(
         ` http://localhost:3001/movies?search=${query}`,
        );
        
        const data = response.data;
        
        if (data === "No hay Peliculas") {
          console.log("No se encontraron películas con ese nombre.");
          setQuickSearch([]);
          setSearch(true);
  
        }  else  {
          const top3Results = data.slice(0, 3);
  
          setQuickSearch(top3Results);
          setSearch(true);
        }
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    };

    return(
        <nav className={styles.nav}>
            <div className="wrapper">
                <ul className={styles.navList}>
                    <div>
                        
                        <li>
                            <Link href ='/home'>
                                
                                <Image className={styles.logo} src={logoimg} alt="Logo" />
                                
                            </Link>
                        </li>

                    </div>
                    

                    <div >                    
                      <SearchBar onSearch={handleSearch} />
                      <div className={styles.searchResultsContainer}>
                        <ul className={styles.movieList}>
                          {quickSearch.map((result, index) => (
                          <Link href = {`/detail/${result.id}`}>
                            <li key={index}>
                              <div className={styles.card} onClick={()=>router.push(`/detail/${result.id}`)}>
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
                          </Link>
                          ))}
                        </ul>
                      </div>
                      {search && quickSearch.length === 0 && (
                        <p>No se encontraron películas con ese nombre.</p>
                      )}
                    </div>
                    <div className={styles.toRight}> 
                        <li >
                            <Link href='/cart'><Image src={cart} alt="Cart" width={30} height={30} /></Link>
                        </li>

                        <li >
                            <Image src={userpic} alt="Account" width={30} height={30} onClick={handleAccountClick} />
                                {showDropdown && (
                                <div className={styles.dropdown}>

                                    <ul>
                                    <li>
                                      {user ? <h6>{user.nickname}</h6> : null}
                                    </li>
                                    <li>
                                        <Link href="/account">
                                            My Account
                                        </Link>
                                    </li>

                                    <li> 
                                        <Link href="/form">
                                            Form
                                        </Link>
                                    </li>

                                    <li>
                                        {user 
                                        ? <a href="/api/auth/logout"><button>Log out</button></a> 
                                        : <a href="/api/auth/login"><button>Login</button></a>}
                                    </li>

                                    </ul>
                                </div>
                            )}
                        </li>   
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
