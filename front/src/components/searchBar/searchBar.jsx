'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from './searchBar.module.css'
import Link from "next/link"
import Button from "../button/Button"

const searchBar = ({onSearch}) => {
    
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleChange = (e) =>{
        

        setQuery(e.target.value)
        onSearch(e.target.value)
    }


    const handleSearch = ()=>{
        router.push(`/movies?search=${query}`);
        onSearch('')
    }
    return(
        
            <div className={styles.searchbar}>
            <input
                type="text"
                className={styles.searchbar__input}
                placeholder="Buscar películas..."
                value={query}
                onChange={handleChange}
            />
           
                    
            <Button emoji={"🔎"} callback={handleSearch}/>
                    
        
        
            </div>
        
    )

}
export default searchBar