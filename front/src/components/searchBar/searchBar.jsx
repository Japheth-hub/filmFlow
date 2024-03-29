'use client'
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from './searchBar.module.css'
import Link from "next/link"
import Button from "../button/Button"

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
            <Link href= {`/filters/search=${query}`}>
                    
            <Button emoji={"🔎"} label={"Buscar"}  callback={handleSubmit}/>
                    
           </Link>
            
            
            </div>
        
    )

}
export default searchBar