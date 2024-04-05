import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Link from 'next/link'
import Button from '../button/Button'
import axios from 'axios'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL


export default function Dashboard({datos, link}) {
    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])
    const [body2, setBody2] = useState([])
    const [order, setOrder] = useState(true)
    const [genres, setGenres] = useState([])

    async function deleteAction(id){
        try {
            const res = confirm('Estas seguro que deseas eliminar est pelicula')
            if(res){
                await axios.delete(`${link}${id}`)
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleOrder(tipo){
        setOrder(!order)
        if(tipo === 'Name'){
            if(!order){
                body.sort((a, b) => a.name.localeCompare(b.name));
            } else {
                body.sort((a, b) => b.name.localeCompare(a.name));
            }
        } else if(tipo === 'Duration'){
            if(!order){
                body.sort((a, b) => b.duration - a.duration);
            } else {
                body.sort((a, b) => a.duration - b.duration);
            }
        }
    }

    function handleChange(e){
        const genero = e.target.value
        const newBody = body2.filter((movie) => movie.genre.includes(genero))
        if(newBody.length === 0 || !newBody){
            alert("No hay Peliculas con este genero")
        } else {
            setBody(newBody)
        }
    }

    function limpiar(){
        body.sort((a, b) => a.id - b.id)
        setBody(body2)
    }

    useEffect(()=>{
        function getData(datos){
            if(datos && datos.length > 0){
                const objeto = datos[0]
                const props = Object.keys(objeto);
                setColumn(props)
                setBody(datos)
                setBody2(datos)
            } else {
                setColumn([])
            }
        }
        async function getGenre(){
            try {
                const {data} = await axios(`${NEXT_PUBLIC_URL}genres`)
                const genre = data.map((genre) => genre.name)
                setGenres(genre)
            } catch (error) {
                console.log(error)
            }
        }
        getGenre()
        getData(datos)
    }, [datos])

  return (
    <div>
        <div className={style.orderFilters}>
            <Button emoji={'🔄'} label={'Limpiar'} callback={()=>{limpiar()}}></Button>
            <Button callback={()=>{handleOrder('Name')}} emoji={order ? '🔻' : '🔺'} label={'Name'}></Button>
            <Button callback={()=>{handleOrder('Duration')}} emoji={order ? '🔻' : '🔺'} label={'Duration'}></Button>
            <select name="genre" className={style.genreSelect} defaultValue='Genero' onChange={handleChange}>
                <option value="Genero">Selecciona un genero</option>
                {genres && genres.map((genre, index) => {
                    return <option key={index} value={genre}>{genre}</option>
                })}
            </select>
        </div>

        <div className={style.divTabla}>
            {column.length > 0 
            ? <table className={style.table}>
                    <thead className={style.thead}>
                        <tr>
                            {column && column.length > 0 &&
                                column.map((item, index) => {
                                    return <th className={style.th} key={index}>{item.toUpperCase()}</th>
                                })
                            }
                            <th className={style.th}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className={style.tbody}>
                            {body && body.length > 0 && column && column.length > 0 &&
                                body.map((item, index) => (
                                    <tr key={index}>
                                    {column.map((prop, i) => ( 
                                            i === 0 
                                            ? <td className={style.td} key={i}><Link href={`${link}/${item[prop]}`}>{item[prop]}</Link></td>
                                            : <td className={style.td} key={i}>{item[prop]}</td>
                                            ))}
                                            <td className={style.td}>
                                                <Button emoji={'🗑️'} label={'Delete'} color={'red'} callback={()=>{deleteAction(item.id)}}></Button><br />
                                                <Button emoji={'✏️'} label={'Edit'} color={'blue'}></Button>
                                            </td>
                                    </tr>       
                                ))
                            }
                    </tbody>
                </table>
            :
                <span className={style.welcome}>Bienvenido a tu Dashboard</span>
        }
        </div>
    </div>
  )
}
