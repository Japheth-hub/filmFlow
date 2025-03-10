import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react';
import axios from 'axios';
import styles from './Navbar.module.scss'
import logoimg from '../../img/logo-white-expanded.png';
import userpic from '../../img/userpic.png'
import cart from '../../img/shopping-cart.png'
import SearchBar from '../searchBar/searchBar';
import { useUser } from '@auth0/nextjs-auth0/client'
import Button from '../../components/button/Button'
import { useRouter } from 'next/navigation';
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

const Nav = (props)=> {

    const {data} = props;
    const {user} = useUser();
    const router = useRouter();
    const [userLocalStorage,setUserLocalStorage] = useState({});

    const [showDropdown, setShowDropdown] = useState(false);
    const [quickSearch, setQuickSearch] = useState([])
    const [search,setSearch] = useState(false);

    const handleAccountClick = () => {
      setShowDropdown(!showDropdown);
      if(userLocalStorage === null) setUserLocalStorage(JSON.parse(window.localStorage.getItem('FilmFlowUsr')))
    };

  useEffect(() => {  
    setUserLocalStorage(window.localStorage.getItem('FilmFlowUsr') 
      ? JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
      : null);
  }, [])
  
    const isAdmin = userLocalStorage?.role === "admin" ? true : false;    

    const handleSearch = async (query) => {
      
  
      if (!query || query.trim() === "" || query.length < 3) {
        setQuickSearch([]);
        setSearch(false);
        return;
      }
  
      try {
        const response = await axios(
        `${NEXT_PUBLIC_URL}movies?search=${query}&admin=${isAdmin}`,
        );
        
        const data = response.data;
        
        if (data === "No hay Peliculas") {
          setQuickSearch([]);
          setSearch(true);
  
        }  else  {
          const top3Results = data.slice(0, 3);
  
          setQuickSearch(top3Results);
          setSearch(true);
        }
      } catch (error) {
      }
    };

    function logout(){
      window.localStorage.removeItem("FilmFlowUsr");
    }

    

    return(
        <nav className={styles.nav}>
            <div className="wrapper">
                <ul className={styles.navList}>
                    <div>
                        
                        <li>
                            <Link href ='/'>
                                
                                <Image className={styles.logo} src={logoimg} alt="Logo" />
                                
                            </Link>
                        </li>

                    </div>
                    

                    <div >                    
                      <SearchBar onSearch={handleSearch} />
                      <div className={styles.searchResultsContainer}>
                        <ul className={styles.movieList}>
                          {quickSearch.map((result, index) => (
                          <Link key={index} href = {`/detail/${result.id}`}>
                            <li>
                              <div className={styles.card} onClick={()=>router.push(`/detail/${result.id}`)}>
                                
                                <div>
                                  <img
                                    src={result.poster}
                                    alt={result.name}
                                    className={styles.searchbar__image}
                                    />
                                </div>
                                <div>{result.name}</div>
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
                            <Link href='/cart'><Image src={cart} alt="Cart" width={40} height={40} /></Link>
                        </li>

                        <li >
                            <div className={styles['userpic']}>
                              <Image src={user ? user.picture : userpic} alt="Account" width={40} height={40} onClick={handleAccountClick} />
                            </div>
                                {showDropdown && (
                                <div className={styles.dropdown}>

                                  <ul>
                                    <li>
                                      {user ? <h5>{user.nickname}</h5> : null}
                                    </li>
                                    <li>
                                      {userLocalStorage && userLocalStorage.role === "admin" 
                                        ? <Link href="/admin">
                                            <p>Tablero</p>
                                          </Link>
                                        : null
                                      }
                                    </li>
                                    <li>
                                        {user ? 
                                        <Link href="/account">
                                            <p>Perfil</p>
                                        </Link> 
                                        : null}
                                    </li>

                                    <li> 
                                        {userLocalStorage && userLocalStorage.role !== "viewer" 
                                        ? <Link href="/form">
                                            <p>Agregar película</p>
                                          </Link>
                                        : null }
                                    </li>

                                    <li>
                                        {user
                                        ? <a href="/api/auth/logout"><button onClick={()=>{logout()}}>Salir</button></a> 
                                        : <a href="/api/auth/login"><button>Ingresar</button></a>}
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
