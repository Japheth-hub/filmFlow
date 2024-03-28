'use client'
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from './searchBar.module.css'

const searchBar = ({onSearch}) => {
    
    const [query, setQuery] = useState('')

    const handleChange = (e) =>{
        

        setQuery(e.target.value)
        onSearch(e.target.value)
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
            
            
            </div>
        
    )

}
export default searchBar