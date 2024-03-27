'use client'
import { useState } from "react"

const searchBar = ({onSearch}) => {

    const [query, setQuery] = useState('')

    const handleChange = (e) =>{
        setQuery(e.target.value)
        onSearch(e.target.value)
    }

    return(
        <div>
            <input  
                type="text"
                placeholder="Buscar peliculas"
                onChange={handleChange}
                value={query} />
        </div>
    )

}
export default searchBar